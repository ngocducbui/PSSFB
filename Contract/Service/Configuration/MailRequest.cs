﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Service.Configuration
{
    public class MailRequest
    {
        [EmailAddress]
        public string From { get; set; }
        [EmailAddress]
        public string ToAddress { get; set; }

        public IEnumerable<string> ToAddresses { get; set; } = new List<string>();
        public string Subject { get; set; }
        public string Body { get; set; }
        public IFormFileCollection Attachments { get; set; }
    }
}
