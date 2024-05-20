﻿using AutoMapper;
using Contract.SeedWork;
using CourseService.API.Common.ModelDTO;
using CourseService.API.GrpcServices;
using CourseService.API.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading;


namespace CourseService.API.Feartures.CourseFearture.Queries.CourseQueries
{
    public class GetAllCourseQuerry : IRequest<IActionResult>
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 5;
        public string? CourseName { get; set; }
        public string? Tag { get; set; }
        public int? UserId { get; set; }
        public class GetAllCoursesHandler : IRequestHandler<GetAllCourseQuerry, IActionResult>
        {
            private readonly IMediator mediator;
            private readonly IMapper _mapper;
            private readonly CourseContext _context;
            private readonly GetUserInfoService _service;
            public GetAllCoursesHandler(IMediator _mediator, IMapper mapper, CourseContext context, GetUserInfoService service)
            {
                mediator = _mediator;
                _mapper = mapper;
                _context = context;
                _service = service;
            }
            public async Task<IActionResult> Handle(GetAllCourseQuerry request, CancellationToken cancellation)
            {
                //var enrolledCourses = (from e in _context.Enrollments
                //                       join c in _context.Courses on e.CourseId equals c.Id
                //                       where e.UserId == request.UserId
                //                       select new
                //                       {
                //                           Course = c,
                //                           TotalLessons = _context.Chapters
                //                           .Where(ch => ch.CourseId == e.CourseId)
                //                           .SelectMany(ch => ch.Lessons)
                //                           .Count(),
                //                           TotalPracticeQuestion = _context.Chapters
                //                           .Where(ch => ch.CourseId == e.CourseId)
                //                           .SelectMany(ch => ch.PracticeQuestions)
                //                           .Count(),
                //                           TotalLastExam = _context.Chapters
                //                             .Where(ch => ch.CourseId == e.CourseId)
                //                             .SelectMany(ch => ch.LastExams)
                //                           .Count(),
                //                           CompletedPracticeQuestion = _context.CompletedPracticeQuestions.Where(cl => cl.UserId == request.UserId).Count(),
                //                           CompletedLastExam = _context.CompletedExams.Where(cl => cl.UserId == request.UserId).Count(),
                //                           CompletedLessons = _context.CompleteLessons.Where(cl => cl.UserId == request.UserId).Count(),
                //                       }).ToList();


                IQueryable<Course> query = _context.Courses;
                if (!string.IsNullOrEmpty(request.CourseName))
                {
                    query = query.Where(c => c.Name.Contains(request.CourseName));
                }
                if (!string.IsNullOrEmpty(request.Tag))
                {
                    query = query.Where(c => c.Tag.Equals(request.Tag));
                }
                var totalItems = await query.CountAsync();
                if (totalItems <= 0)
                {
                    return new NotFoundObjectResult(totalItems);
                }
                var courseList = await query
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .ToListAsync();

                List<CourseDTO> courseDTOList = new List<CourseDTO>();
                foreach (var item in courseList)
                {
                    var userInfo = await _service.SendUserId(item.CreatedBy);
                    bool isUserEnrolled = _context.Enrollments.Any(e => e.UserId == request.UserId && e.CourseId == item.Id);
                    bool isInWishList= _context.Wishlists.Any(e=>e.UserId==request.UserId && e.CourseId==item.Id);
                    var averageRating = await _context.CourseEvaluations
                                           .Where(e => e.CourseId == item.Id && e.Star != null)
                                           .Select(e => e.Star.Value) 
                                           .DefaultIfEmpty() 
                                           .AverageAsync(cancellation);
                    var dto = new CourseDTO
                    {
                        CreatedAt = item.CreatedAt,
                        Description = item.Description,
                        Id = item.Id,
                        Name = item.Name,
                        Picture = item.Picture,
                        Tag = item.Tag,
                        UserId = item.CreatedBy,
                        UserName = userInfo.Name,
                        Enrolled = isUserEnrolled ? "Continue Studying" : "Enroll",
                        IsInWishList=isInWishList,
                        Price=item.Price,
                        AverageEvaluate= Math.Round(averageRating, 2)
                    };
                    courseDTOList.Add(dto);
                }
                var result = new PageList<CourseDTO>(courseDTOList, totalItems, request.Page, request.PageSize);
                return new OkObjectResult(result);
            }
            private double CalculateCompletionPercentage(int totalLessons, int totalPractice, int TotalLastExam,
             int completedLessons, int completedPractice, int completedLastExam)
            {

                int total = totalLessons + totalPractice + TotalLastExam;
                int completed = completedLessons + completedPractice + completedLastExam;
                if (total == 0)
                    return 0;

                return ((double)completed / total) * 100;
            }
        }
    }
}
