import React from "react";

type tile = {
    label:string,
    size:string,
    price:number
}
type MetresRoom = {
    label:string,
    floor: {label:string,amount:number},
    wall: {label:string,amount:number}
}
type Hatch = {
    type:string,
    label:string,
    price:number
}
export type DryWallType = {
    type:string,
    label:string,
    price:number,
    bath: {
        type:string,
        label:string,
        shelf:number,
        hatch:Hatch,
        bathLength:number,
        spaceUnderBath:number,
        price:number
    },
    wall: {
        type:string,
        label:string,
        wallLength:number,
        price:number
    },
    box: {
        type:string,
        label:string,
        boxLength:number,
        price:number
    },
    shower: {
        type:string,
        label:string,
        showerBoard : {
            type:string,
            label:string,
            amount:number,
            price:number
        }
    }
}
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>
export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
type Angle = {
    type:string,
    label:string,
    metres:number,
    price:number
}
type Hole ={
    type:string,
    label:string,
    amount:number,
    price:number
}
type TypeLabelAmountPrice = {
    label?:string,
    amount?:number,
    type?:string,
    price:number
}
type AntiWaterType = {
    label:string,
    type:string,
    variant:string
    price:number
}
export interface BathCalcType {
    TileSize:tile,
    angle:Angle,
    hole:Hole,
    finalResult:number,
    linearMetres:TypeLabelAmountPrice,
    MetresRoom:MetresRoom,
    antiWater:AntiWaterType,
    toilet:TypeLabelAmountPrice,
    bath:TypeLabelAmountPrice,
    showerTray:TypeLabelAmountPrice,
    dryWall:DryWallType
}

