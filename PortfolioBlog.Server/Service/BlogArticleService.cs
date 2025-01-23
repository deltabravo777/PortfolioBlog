using PortfolioBlog.Server.ApplicationDbContext;
using PortfolioBlog.Server.IService;
using PortfolioBlog.Server.Models.Blog.Articles;
using Microsoft.EntityFrameworkCore;
using PortfolioBlog.Server.Models.ResultWrapper;

namespace PortfolioBlog.Server.Service
{
    public class BlogArticleService : IBlogArticleService
    {
        private readonly ArticleDbContext _context;

        public BlogArticleService(ArticleDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BlogArticle>> GetAllBlogArticlesAsync()
        {
            return await _context.BlogArticles.ToListAsync();
        }

        public async Task<BlogArticle> GetBlogArticleByTitleAsync(string title)
        {
            return await _context.BlogArticles.FirstOrDefaultAsync(b => b.Title == title);
        }

        public async Task<int> AddBlogArticleAsync(BlogArticle blogArticle)
        {
            _context.BlogArticles.Add(blogArticle);
            return await _context.SaveChangesAsync();
        }

        public async Task UpdateBlogArticleAsync(BlogArticle blogArticle)
        {
            _context.BlogArticles.Update(blogArticle);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBlogArticleByTitleAsync(string title)
        {
            var blogArticle = await _context.BlogArticles.FirstOrDefaultAsync(b => b.Title == title);
            if (blogArticle != null)
            {
                _context.BlogArticles.Remove(blogArticle);
                await _context.SaveChangesAsync();
            }
        }
    }
}
