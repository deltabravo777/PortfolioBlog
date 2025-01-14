using PortfolioBlog.Server.Models;
using PortfolioBlog.Server.Models.Blog.Articles;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PortfolioBlog.Server.IService
{
    public interface IPlaylistService
    {
        Task<IEnumerable<MusicPlaylist>> GetAllPlaylistsAsync();
        Task<MusicPlaylist?> GetPlaylistByTitleAsync(string title);
        Task AddPlaylistAsync(MusicPlaylist playlist);
        Task UpdatePlaylistAsync(MusicPlaylist playlist);
        Task DeletePlaylistByTitleAsync(string title);
    }
}
