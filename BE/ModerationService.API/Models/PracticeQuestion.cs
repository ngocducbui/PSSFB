﻿using System;
using System.Collections.Generic;

namespace ModerationService.API.Models
{
    public partial class PracticeQuestion
    {
        public PracticeQuestion()
        {
            TestCases = new HashSet<TestCase>();
            UserAnswerCodes = new HashSet<UserAnswerCode>();
        }

        public int Id { get; set; }
        public string? Description { get; set; }
        public int? ChapterId { get; set; }
        public string? CodeForm { get; set; }
        public string? TestCaseJava { get; set; }
        public string? TestCaseC { get; set; }
        public string? TestCaseCplus { get; set; }
        public string? Title { get; set; }

        public virtual Chapter? Chapter { get; set; }
        public virtual ICollection<TestCase> TestCases { get; set; }
        public virtual ICollection<UserAnswerCode> UserAnswerCodes { get; set; }
    }
}
