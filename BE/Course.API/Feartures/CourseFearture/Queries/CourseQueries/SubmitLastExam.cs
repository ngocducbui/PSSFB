﻿using Contract.Service.Message;
using CourseService.API.Common.ModelDTO;
using CourseService.API.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseService.API.Feartures.CourseFearture.Queries.CourseQueries
{
    public class SubmitLastExam : IRequest<IActionResult>
    {
        public int LastExamId { get; set; }
        public int UserId { get; set; }
        public List<ExamAnswerDto> QuestionExam { get; set; }

        public class SubmitLastExamHandler : IRequestHandler<SubmitLastExam, IActionResult>
        {
            private readonly CourseContext _context;

            public SubmitLastExamHandler(CourseContext context)
            {
                _context = context;
            }
            public async Task<IActionResult> Handle(SubmitLastExam request, CancellationToken cancellationToken)
            {
                int totalQuestions = _context.QuestionExams.Where(c => c.LastExamId.Equals(request.LastExamId)).Count();
                int correctAnswersCount = 0;
                int totalCorrectAnswers = 0;

                foreach (var questionWithAnswers in request.QuestionExam)
                {
                   
                    var dbQuestion = await _context.QuestionExams
                        .Include(q => q.AnswerExams)
                        .FirstOrDefaultAsync(q => q.Id == questionWithAnswers.Id);

                    if (dbQuestion == null)
                    {
                        return new NotFoundObjectResult(Message.MSG31);
                    }

                    var correctAnswers = dbQuestion.AnswerExams.Where(a => a.CorrectAnswer == true).Select(a => a.Id).ToList().ToArray();
                    var selectedAnswers = questionWithAnswers.SelectedAnswerIds.ToArray();
                    Array.Sort(selectedAnswers);
                    Array.Sort(correctAnswers);
                    bool isAllCorrectSelected = correctAnswers.SequenceEqual(selectedAnswers);

                    if (isAllCorrectSelected)
                    {
                        totalCorrectAnswers++;
                    }
                }

                double percentage = (double)totalCorrectAnswers / totalQuestions * 100;

                var resultExist= _context.ExamResults.FirstOrDefault(c=>c.UserId== request.UserId && c.LastExamId==request.LastExamId);

                if (resultExist == null)
                {
                    var result = new ExamResult
                    {
                        ExamResult1 = (decimal?)percentage,
                        LastExamId = request.LastExamId,
                        UserId = request.UserId
                    };
                    _context.ExamResults.Add(result);
                    _context.SaveChanges();

                }
                else
                {
                    resultExist.ExamResult1 = (decimal?)percentage;
                    _context.ExamResults.Update(resultExist);
                    _context.SaveChanges();
                }
               
               
                var percentagePass = _context.LastExams.FirstOrDefault(c => c.Id.Equals(request.LastExamId)).PercentageCompleted;
                if (percentage >= percentagePass)
                {
                    var comp = new CompletedExam
                    {
                        UserId = request.UserId,
                        LastExamId = request.LastExamId,
                    };
                    _context.CompletedExams.Add(comp);
                    await _context.SaveChangesAsync();

                    return new OkObjectResult(Message.MSG35);
                }

                return new OkObjectResult(Message.MSG36);
            }
        }
    }
}
