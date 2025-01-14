export interface MusicPlaylist {
    id: number; // Maps to 'Id'
    encryptedId?: string; // Maps to 'EncryptedId', optional because it's [NotMapped]
    title: string; // Maps to 'Title'
    playlistBody: string; // Maps to 'PlaylistBody'
    photoPath: string; // Maps to 'PhotoPath'
    rank: number; // Maps to 'Rank'
}
