﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.Message
{
    public record IntegrationBaseEvent() : IIntegrationEvent
    {
        public DateTime CreationDate { get; set; } =DateTime.Now;
        public Guid Id { get;set; }
    }
}
