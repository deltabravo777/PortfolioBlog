import { BlogArticle } from "../../blog/blog-article/BlogArticle";
import { ArticleEditMode } from "./ArticleEditMode";

export interface EditorObject {
    articleEditMode: ArticleEditMode;
    editingArticle: BlogArticle | null;
}