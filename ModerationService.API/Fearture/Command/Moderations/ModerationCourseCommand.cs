﻿using AutoMapper;
using Contract.Service.Message;
using CourseGRPC.Services;
using EventBus.Message.Event;
using MassTransit;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModerationService.API.Models;
using System;

namespace ModerationService.API.Fearture.Command.Moderations
{
    public class ModerationCourseCommand : IRequest<IActionResult>
    {
        public int CourseId { get; set; }

        public class ModerationCourseCommandHandler : IRequestHandler<ModerationCourseCommand, IActionResult>
        {
            private readonly IPublishEndpoint _publish;
            private readonly Content_ModerationContext _context;
            private readonly IMapper _mapper;
            private readonly UserEnrollCourseGrpcServices _services;
            private readonly CheckCourseIdServicesGrpc _service;
            public ModerationCourseCommandHandler(IPublishEndpoint publish, 
                Content_ModerationContext context, 
                IMapper mapper, 
                UserEnrollCourseGrpcServices service,
                CheckCourseIdServicesGrpc checkCourseIdServicesGrpc)
            {
                _context = context;
                _publish = publish;
                _mapper = mapper;
                _services = service;
                _service = checkCourseIdServicesGrpc;
            }
            public async Task<IActionResult> Handle(ModerationCourseCommand request, CancellationToken cancellationToken)
            {
                //var courseIdEvent = new CourseIdEvent
                //{
                //    CourseId = request.CourseId,
                //};
                //await _publish.Publish(courseIdEvent);
                var userId = _services.SendCourseId(request.CourseId);
                //if (userId == null)
                //{
                //    return new BadRequestObjectResult(Message.MSG01);
                //}

                var course = _context.Courses.FirstOrDefault(c => c.Id.Equals(request.CourseId));
                //if (course == null)
                //{
                //    return new BadRequestObjectResult(Message.MSG25);
                //}
                //var courses = await _context.Courses.Include(c => c.Moderations)
                //  .Include(c => c.Chapters)
                //      .ThenInclude(ch => ch.Lessons)
                //          .ThenInclude(l => l.TheoryQuestions)
                //              .ThenInclude(ans => ans.AnswerOptions)
                //  .Include(c => c.Chapters)
                //      .ThenInclude(ch => ch.LastExams)
                //          .ThenInclude(l => l.QuestionExams)
                //              .ThenInclude(ans => ans.AnswerExams)
                //  .Include(c => c.Chapters)
                //      .ThenInclude(ch => ch.PracticeQuestions)
                //          .ThenInclude(cq => cq.TestCases)
                //  .Include(c => c.Chapters)
                //      .ThenInclude(ch => ch.Lessons)
                //          .ThenInclude(l => l.TheoryQuestions)
                //              .ThenInclude(ans => ans.AnswerOptions)
                //  .Include(c => c.Chapters)
                //      .ThenInclude(ch => ch.PracticeQuestions)
                //          .ThenInclude(cq => cq.UserAnswerCodes)
                //  .FirstOrDefaultAsync(course => course.Id == request.CourseId);

                var courseEvent = new CourseEvent
                {
                    Id = course.Id,
                    Name = course.Name,
                    CreatedBy = course.CreatedBy,
                    Description = course.Description,
                    Tag = course.Tag,
                    Picture = course.Picture,
                    CreatedAt = course.CreatedAt,
                    Price=course.Price
                };
                await _publish.Publish(courseEvent);


                var chapter = _context.Chapters.Where(c => c.CourseId.Equals(request.CourseId)).ToList();

                foreach (var chap in chapter)
                {
                    var chapterEvent = new ChapterEvent
                    {
                        Id = chap.Id,
                        Name = chap.Name,
                        IsNew = chap.IsNew,
                        CourseId = chap.CourseId,
                        Part = chap.Part
                    };
                    await _publish.Publish(chapterEvent);
                    await Task.Delay(2500);
                }

               
              

                foreach (var chap in chapter)
                {
                    var codequestion = _context.PracticeQuestions.Where(c => c.ChapterId.Equals(chap.Id)).ToList();

                    foreach (var code in codequestion)
                    {
                        var codequestionEvent = new PracticeQuestionEvent
                        {
                            Description = code.Description,
                            ChapterId = code.ChapterId,
                            Id = code.Id,
                            CodeForm = code.CodeForm,
                            TestCaseJava = code.TestCaseJava,
                            TestCaseC=code.TestCaseC,
                            TestCaseCplus=code.TestCaseCplus,
                            Title=code.Title,
                        };
                        await _publish.Publish(codequestionEvent);
                        await Task.Delay(2500);
                    }
                }

                foreach (var chap in chapter)
                {
                    var lastEx = _context.LastExams.Where(l => l.ChapterId.Equals(chap.Id)).ToList();
                    foreach (var last in lastEx)
                    {
                        var lastEvent = new LastExamEvent
                        {
                            Id = last.Id,
                            ChapterId = last.ChapterId,
                            Name = last.Name,
                            PercentageCompleted = last.PercentageCompleted,
                            Time = last.Time,
                        };
                        await _publish.Publish(lastEvent);
                        await Task.Delay(500);
                        var exam = _context.QuestionExams.Where(e => e.LastExamId.Equals(last.Id)).ToList();
                        foreach (var ex in exam)
                        {
                            var examEvent = new QuestionExamEvent
                            {
                                Id = ex.Id,
                                LastExamId = ex.LastExamId,
                                ContentQuestion = ex.ContentQuestion,
                                Score = ex.Score,
                                Status = ex.Status
                            };
                            await _publish.Publish(examEvent);
                            await Task.Delay(500);
                            var exAns = _context.AnswerExams.Where(exs => exs.ExamId.Equals(ex.Id)).ToList();
                            foreach (var ans in exAns)
                            {
                                var exAnswer = new AnswerExamEvent
                                {
                                    Id = ans.Id,
                                    ExamId = ans.ExamId,
                                    CorrectAnswer = ans.CorrectAnswer,
                                    OptionsText = ans.OptionsText
                                };
                                await _publish.Publish(exAnswer);
                                await Task.Delay(500);
                            }
                        }

                       
                       
                    }
                }

                foreach (var chap in chapter)
                {
                    var lesson = _context.Lessons.Where(l => l.ChapterId.Equals(chap.Id)).ToList();

                    foreach (var less in lesson)
                    {
                        var lessonEvent = new LessonEvent
                        {
                            Id = less.Id,
                            ChapterId = less.ChapterId,
                            Description = less.Description,
                            VideoUrl = less.VideoUrl,
                            Title = less.Title,
                            Duration = less.Duration,
                            IsCompleted = false,
                            ContentLesson = less.ContentLesson,
                            CodeForm=less.CodeForm
                        };
                        await _publish.Publish(lessonEvent);
                        var question = _context.TheoryQuestions.Where(q => q.VideoId.Equals(less.Id)).ToList();
                        foreach (var ques in question)
                        {
                            var questionEvent = new TheoryQuestionEvent
                            {
                                Id = ques.Id,
                                ContentQuestion = ques.ContentQuestion,
                                Time = ques.Time,
                                VideoId = ques.VideoId
                            };
                            await _publish.Publish(questionEvent);

                            var answerOption = _context.AnswerOptions.Where(q => q.QuestionId.Equals(ques.Id)).ToList();
                            foreach (var ansOptio in answerOption)
                            {
                                var ansOpEvent = new AnswerOptionsEvent
                                {
                                    Id = ansOptio.Id,
                                    QuestionId = ansOptio.QuestionId,
                                    OptionsText = ansOptio.OptionsText,
                                    CorrectAnswer = ansOptio.CorrectAnswer
                                };
                                await _publish.Publish(ansOpEvent);
                            }
                        }

                       
                        //await Task.Delay(1000); 
                    }
                }


                //
                //foreach (var chap in chapter)
                //    {
                //    var chapterEvent = new ChapterEvent
                //    {
                //        Id = chap.Id,
                //        Name = chap.Name,
                //        IsNew = chap.IsNew,
                //        CourseId = chap.CourseId,
                //        Part = chap.Part
                //    };
                //    await _publish.Publish(chapterEvent);

                //    var codequestion = _context.PracticeQuestions.Where(c => c.ChapterId.Equals(chap.Id)).ToList();

                //    foreach (var code in codequestion)
                //    {
                //        var codequestionEvent = new PracticeQuestionEvent
                //        {
                //            Description = code.Description,
                //            ChapterId = code.ChapterId,
                //            Id = code.Id,
                //            CodeForm = code.CodeForm,
                //            TestCaseJava = code.TestCaseJava,
                //        };
                //        await _publish.Publish(codequestionEvent);

                //        var testcase = _context.TestCases.Where(c => c.CodeQuestionId.Equals(code.Id)).ToList();
                //        foreach (var test in testcase)
                //        {
                //            var testcaseEvent = new TestCaseEvent
                //            {
                //                Id = test.Id,
                //                InputTypeInt = test.InputTypeInt,
                //                CodeQuestionId = test.CodeQuestionId,
                //                ExpectedResultString = test.ExpectedResultString,
                //                InputTypeArrayInt = test.InputTypeArrayInt,
                //                InputTypeArrayString = test.InputTypeArrayString,
                //                ExpectedResultInt = test.ExpectedResultInt,
                //                ExpectedResultBoolean = test.ExpectedResultBoolean,
                //                InputTypeBoolean = test.ExpectedResultBoolean,
                //                InputTypeString = test.InputTypeString
                //            };
                //            await _publish.Publish(testcaseEvent);

                //        }

                //    }
                //    var lastEx = _context.LastExams.Where(l => l.ChapterId.Equals(chap.Id)).ToList();
                //    foreach (var last in lastEx)
                //    {
                //        var lastEvent = new LastExamEvent
                //        {
                //            Id = last.Id,
                //            ChapterId = last.ChapterId,
                //            Name = last.Name,
                //            PercentageCompleted = last.PercentageCompleted,
                //            Time = last.Time,

                //        };
                //        await _publish.Publish(lastEvent);
                //        var exam = _context.QuestionExams.Where(e => e.LastExamId.Equals(last.Id)).ToList();
                //        foreach (var ex in exam)
                //        {
                //            var examEvent = new QuestionExamEvent
                //            {
                //                Id = ex.Id,
                //                LastExamId = ex.LastExamId,
                //                ContentQuestion = ex.ContentQuestion,
                //                Score = ex.Score,
                //                Status = ex.Status

                //            };
                //            await _publish.Publish(examEvent);
                //            var exAns = _context.AnswerExams.Where(exs => exs.ExamId.Equals(ex.Id)).ToList();
                //            foreach (var ans in exAns)
                //            {
                //                var exAnswer = new AnswerExamEvent
                //                {
                //                    Id = ans.Id,
                //                    ExamId = ans.ExamId,
                //                    CorrectAnswer = ans.CorrectAnswer,
                //                    OptionsText = ans.OptionsText
                //                };
                //                await _publish.Publish(exAnswer);
                //            }
                //        }
                //    }

                //    var lesson = _context.Lessons.Where(l => l.ChapterId.Equals(chap.Id)).ToList();

                //    foreach (var less in lesson)
                //    {
                //        var lessonEvent = new LessonEvent
                //        {
                //            Id = less.Id,
                //            ChapterId = less.ChapterId,
                //            Description = less.Description,
                //            VideoUrl = less.VideoUrl,
                //            Title = less.Title,
                //            Duration = less.Duration,
                //            IsCompleted = false,
                //            ContentLesson=less.ContentLesson,

                //        };
                //        await _publish.Publish(lessonEvent);

                //        var question = _context.TheoryQuestions.Where(q => q.VideoId.Equals(less.Id)).ToList();
                //        foreach (var ques in question)
                //        {
                //            var questionEvent = new TheoryQuestionEvent
                //            {
                //                Id = ques.Id,
                //                ContentQuestion = ques.ContentQuestion,
                //                Time = ques.Time,
                //                VideoId = ques.VideoId
                //            };
                //            await _publish.Publish(questionEvent);

                //            var answerOption = _context.AnswerOptions.Where(q => q.QuestionId.Equals(ques.Id)).ToList();
                //            foreach (var ansOptio in answerOption)
                //            {
                //                var ansOpEvent = new AnswerOptionsEvent
                //                {
                //                    Id = ansOptio.Id,
                //                    QuestionId = ansOptio.QuestionId,
                //                    OptionsText = ansOptio.OptionsText,
                //                    CorrectAnswer = ansOptio.CorrectAnswer
                //                };
                //                await _publish.Publish(ansOpEvent);

                //            }

                //        }
                //    }
                //}
                var moderation = await _context.Moderations.FirstOrDefaultAsync(c => c.CourseId.Equals(request.CourseId));

                if (moderation == null)
                {
                    return new BadRequestObjectResult(Message.MSG25);
                }
                else
                {
                   
                    _context.Moderations.Remove(moderation);
                    _context.SaveChanges();
                }
                var courses = await _service.SendCourseId(request.CourseId);

                if (userId != null)
                {
                    foreach (var id in userId.Result.UserId)
                    {
                        var notification = new NotificationEvent
                        {
                            RecipientId = id,
                            IsSeen = false,
                            NotificationContent = "Khóa học " + courses.CourseName+" đã có sự cập nhật mới. Hãy vào khám phá ngay nào!",
                            SendDate = DateTime.Now,
                            Course_Id = course.Id,
                        };
                        await _publish.Publish(notification);
                    }
                }
                    var notificationForAdminBussiness = new NotificationEvent
                    {
                        RecipientId = course.CreatedBy,
                        IsSeen = false,
                        NotificationContent = "Khóa học " +course.Name+" của bạn đã được phê duyệt",
                        SendDate = DateTime.Now,
                        Course_Id = course.Id,
                    };
                    await _publish.Publish(notificationForAdminBussiness);

                

                return new OkObjectResult(Message.MSG16);
            }
        }
    }
}
