﻿namespace CompilerService.API.Models
{
    public class CodeRequestModel
    {
        public int PracticeQuestionId { get; set; }
        public string UserCode { get; set; }
        public int UserId { get; set; }
    }
    public class CodeLessonModel
    {
        public int LessonId { get; set; }
        public string UserCode { get; set; }
        public int UserId { get; set; }
    }
}
