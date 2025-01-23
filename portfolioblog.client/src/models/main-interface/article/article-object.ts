import { BlogArticle } from "../../blog/blog-article/BlogArticle";

export interface ArticleObject {
    articles: BlogArticle[]

    singleArticle: BlogArticle | null;
}