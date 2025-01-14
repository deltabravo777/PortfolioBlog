using Microsoft.AspNetCore.Mvc;
using PortfolioBlog.Server.IService;
using PortfolioBlog.Server.Models;
using PortfolioBlog.Server.Models.Blog.Articles;

namespace PortfolioBlog.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaylistController : Controller
    {
        private readonly IPlaylistService _playlistService;

        public PlaylistController(IPlaylistService playlistService)
        {
            _playlistService = playlistService;
        }

        // GET: /Playlist
        [HttpGet]
        public async Task<IActionResult> GetPlaylists()
        {
            var playlists = await _playlistService.GetAllPlaylistsAsync();
            return Ok(playlists); // Returns a list of playlists
        }

        // GET: /Playlist/{title}
        [HttpGet("{title}")]
        public async Task<IActionResult> GetPlaylistByTitle(string title)
        {
            var playlist = await _playlistService.GetPlaylistByTitleAsync(title);
            if (playlist == null)
            {
                return NotFound(); // Returns a 404 if playlist is not found
            }
            return Ok(playlist); // Returns a single playlist
        }

        // POST: /Playlist
        [HttpPost]
        public async Task<IActionResult> CreatePlaylist([FromBody] MusicPlaylist playlist)
        {
            if (playlist == null)
            {
                return BadRequest("Playlist cannot be null.");
            }

            await _playlistService.AddPlaylistAsync(playlist);
            return CreatedAtAction(nameof(GetPlaylistByTitle), new { title = playlist.Title }, playlist);
            // 201 Created with the URL of the new playlist
        }

        // PUT: /Playlist/{title}
        [HttpPut("{title}")]
        public async Task<IActionResult> UpdatePlaylist(string title, [FromBody] MusicPlaylist playlist)
        {
            if (playlist == null || playlist.Title != title)
            {
                return BadRequest("Playlist title mismatch.");
            }

            await _playlistService.UpdatePlaylistAsync(playlist);
            return Ok(playlist); // Returns the updated playlist
        }

        // DELETE: /Playlist/{title}
        [HttpDelete("{title}")]
        public async Task<IActionResult> DeletePlaylist(string title)
        {
            await _playlistService.DeletePlaylistByTitleAsync(title);
            return NoContent(); // Returns 204 No Content on successful deletion
        }
    }
}
