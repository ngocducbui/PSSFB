﻿namespace ModerationService.API.Common.ModelDTO
{
    public class TestCaseDTO
    {
        public int Id { get; set; }
        public int? InputTypeInt { get; set; }
        public string? InputTypeString { get; set; }
        public int? ExpectedResultInt { get; set; }
        public int? CodeQuestionId { get; set; }
        public string? ExpectedResultString { get; set; }
        public bool? InputTypeBoolean { get; set; }
        public bool? ExpectedResultBoolean { get; set; }
        public string? InputTypeArrayInt { get; set; }
        public string? InputTypeArrayString { get; set; }
    }
}