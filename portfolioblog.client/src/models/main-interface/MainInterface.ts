import MainFunc from "../../func/main-func";
import { WindowDisplay } from "../window-display/window-display";

export interface MainInterface {
    user: string;
    windowDisplayEnumValue: WindowDisplay;

    mainFuncHandler?: ReturnType<typeof MainFunc>
}