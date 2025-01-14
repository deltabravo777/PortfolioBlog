using PortfolioBlog.Server.ApplicationDbContext;
using PortfolioBlog.Server.IService;
using PortfolioBlog.Server.Service;

using Microsoft.EntityFrameworkCore;

namespace PortfolioBlog.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            // Configure SQLite database for ArticleDbContext
            builder.Services.AddDbContext<ArticleDbContext>(options =>
                options.UseSqlite("Data Source=Databases/BlogArticleDb.db")); // SQLite database file name

            // Register services (example)
            builder.Services.AddScoped<IBlogArticleService, BlogArticleService>();

            builder.Services.AddControllers();

            // Add CORS configuration
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigins", policy =>
                {
                    policy.WithOrigins("https://localhost:51237") // Replace with your frontend's URL
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            app.UseDefaultFiles();
            app.MapStaticAssets();

            // Enable CORS
            app.UseCors("AllowSpecificOrigins");

            // Configure the HTTP request pipeline.
            app.UseHttpsRedirection();
            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            // Ensure database is created at runtime
            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ArticleDbContext>();
                dbContext.Database.EnsureCreated();
            }

            app.Run();
        }
    }
}
