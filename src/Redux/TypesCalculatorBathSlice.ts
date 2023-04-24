import {BathCalcType} from "../Components/Calculator/CalculatorBath/BathType";
export type ICalculatorKeys = keyof Omit<BathCalcType,'finalResult'>

export interface IDeletePrice {
    name: ICalculatorKeys,
    type?: string,
    mainType?: string
}

export type TCeramicItems = {
    size:string;
    price:number
    label:string
    img:string;
}
export interface IMakeFillSeam {
    item:TCeramicItems
    type: "epoxy" | 'grout'
}

export interface IWallInstallation {
    length: number,
    DoorBoolean: boolean,
    SoundBoolean: boolean,
    SocketBoolean: boolean,
    SocketCount: number
}

export interface IDryWallBathInit
    {
        bathLength: number,
        shelf: boolean,
        hatch: { hatchType: string, install: boolean },
        spaceUnderBath: boolean
    }

export interface IAntiWater {
    floor: boolean, wall: boolean, tape: boolean
}
export interface IBoxInstallation {
    hatch: { count: number, bool: boolean }
    angle: { angleCount: number, twoAngleCount: number, bool: boolean }
}