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

type LabelPrice = {
    label:string,
    price:number
}
type LabelAmountPrice = {
    label:string,
    amount:number,
    price:number
}
type LabelCountPrice = {
    label:string,
    count:number,
    price:number
}
type LabelCount = {
    label:string,
    count:number
}
   type DryWallBathType= {
        type:string,
        label:string,
        shelf:LabelPrice,
        hatch:Hatch,
        bathroomScreen:LabelPrice,
        bathLength:number,
        spaceUnderBath:LabelPrice,
        price:number
    }
type DryWallWallType= {
        type:string,
        label:string,
        wallLength:LabelAmountPrice,
        doorBoolean:LabelPrice,
        soundBoolean:LabelPrice,
        socketCount:LabelAmountPrice
        price:number
    }
type DryWallBoxType = {
        type:string,
        label:string,
        angleCount:LabelAmountPrice,
        twoAngleCount:LabelAmountPrice,
        hatch:LabelPrice,
        price:number
    }
type DryWallShowerType = {
        type:string,
        label:string,
        price:number,
        showerBoard : {
            type:string,
            label:string,
            amount:number,
            priceForPie:number,
            price:number
        }

    }
    type Hole = {
        label:string,
        amount:number,
        priceForPie:number,
        type:string,
        price:number
    }

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>
export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
type Angle = {
    type:string,
    label:string,
    priceForPie:number,
    metres:number,
    price:number
}
type LabelTypePrice ={
    type:string,
    label:string,
    price:number
}
type TypeLabelAmountPrice = {
    label:string,
    amount:number,
    type:string,
    price:number
}
type AntiWaterType = {
    label:string,
    type:string,
    priceForPie:number,
    amount:number,
    price:number
}
export interface BathCalcType {
    TileSize:tile,
    fillSeam:LabelTypePrice,
    prime:LabelPrice,
    angle:Angle,
    hole:Hole,
    finalResult:number,
    BathRoomSink:LabelTypePrice,
    linearMetres:TypeLabelAmountPrice,
    MetresRoom:MetresRoom,
    antiWater:AntiWaterType,
    toilet:LabelTypePrice,
    bath:LabelTypePrice,
    showerType:LabelTypePrice,
    DryWallBath:DryWallBathType,
    DryWallBox:DryWallBoxType,
    DryWallWall:DryWallWallType,
    DryWallShower:DryWallShowerType
}

