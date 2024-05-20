﻿using System;
using System.Collections.Generic;

namespace ModerationService.API.Models
{
    public partial class Forum
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? PostContent { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? LastUpdate { get; set; }
    }
}
