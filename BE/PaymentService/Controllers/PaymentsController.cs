﻿using EventBus.Message.Event;
using Mapster;
using MassTransit;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PaymentService.API.Fearture.Payments.Command;
using PaymentService.API.Models;
using PaymentService.Common;
using PaymentService.Fearture.Payments.Command;
using PaymentService.Fearture.Payments.Querry;
using PaymentService.Models;
using PaymentService.ServicePayment.MoMo;
using PaymentService.ServicePayment.VnPay;


namespace PaymentService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly PaymentContext _context;
        private readonly IPublishEndpoint publish;
        public PaymentsController(IMediator _mediator, IPublishEndpoint _publish, PaymentContext context)
        {
            mediator = _mediator;
            publish = _publish;
            _context = context;

        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment(CreatePayment request)
        {

            var response = await mediator.Send(request);
            return Ok(response);
        }
        [HttpGet]
     
        public async Task<IActionResult> VnpayReturn([FromQuery] VnpayPayResponse response)
        {
            string returnUrl = string.Empty;
            var returnModel = new PaymentReturnDTO();
            var processResult = await mediator.Send(response.Adapt<ProcessVnpayPaymentReturn>());

            if (processResult.Success)
            {
                returnModel = processResult.Data.Item1 as PaymentReturnDTO;
                returnUrl = processResult.Data.Item2 as string;
            }
            var outputIdParam = Guid.NewGuid();
            var payment = new Payment
            {
                PaymentId = outputIdParam.ToString(),
                PaidAmount = returnModel.PaidAmount,
                MerchantId = "MER001",
                PaymentLanguage = "vn",
                PaymentCurrency = "VND",
                UserCreateCourseId = returnModel.UserCreateCourseId,
                CourseId = returnModel.CourseId,
                RequriedAmount = returnModel.PaidAmount,
                BuyerId = returnModel.BuyerId,
                PaymentDate = DateTime.Now,
            };
            _context.Payments.Add(payment);
            _context.SaveChanges();
            var Enroll = new UserEnrollEvent
            {
                UserId = returnModel.BuyerId,
                CourseId = returnModel.CourseId,
            };
            await publish.Publish(Enroll);

            return Ok("Thanh toán thành công");

        }

        [HttpGet]
        public async Task<IActionResult> MomoReturn([FromQuery] MomoOneTimePaymentResultRequest response)
        {
            string returnUrl = string.Empty;
            var returnModel = new PaymentReturnDTO();
            var processResult = await mediator.Send(response.Adapt<ProcessMomoPaymentReturn>());

            if (processResult.Success)
            {
                returnModel = processResult.Data.Item1;
                returnUrl = processResult.Data.Item2;
            }
            var outputIdParam = Guid.NewGuid();

            var payment = new Payment
            {
                PaymentId = outputIdParam.ToString(),
                PaidAmount = returnModel.PaidAmount,
                MerchantId = "MER001",
                PaymentLanguage = "vn",
                PaymentCurrency = "VND",
                UserCreateCourseId = returnModel.UserCreateCourseId,
                CourseId = returnModel.CourseId,
                RequriedAmount = returnModel.PaidAmount,
                BuyerId=returnModel.BuyerId,
                PaymentDate=DateTime.Now,
            };
            _context.Payments.Add(payment);
            _context.SaveChanges();
            var Enroll = new UserEnrollEvent
            {
                UserId = returnModel.BuyerId,
                CourseId = returnModel.CourseId,
            };
            await publish.Publish(Enroll);

         

            return Ok("Thanh toán thành công");
        }

        [HttpGet]
        public async Task<ActionResult<List<PaymentDtos>>> GetHistoryPaymentsOfUserCreated(int userId)
        {
            var query = new GetHistoryPaymentsOfUserCreatedQuerry { Id = userId };
            var result = await mediator.Send(query);

            return Ok(result);
        }
        [HttpGet]
        public async Task<ActionResult<List<PaymentDtos>>> GetHistoryPaymentsOfUserBuy(int userId)
        {
            var query = new GetHistoryPaymentsOfUserBuyQuerry { Id = userId };
            var result = await mediator.Send(query);

            return Ok(result);
        }
    }
}
