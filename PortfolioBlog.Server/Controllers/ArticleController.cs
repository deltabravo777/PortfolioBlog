using Microsoft.AspNetCore.Mvc;
using PortfolioBlog.Server.IService;
using PortfolioBlog.Server.Models;
using PortfolioBlog.Server.Models.Blog.Articles;


namespace PortfolioBlog.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleController : Controller
    {
        private readonly IBlogArticleService _articleService;

        public ArticleController(IBlogArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpGet("GetAllArticles")]
        public async Task<IActionResult> GetArticles()
        {
            var articles = await _articleService.GetAllBlogArticlesAsync();
            return Ok(articles); // Returns a list of articles
        }

        // GET: /Article/{title}
        [HttpGet("{title}")]
        public async Task<IActionResult> GetArticleByTitle(string title)
        {
            var article = await _articleService.GetBlogArticleByTitleAsync(title);
            if (article == null)
            {
                return NotFound(); // Returns a 404 if article is not found
            }
            return Ok(article); // Returns a single article
        }

        // POST: /Article
        [HttpPost]
        public async Task<IActionResult> CreateArticle([FromBody] BlogArticle article)
        {
            if (article == null)
            {
                return BadRequest("Article cannot be null.");
            }

            await _articleService.AddBlogArticleAsync(article);
            return CreatedAtAction(nameof(GetArticleByTitle), new { title = article.Title }, article);
            // 201 Created with the URL of the new article
        }

        // PUT: /Article/{title}
        [HttpPut("{title}")]
        public async Task<IActionResult> UpdateArticle(string title, [FromBody] BlogArticle article)
        {
            if (article == null || article.Title != title)
            {
                return BadRequest("Article title mismatch.");
            }

            await _articleService.UpdateBlogArticleAsync(article);
            return Ok(article); // Returns the updated article
        }

        // DELETE: /Article/{title}
        [HttpDelete("{title}")]
        public async Task<IActionResult> DeleteArticle(string title)
        {
            await _articleService.DeleteBlogArticleByTitleAsync(title);
            return NoContent(); // Returns 204 No Content on successful deletion
        }
    }
}
