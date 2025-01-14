import { ArticleCategories } from "./ArticleCategories";
import { CalendarMonths } from "./CalendarMonths";

export interface BlogArticle {
    id: number;
    encryptedId: string | null; // Corresponds to nullable EncryptedId
    title: string;
    articleBody: string;
    photoPath: string;
    year: number;
    month: CalendarMonths;
    day: number;
    rank: number;
    category: ArticleCategories;
}