import MainFunc from "../../func/main-func";
import { WindowDisplayEnum } from "../window-display/window-display-emum";

export interface MainInterface {
    user: string;
    windowDisplayEnumValue: WindowDisplayEnum;

    mainFuncHandler?: ReturnType<typeof MainFunc>
}