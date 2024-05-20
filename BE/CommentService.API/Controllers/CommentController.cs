﻿using CommentService.API.Fearture.Command;
using CommentService.API.Feature.Command;
using Contract.Service.Message;
using ForumService.API.Fearture.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CommentService.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CommentController : ControllerBase
    {

        private readonly IMediator _mediator;
        public CommentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCommentInPost(int postId)
        {
            return Ok(await _mediator.Send(new GetAllCommentPostQuerry {PostId=postId }));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCommentInCourse(int courseId)
        {
            return Ok(await _mediator.Send(new GetAllCommentCourseQuerry {CoursesId=courseId }));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCommentInLesson(int lessonId)
        {
            return Ok(await _mediator.Send(new GetAllCommentLessonQuerry {LessonId=lessonId }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment(CreateCommentCommand command)
        {
            try
            {
                var result = await _mediator.Send(command);
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest(Message.MSG30);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateComment(int id, UpdateCommentCommand command)
        {
            command.Id = id;
            try
            {
                var result = await _mediator.Send(command);
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest(Message.MSG30);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var command = new DeleteCommentCommand { CommentId = id };
            var result = await _mediator.Send(command);
            return result;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReply(CreateReplyCommand command)
        {
            try
            {
                var result = await _mediator.Send(command);
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest(Message.MSG30);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateReply(int id, [FromBody] UpdateReplyCommand command)
        {
            command.ReplyId = id;
            var result = await _mediator.Send(command);
            return result;
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteReply(int id)
        {
            var command = new DeleteReplyCommand { ReplyId = id };
            var result = await _mediator.Send(command);
            return result;
        }
    }
}
