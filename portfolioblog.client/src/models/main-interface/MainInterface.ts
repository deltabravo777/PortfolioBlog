import ArticlesFunc from "../../func/article/ArticlesFunc";
import MainFunc from "../../func/main-func";
import PlaylistsFunc from "../../func/playlist/PlaylistsFunc";
//import { MusicPlaylist } from "../blog/blog-playlist/music-playlist";
import { WindowDisplayEnum } from "../window-display/window-display-emum";
import { ArticleObject } from "./article/article-object";
import { NewArticleObject } from "./article/new-article-object";
import { EditorObject } from "./editor/editor-object";
import { PlaylistObject } from "./music-playlist/playlist-object";
import { WysiwygObject } from "./wysiwyg/wysiwyg-object";

export interface MainInterface {
    user: string;
    windowDisplayEnumValue: WindowDisplayEnum;
    jsonHeaders: Record<string, string>;

    wysiwygObject: WysiwygObject;
    articleObject: ArticleObject;
    playlistObject: PlaylistObject;
    editorObject: EditorObject;
    newArticleObject: NewArticleObject;

    mainFuncHandler?: ReturnType<typeof MainFunc>
    articlesHandler?: ReturnType<typeof ArticlesFunc>
    playlistsHandler?: ReturnType<typeof PlaylistsFunc>

}