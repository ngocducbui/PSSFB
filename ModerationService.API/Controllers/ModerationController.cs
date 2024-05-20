﻿using Contract.Service.Message;
using CourseGRPC.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ModerationService.API.Fearture.Command;
using ModerationService.API.Fearture.Command.Forum;
using ModerationService.API.Fearture.Command.Moderations;
using ModerationService.API.Fearture.Querries.Moderations;
using ModerationService.API.Feature.Queries;
using ModerationService.API.Models;

namespace ModerationService.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ModerationController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly Content_ModerationContext _context;
        private readonly CheckCourseIdServicesGrpc service;

        public ModerationController(IMediator mediator, Content_ModerationContext context, CheckCourseIdServicesGrpc _service)
        {
            _mediator = mediator;
            _context = context;
            service = _service;
        }

        // Bỏ
        [HttpGet]
        public async Task<IActionResult> GetModerationCourseById(int courseId)
        {
            var query = new GetModerationCourseByIdQuerry { CourseId = courseId };
            var result = await _mediator.Send(query);

            return result;
        }

        [HttpPost]
        public async Task<IActionResult> ModerationCourse(int courseId)
        {
            return Ok(await _mediator.Send(new ModerationCourseCommand { CourseId = courseId }));
        }

        [HttpPost]
        public async Task<IActionResult> ModerationPost(int postId)
        {
            return Ok(await _mediator.Send(new ModerationPostCommand { PostId = postId }));
        }

 

        [HttpPost]
        public async Task<IActionResult> Reject([FromBody] RejectCourseCommand command)
        {
            var result = await _mediator.Send(command);
            return result;
        }
        [HttpPost]
        public async Task<IActionResult> RejectPost([FromBody] RejectPostCommand command)
        {
            var result = await _mediator.Send(command);
            return result;
        }
        //[Authorize(Roles = "AdminSystem")]
        [HttpGet]
       
        public async Task<IActionResult> GetModerationsCourse(string? courseName, string? Tag, int page = 1, int pageSize = 5)
        {
            try
            {
                var query = new GetModerationCourseQuerry { Page = page, PageSize = pageSize, CourseName = courseName, Tag = Tag };
                var result = await _mediator.Send(query);

                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest(Message.MSG30);
            }
        }

        [HttpGet]
        
        public async Task<IActionResult> GetModerationsPost(string? postTitle, string? Tag, int page = 1, int pageSize = 5)
        {
            var query = new GetModerationPostQuerry { PostTitle = postTitle, Tag = Tag, Page = page, PageSize = pageSize };
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> SendToModeration(int CourseId)
        {
            var course = _context.Courses.FirstOrDefault(x => x.Id.Equals(CourseId));

            if (course == null)
            {
                return NotFound(Message.MSG25);
            }

            course.IsCompleted = true;
            await _context.SaveChangesAsync();

            var moderationcourse = _context.Moderations.FirstOrDefault(x => x.CourseId.Equals(CourseId));
            var isExist = await service.SendCourseId(CourseId);
            if (moderationcourse == null)
            {
                var moderation = new Moderation
                {
                    CourseId = course.Id,
                    ChangeType = "Add",
                    CreatedBy = course.CreatedBy,
                    ApprovedContent = "Add a new course",
                    Status = "Pending",
                    CreatedAt = course.CreatedAt,
                    CourseName = course.Name

                };
                await _context.Moderations.AddAsync(moderation);
                await _context.SaveChangesAsync();

            }
            if (moderationcourse != null && isExist.IsCourseExist.Equals(0))
            {
                moderationcourse.CreatedAt = DateTime.Now;
                moderationcourse.Status = "Pending";
                await _context.SaveChangesAsync();

            }
            if (moderationcourse != null && isExist.IsCourseExist.Equals(CourseId))
            {
                var moderation = new Moderation
                {
                    CourseId = course.Id,
                    ChangeType = "Update",
                    CreatedBy = course.CreatedBy,
                    ApprovedContent = "Update a new course",
                    Status = "Pending",
                    CreatedAt = course.CreatedAt,
                    CourseName = course.Name

                };
                await _context.Moderations.AddAsync(moderation);
                await _context.SaveChangesAsync();
            }

            return Ok(Message.MSG16);
        }

        [HttpPost]
        public async Task<IActionResult> SendPostToModeration(int PostId)
        {
            var post = _context.Posts.FirstOrDefault(x => x.Id.Equals(PostId));

            if (post == null)
            {
                return NotFound(Message.MSG25);
            }
            var moderationcourse = _context.Moderations.FirstOrDefault(x => x.CourseId.Equals(PostId));
           
            if (moderationcourse == null)
            {
                var moderation = new Moderation
                {
                    PostId = post.Id,
                    ChangeType = "Add",
                    CreatedBy = (int)post.CreatedBy,
                    ApprovedContent = "Add a new course",
                    Status = "Pending",
                    CreatedAt = post.LastUpdate,
                    PostTitle = post.Title,
                    

                };
                await _context.Moderations.AddAsync(moderation);
                await _context.SaveChangesAsync();
            }
          
          
            return Ok(Message.MSG16);
        }
    }
}
