using ForumService.API.GrpcServices;
using ForumService.API.MessageBroker;
using ForumService.API.Models;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using UserGrpc;


namespace ForumService.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //automaper
            builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
            // rabbitMQ
            var configuration = builder.Configuration.GetSection("EventBusSetting:HostAddress").Value;

            var mqConnection = new Uri(configuration);

            builder.Services.AddMassTransit(config =>
            {
              
                config.AddConsumersFromNamespaceContaining<EventPostHandler>();

                config.UsingRabbitMq((ctx, cfg) =>
                {
                    cfg.Host(mqConnection);
                    cfg.ConfigureEndpoints(ctx);

                });

            });
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins("http://localhost:5173","http://14.225.218.205:8080")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod());
            });

            //gRPC
            var config = builder.Configuration.GetSection("GrpcSetting:UserUrl").Value;
            builder.Services.AddSingleton(config);
            builder.Services.AddGrpcClient<GetUserService.GetUserServiceClient>(x => x.Address = new Uri(config));
            builder.Services.AddScoped<GetUserInfoService>();


            builder.Services.AddDbContext<ForumContext>(
  options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
  );         //mediator
            builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors("AllowSpecificOrigin");
            app.MapControllerRoute(
                 name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
