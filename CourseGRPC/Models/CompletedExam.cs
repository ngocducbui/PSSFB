﻿using System;
using System.Collections.Generic;

namespace CourseGRPC.Models
{
    public partial class CompletedExam
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? LastExamId { get; set; }
    }
}
