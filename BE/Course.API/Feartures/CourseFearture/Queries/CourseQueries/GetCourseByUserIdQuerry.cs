﻿using GrpcServices;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using CourseService.API.Models;
using Contract.Service.Message;

namespace CourseService.API.Feartures.CourseFearture.Queries.CourseQueries
{
    public class GetCourseByUserIdQuerry : IRequest<IActionResult>
    {
        public int UserId { get; set; }

        public class GetCourseByUserHandler : IRequestHandler<GetCourseByUserIdQuerry, IActionResult>
        {
            private readonly CourseContext _context;
            private readonly UserIdCourseGrpcService service;
            private readonly IMapper mapper;

            public GetCourseByUserHandler(CourseContext context, UserIdCourseGrpcService userIdCourseGrpcService, IMapper _mapper)
            {
                _context = context;
                service = userIdCourseGrpcService;
                mapper = _mapper;

            }
            public async Task<IActionResult> Handle(GetCourseByUserIdQuerry request, CancellationToken cancellationToken)
            {
                var user = await service.SendUserId(request.UserId);
                if (user.Id == 0)
                {
                    return new NotFoundObjectResult(Message.MSG01);
                }

                var courses = _context.Courses.Where(c => c.CreatedBy.Equals(user.Id)).ToList();

                if (courses == null)
                {
                    return new NotFoundObjectResult(courses);
                }


                //var result = new
                //{
                //    UserName = user.Name,
                //    Courses = courses.Select(course => new
                //    {
                //        course.Id,
                //        course.Name,
                //        course.Description,
                //        course.Picture,
                //        course.Tag,
                //        Chapters = course.Chapters.Select(chapter => new
                //        {
                //            chapter.Id,
                //            chapter.Name,
                //            chapter.CourseId,
                //            chapter.Part,
                //            chapter.IsNew,
                //            Lessons = chapter.Lessons.Select(lesson => new
                //            {
                //                lesson.Id,
                //                lesson.Title,
                //                lesson.VideoUrl,
                //                lesson.ChapterId,
                //                lesson.Description,
                //                lesson.Duration,
                //                lesson.IsCompleted,
                //                Questions = lesson.Questions.Select(question => new
                //                {
                //                    question.Id,
                //                    question.VideoId,
                //                    question.ContentQuestion,

                //                    question.Time
                //                }).ToList()
                //            }).ToList()
                //        }).ToList()
                //    }).ToList()
                //};
                return new OkObjectResult(courses);
            }
        }
    }
}
