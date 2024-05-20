﻿using Contract.Service.Message;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModerationService.API.Models;
using System.Security.Cryptography.Pkcs;

namespace ModerationService.API.Fearture.Command.Forum
{
    public class DeletePostCommand : IRequest<IActionResult>
    {
        public int PostId { get; set; }

        public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand, IActionResult>
        {
            private readonly Content_ModerationContext _context;

            public DeletePostCommandHandler(Content_ModerationContext context)
            {
                _context = context;

            }
            public async Task<IActionResult> Handle(DeletePostCommand request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts.FirstOrDefaultAsync(x => x.Id.Equals(request.PostId));
                if (post == null)
                {
                    return new NotFoundObjectResult(Message.MSG34);
                }

                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();

                var moderation = _context.Moderations.FirstOrDefault(c => c.PostId.Equals(request.PostId));
                if (moderation != null)
                {
                    _context.Moderations.Remove(moderation);
                    await _context.SaveChangesAsync();
                }
              
                return new OkObjectResult(post.Id);
            }
        }
    }
}
