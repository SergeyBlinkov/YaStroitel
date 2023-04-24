import { RefObject} from "react";

export interface IFirstLine {
    amount?: number;
}
export interface IFigureLine {
    amount?: number;
    isOdd?: boolean;
    fromTop?: number;
    fromTopNextLines?: number;
}
export interface IFigureBehind {
    amount?: number;
    windowRef:RefObject<HTMLDivElement>
}
