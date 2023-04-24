import React from "react";

export type Tiles = {
    label:string
    size:string,
    price:number
    amount:number
    singlePrice:number
    fillSeam:LabelTypePrice
}
export type TilesObject = {
    oneTile:string;
    tiles:Tiles[]
}

type MetresRoom = {
    label:string,
    floor: {label:string,amount:number},
    wall: {label:string,amount:number}
}
type Hatch = {
    hatchType:string,
    type:string,
    label:string,
    price:number
}

type LabelPrice = {
    label:string,
    price:number
}
type LabelPriceType = {
    label:string,
    price:number,
    type:string
}
type LabelAmountPrice = {
    label:string,
    amount:number,
    price:number,
}
type LabelAmountPriceType = {
    label:string,
    amount:number,
    price:number,
    type:string
}

   type DryWallBathType= {
        type:string,
        label:string,
        shelf:LabelPriceType,
        hatch:Hatch,
        bathroomScreen:LabelPriceType,
        bathLength:number,
        spaceUnderBath:LabelPriceType,
        price:number
    }
type DryWallWallType= {
        type:string,
        label:string,
        wallLength:LabelAmountPrice,
        doorBoolean:LabelPriceType,
        soundBoolean:LabelPriceType,
        socketCount:LabelAmountPriceType
        price:number
    }
type DryWallBoxType = {
        type:string,
        label:string,
        angleCount:LabelAmountPriceType,
        twoAngleCount:LabelAmountPriceType,
        hatch:LabelPriceType,
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

type LinearTypes = {
    label:string,
    amount: Array<{
        label:string
        size:string,
        price:number
        amount:number
    }>,
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
    TileSize:TilesObject,
    prime:LabelPrice,
    angle:Angle,
    hole:Hole,
    finalResult:number,
    BathRoomSink:LabelTypePrice,
    linearMetres:LinearTypes,
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

