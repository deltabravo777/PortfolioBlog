using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioBlog.Server.Models.Blog.Playlists
{
    public class Playlist
    {
        // [Key]
        // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [NotMapped]
        public string EncryptedId { get; set; }
        public string Title { get; set; }
        public string PlaylistBody { get; set; }
        public string PhotoPath { get; set; }
        public double Rank { get; set; }
    }
}
