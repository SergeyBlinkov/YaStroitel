import {ChangeEvent} from "react";

export interface I_UI_Block__input {
    label?:string
    onChange?:(e:ChangeEvent<HTMLInputElement>) => void
    name?:string
    onKeyDown?:(e:KeyboardEvent) => void
}