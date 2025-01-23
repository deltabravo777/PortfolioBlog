using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using PortfolioBlog.Server.IService;
using PortfolioBlog.Server.Models;
using PortfolioBlog.Server.Models.Blog.Articles;
using Newtonsoft.Json;


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
        [HttpPost("UploadNewArticle")]
        public async Task<IActionResult> CreateArticle([FromBody] dynamic payload)
        {
            JsonElement jsonElement = (JsonElement)payload;

            // Convert the JsonElement to a JSON string
            string jsonString = jsonElement.GetRawText();

            // Deserialize the JSON string into a BlogArticle object
            var article = JsonConvert.DeserializeObject<BlogArticle>(jsonString);
            //return Ok("test message works for creatingArticle");

            if (article == null)
            {
                return BadRequest("Article cannot be null.");
            }

            var result = await _articleService.AddBlogArticleAsync(article);
            if (result > 0)
            {
                return CreatedAtAction(nameof(GetArticleByTitle), new { title = article.Title }, article);
            }
            else {
                return BadRequest("the article could not be saved");
            }
           
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
