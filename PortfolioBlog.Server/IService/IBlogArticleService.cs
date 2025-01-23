using PortfolioBlog.Server.Models.Blog.Articles;

namespace PortfolioBlog.Server.IService
{
    public interface IBlogArticleService
    {
        Task<IEnumerable<BlogArticle>> GetAllBlogArticlesAsync();
        Task<BlogArticle> GetBlogArticleByTitleAsync(string title);
        Task<int> AddBlogArticleAsync(BlogArticle blogArticle);
        Task UpdateBlogArticleAsync(BlogArticle blogArticle);
        Task DeleteBlogArticleByTitleAsync(string title);
    }
}
