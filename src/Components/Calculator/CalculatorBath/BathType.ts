import React from "react";

type tile = {
    tile:string,
    price:number
}
type metres = {
    floor:number,
    wall:number
}
type Toilet = {
    type:string,
    price:number
}
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>
export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
type Angle = {
    type:string,
    metres:number,
    price:number
}
type Hole ={
    type:string,
    count:number,
    price:number
}
export interface BathCalc {
    size:tile,
    angle:Angle,
    hole:Hole,
    finalResult:number,
    linearMetres:number,
    metres:metres,
    antiWater:number,
    toilet:Toilet,
    bath:Toilet,
    showerTray:Toilet
}