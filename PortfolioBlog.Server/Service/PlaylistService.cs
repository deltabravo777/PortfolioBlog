using Microsoft.EntityFrameworkCore;
using PortfolioBlog.Server.ApplicationDbContext;
using PortfolioBlog.Server.IService;
using PortfolioBlog.Server.Models;
using PortfolioBlog.Server.Models.Blog.Articles;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PortfolioBlog.Server.Service
{
    public class PlaylistService : IPlaylistService
    {
        private readonly ArticleDbContext _dbContext;

        public PlaylistService(ArticleDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<MusicPlaylist>> GetAllPlaylistsAsync()
        {
            return await _dbContext.MusicPlaylists.ToListAsync();
        }

        public async Task<MusicPlaylist?> GetPlaylistByTitleAsync(string title)
        {
            return await _dbContext.MusicPlaylists.FirstOrDefaultAsync(p => p.Title == title);
        }

        public async Task AddPlaylistAsync(MusicPlaylist playlist)
        {
            _dbContext.MusicPlaylists.Add(playlist);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdatePlaylistAsync(MusicPlaylist playlist)
        {
            _dbContext.MusicPlaylists.Update(playlist);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeletePlaylistByTitleAsync(string title)
        {
            var playlist = await GetPlaylistByTitleAsync(title);
            if (playlist != null)
            {
                _dbContext.MusicPlaylists.Remove(playlist);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
