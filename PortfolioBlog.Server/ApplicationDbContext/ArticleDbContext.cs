using Microsoft.EntityFrameworkCore;
using PortfolioBlog.Server.Models.Blog.Articles;

namespace PortfolioBlog.Server.ApplicationDbContext
{
    public class ArticleDbContext : DbContext
    {
        public ArticleDbContext(DbContextOptions<ArticleDbContext> options) : base(options)
        {
        }

        public DbSet<BlogArticle> BlogArticles { get; set; }
        public DbSet<MusicPlaylist> MusicPlaylists { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure BlogArticle
            //modelBuilder.Entity<BlogArticle>(entity =>
            //{
            //    entity.HasKey(b => b.id); // Specify id as the primary key
            //    entity.Property(b => b.id)
            //          .ValueGeneratedOnAdd(); // Auto-increment for SQLite
            //});

            //// Configure MusicPlaylist
            //modelBuilder.Entity<MusicPlaylist>(entity =>
            //{
            //    entity.HasKey(m => m.id); // Specify id as the primary key
            //    entity.Property(m => m.id)
            //          .ValueGeneratedOnAdd(); // Auto-increment for SQLite
            //});
        }
    }
}
