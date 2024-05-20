﻿using CourseGRPC.Models;
using Grpc.Core;

namespace CourseGRPC.Services
{
    public class GetCoursesId : GetCourseByIdService.GetCourseByIdServiceBase
    {
        private readonly CourseContext _context;
        public GetCoursesId(CourseContext context)
        {
            _context = context;
        }

        public override  Task<GetCourseIdResponse> GetCourseId(GetCourseIdRequest request, ServerCallContext context)
        {
            var course = _context.Courses.FirstOrDefault(e => e.Id == request.CourseId);
                               
                               

            if (course == null)
            {
                return Task.FromResult(new GetCourseIdResponse
                {
                    Id = 0,
                    Name = "null",
                    Picture="null"
                  
                });
            }
           
                var response = new GetCourseIdResponse()
                {
                    Id = course.Id,
                    Name = course.Name,
                    Picture = course.Picture,
                };


            


            return Task.FromResult(response);
        }
    }
}
