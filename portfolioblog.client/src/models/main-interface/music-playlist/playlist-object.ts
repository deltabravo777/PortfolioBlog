import { MusicPlaylist } from "../../blog/blog-playlist/music-playlist";

export interface PlaylistObject {
    playlists: MusicPlaylist[];
    singlePlaylist: MusicPlaylist | null;
}