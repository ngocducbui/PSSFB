﻿using System;
using System.Collections.Generic;

namespace CourseGRPC.Models
{
    public partial class CompleteLesson
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? LessonId { get; set; }
    }
}
