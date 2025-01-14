import { BlogArticle } from "../../blog-article/BlogArticle";

export interface ArticleObject {
    articles: BlogArticle[]

    singleArticle: BlogArticle | null;
}