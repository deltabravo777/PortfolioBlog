import MainFunc from "../../func/main-func";
import { MusicPlaylist } from "../blog/blog-playlist/music-playlist";
import { WindowDisplayEnum } from "../window-display/window-display-emum";
import { ArticleObject } from "./article/article-object";
import { PlaylistObject } from "./music-playlist/playlist-object";
import { WysiwygObject } from "./wysiwyg/wysiwyg-object";

export interface MainInterface {
    user: string;
    windowDisplayEnumValue: WindowDisplayEnum;

    wysiwygObject: WysiwygObject;
    articleObject: ArticleObject;
    playlistObject: PlaylistObject;

    mainFuncHandler?: ReturnType<typeof MainFunc>
}