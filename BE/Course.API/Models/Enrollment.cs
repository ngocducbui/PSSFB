﻿using System;
using System.Collections.Generic;

namespace CourseService.API.Models
{
    public partial class Enrollment
    {
        public int Id { get; set; }
        public int? CourseId { get; set; }
        public int? UserId { get; set; }
    }
}