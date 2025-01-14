import MainFunc from "../../func/main-func";
import { WindowDisplayEnum } from "../window-display/window-display-emum";
import { ArticleObject } from "./article/article-object";
import { WysiwygObject } from "./wysiwyg/wysiwyg-object";

export interface MainInterface {
    user: string;
    windowDisplayEnumValue: WindowDisplayEnum;

    wysiwygObject: WysiwygObject;
    articleObject: ArticleObject;

    mainFuncHandler?: ReturnType<typeof MainFunc>
}