﻿using Contract.Service.Message;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ModerationService.API.Fearture.Command;
using ModerationService.API.Fearture.Querries.Lesson;

namespace ModerationService.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LessonModerationController: ControllerBase
    {
        private readonly IMediator _mediator;

        public LessonModerationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateLesson([FromBody] CreateLessonCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateLesson(int id, UpdateLessonCommand command)
        {
            if (id != command.LessonId)
            {
                return BadRequest(Message.MSG30);
            }

            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetLessonById(int id)
        {
            var query = new GetLessonByIdQuery { LessonId = id };
            var lessonDTO = await _mediator.Send(query);

            return Ok(lessonDTO);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteLesson(int id)
        {
            var command = new DeleteLessonCommand { Id = id };
            var result = await _mediator.Send(command);

            return Ok(result);
        }
    }
}

