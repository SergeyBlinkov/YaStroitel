import {createSlice} from "@reduxjs/toolkit";
import ceramic from "../database/priceWork/FlooringInstalation/ceramic.json";
import plumbing from '../database/priceWork/plumbing/plumbing.json'
import dryWallWork from '../database/priceWork/dryWallWork/dryWallBath.json'
import {BathCalcType} from "../Components/Calculator/CalculatorBath/BathType";


//type components
type dryWallBathInit =
{
    bathLength:number,
    shelf:boolean,
    hatch: {type:string,install:boolean},
    spaceUnderBath:boolean
}
type antiWaterType = {
    type:string,
    payload:{floor:boolean,wall:boolean,tape:boolean}
}
type BoxInstallationType = {
    type:string,
    payload: {hatch: { count:number,bool:boolean },
        angle: { angleCount:number,twoAngleCount:number,bool:boolean }}
}
type PayloadString = {
    type:string,
    payload:string
}

type WallInstallationType = {
    type:string,
    payload: {
        length: number,
        DoorBoolean: boolean,
        SoundBoolean: boolean,
        SocketBoolean: boolean,
        SocketCount: number
    }
}
//


const hole = {
    type:'porcelain',
    label:'Отверстия',
    priceForPie:0,
    amount:0,
    price:0
}
const angle = {
    type:"",
    label:'Запил под 45',
    priceForPie:0,
    metres:0,
    price:0
}


const DryWallBath = {
        type:'dryWallBath',
        label:'Гипсокартонные работы у ванны',
        shelf: {label:'Полка у ванны',price:0},
        bathroomScreen:{label:"Установка экрана под ванну",price:0},
        bathLength: 0,
        spaceUnderBath: {label:'Пространство под ванной',price:0},
        hatch: {type:"",label:'Люк',price:0},
        price: 0

    }
const DryWallWall = {
        type:'dryWallWall',
        label:'Перегородка (стена) из гипсокартона',
        wallLength: {label:'Длина стены',price:0,amount:0},
        doorBoolean:{label:'Дверной проём',price:0},
        soundBoolean:{label:'Звукоизоляция',price:0},
        socketCount:{label:'Отверстие под розетки',amount:0,price:0},
        price:0
    }
const DryWallBox = {
        type:'dryWallBox',
        label:'Закрыть коробом трубы',
        angleCount: {label:'Короб с одним внешним углом',amount:0,price:0},
        twoAngleCount: {label:'Короб с двумя внешними углами',amount:0,price:0},
        hatch:{label:'Отверстие под люк в коробе',price:0},
        price:0
    }
    //todo DryWallShower пока что не задействован
   const DryWallShower = {
        type:'dryWallShower',
        label:'Гипсокартонные работы в душе',
        price:0,
        showerBoard: {
            type:'dryWallShowerBoard',
            label:'Полка в душевой',
            priceForPie:0,
            amount:0,
            price:0
        }
    }

const linearMetres = {
    type:'linearMetres',
    label:'Плиточные откосы(места менее 30см)',
    amount:0,
    price: 0
}
const antiWater = {
    type:'antiWater',
    label:'Гидроизоляция',
    priceForPie:0,
    amount:0,
    price:0
}
const TileSize = {
    size: "Размер",
    label: 'Плитка',
    price:0,

}
const MetresRoom = {
    label:'Квадратные метры комнаты',
    floor: {
        label : 'Полы',
        amount: 0
    },
    wall: {
        label : 'Стены',
        amount: 0
    }
}
const toilet = {
    label:'Туалет',
    type: '',
    price: 0
}
const bath = {
    label: 'Ванна',
    type: 'bath',
    price: 0
}
const showerType = {
    label: 'Душ поддон',
    type: 'showerType',
    price: 0
}
const BathRoomSink = {
    label:'Установка раковины',
    type:'BathRoomSink',
    price:0
}
const fillSeam = {
    label:'Затирка',
    type:'',
    price:0
}
const prime = {
    label:'Грунтовка',
    price: 0
}
const init:BathCalcType = {
    TileSize,
    fillSeam,
    prime,
    MetresRoom,
    linearMetres,
    hole,
    angle,
    antiWater,
    finalResult: 0,
    toilet,
    bath,
    BathRoomSink,
    showerType,
    DryWallBath,
    DryWallBox,
    DryWallWall,
    DryWallShower
}

const CalculatorBathSlice = createSlice({
    name: 'CalculatorBath',
    initialState:init,
    reducers: {
        fillMetres: (state,action) => {
            const ap:{floor:number,wall:number} = action.payload
            const apFloor = action.payload.floor.toFixed(1)
            const apWall = action.payload.wall.toFixed(1)
            const typeFillSeam = state.fillSeam.type
            const fillSeam = ceramic.ceramicTiles.fillSeam
            if(state.TileSize.price > 0) {
                if(state.fillSeam.type.length > 0) state.fillSeam.price =
                    +fillSeam[typeFillSeam as keyof typeof fillSeam].price * +(+apFloor + +apWall)
                state.prime.price = +ceramic.ceramicTiles.prime * +(+apFloor + +apWall)
            }
            if(ap.floor > 0 || ap.wall > 0) {
                state.MetresRoom.wall.amount = +apWall
                state.MetresRoom.floor.amount = +apFloor
            } else {
                state.MetresRoom.wall.amount = 0
                state.MetresRoom.floor.amount = 0
            }
        },

        resultCost : (state) => {
            const {antiWater,angle,hole,linearMetres} = state

            const toilet = state.toilet.price
            const bath = state.bath.price
            const metres = state.MetresRoom.floor.amount + state.MetresRoom.wall.amount
            const showerType = state.showerType.price
            const DryWallBath = state.DryWallBath.price
            const DryWallWall = state.DryWallWall.price
            const DryWallBox = state.DryWallBox.price
            const DryWallShower = state.DryWallShower.price
            const BathRoomSinkResult = state.BathRoomSink.price
            const price = state.TileSize.price
            const fillSeam = state.fillSeam.price
            const prime = state.prime.price
            const tile = price * +metres
            const result = tile + hole.price + angle.price + linearMetres.price + antiWater.price
                + toilet + bath + showerType + DryWallBath + DryWallWall + DryWallBox + DryWallShower
                + BathRoomSinkResult + fillSeam + prime
            if(price === 0 || +metres === 0) state.finalResult = 0
            state.finalResult = result
        },
        tileSize: (state,action) => {
            const {tile,price} = action.payload
            const metres = state.MetresRoom.floor.amount + state.MetresRoom.wall.amount
            const currTile = ceramic.ceramicTiles.size.filter(data => data.tile === tile)

            state.TileSize = {
                label:`Размер плитки: ${currTile[0].label}`,
                size:tile,
                price:price
            }
            state.prime.price = +(metres * ceramic.ceramicTiles.prime).toFixed(0)

        },
        makeFillSeam:(state,action) => {
            const type = action.payload

            let fillSeamType = ''
            if(type === 'epoxy') fillSeamType = 'Эпоксидная'
            if(type === 'grout') fillSeamType = 'Цементная'
            const fillSeam = ceramic.ceramicTiles.fillSeam
            const metres = state.MetresRoom.floor.amount + state.MetresRoom.wall.amount
            state.fillSeam.type = type
            state.fillSeam.price = fillSeam[type as keyof typeof fillSeam].price * +metres
            state.fillSeam.label = `Затирка ${fillSeamType}`
        },
        antiWaterPrice: (state, action:antiWaterType) => {
            const {floor,wall,tape} = action.payload
            const antiWater = ceramic.ceramicTiles.antiWater
            const FloorMetres = +state.MetresRoom.floor.amount.toFixed(1)
            const WallMetres = +state.MetresRoom.wall.amount.toFixed(1)
            const TapeMetres = +(Math.sqrt(state.MetresRoom.floor.amount) * 4).toFixed(1)
            const floorPrice = state.MetresRoom.floor.amount * antiWater
            const wallPrice = state.MetresRoom.wall.amount * antiWater
            const tapePrice = TapeMetres * antiWater
            state.antiWater.priceForPie = antiWater
            if(floor) {
                state.antiWater.price = floorPrice
                state.antiWater.label = 'Гидроизоляция полов'
                state.antiWater.amount = FloorMetres
            }
            if(wall) {
                state.antiWater.price = wallPrice
                state.antiWater.label = 'Гидроизоляция стен'
                state.antiWater.amount = WallMetres
            }
            if(tape) {
                state.antiWater.price = tapePrice
                state.antiWater.amount = TapeMetres
                state.antiWater.label = 'Гидроизоляционная лента'
            }
            if(floor && wall && !tape) {
                state.antiWater.amount = +(FloorMetres + WallMetres).toFixed(1)
                state.antiWater.price = floorPrice + wallPrice
                state.antiWater.label = 'Гидроизоляция полов и стен'
            }
            if(floor && wall && tape) {
                state.antiWater.amount = +(FloorMetres + WallMetres + TapeMetres).toFixed(1)
                state.antiWater.price = floorPrice + wallPrice + tapePrice
                state.antiWater.label = 'Гидроизоляция полов, стен и гидроизоляционная лента'
            }
            if(floor && tape && !wall) {
                state.antiWater.amount = +(FloorMetres + TapeMetres).toFixed(1)
                state.antiWater.price = floorPrice + tapePrice
                state.antiWater.label = 'Гидроизоляция полов и гидроизоляционная лента'
            }
            if(wall && tape && !floor) {
                state.antiWater.amount = +(WallMetres + TapeMetres).toFixed(1)
                state.antiWater.price = wallPrice + tapePrice
                state.antiWater.label = 'Гидроизоляция стен и гидроизоляционная лента'
            }
        },
        toiletInstallation: (state, action:PayloadString) => {
            const type = action.payload
            state.toilet = {label:(type === 'toilet'? 'Напольный туалет' : 'Инсталяция'),
            type:'toilet',
            price:plumbing.toilet[type as keyof typeof plumbing.toilet]}
        },
        boxInstallation: (state, action:BoxInstallationType) => {
            const {hatch,angle} = action.payload
            const angleResult = dryWallWork.dryWallBox.angle * angle.angleCount
            const twoAngleResult = dryWallWork.dryWallBox.twoAngle * angle.twoAngleCount
            const hatchResult = dryWallWork.dryWallBox.hatch * hatch.count
            state.DryWallBox.angleCount.price = angleResult
            state.DryWallBox.angleCount.amount = angle.angleCount
            state.DryWallBox.twoAngleCount.price = twoAngleResult
            state.DryWallBox.twoAngleCount.amount = angle.twoAngleCount
            state.DryWallBox.hatch.price = hatchResult
            state.DryWallBox.price = angleResult + twoAngleResult + hatchResult
        },
        wallInstallation: (state, action:WallInstallationType) => {
            const {length,DoorBoolean,SoundBoolean,SocketCount} = action.payload
            const DoorResult = dryWallWork.dryWallWall.doorPrice
            const SoundResult = dryWallWork.dryWallWall.soundPrice * length
            const SocketCountResult = dryWallWork.dryWallWall.socketPrice * SocketCount
            const LengthResult = dryWallWork.dryWallWall.lengthPrice * length
            if(DoorBoolean) state.DryWallWall.doorBoolean.price = DoorResult
            if(SoundBoolean) state.DryWallWall.soundBoolean.price = SoundResult
            if(SocketCount > 0) {
                state.DryWallWall.socketCount.amount = SocketCount
                state.DryWallWall.socketCount.price = SocketCountResult
            }
            state.DryWallWall.wallLength.amount = length
            state.DryWallWall.wallLength.price = LengthResult
            state.DryWallWall.price = DoorResult + SoundResult + SocketCountResult + LengthResult
        },
        bathInstallation : (state, action:PayloadString) => {
            const ap = action.payload
            state.bath = plumbing.bath[ap as keyof typeof plumbing.bath]
        },
        showerInstallation : (state,action:PayloadString) => {
            const ap = action.payload
            if(ap === 'straight') {
                state.showerType.label = 'Прямой душевой поддон'
                state.showerType.price = plumbing.shower.straight
            }
            if(ap === 'circle') {
                state.showerType.label = 'Полукруглый душ поддон'
                state.showerType.price = plumbing.shower.circle
            }
            if(ap === 'square') {
                state.showerType.label = 'Прямоугольный душ поддон'
                state.showerType.price = plumbing.shower.square
            }
            if(ap === 'withCab' || ap === 'withoutBorder') {
                state.showerType.label = 'Тяжело расчитать данный вариант, необходимо посещение объекта'
                state.showerType.price = 0
            }
        },
        additionalItemAngle : (state,action) => {
            const {type,amount} = action.payload
            const angle = ceramic.ceramicTiles.angle
            const angleResult = +angle[type as keyof typeof angle].price
            state.angle.type = type
            state.angle.priceForPie = +angleResult
            state.angle.metres = +amount
            state.angle.price = +angleResult * +amount
        },
        additionalItemHole : (state, action:{type:string,payload:{type:string,amount:number}}) =>  {
            const {type,amount} = action.payload
            state.hole.type = action.payload.type
            const hole = ceramic.ceramicTiles.hole
            const holeResult = +hole[type as keyof typeof hole]
            state.hole.amount = amount
            state.hole.price = amount * holeResult
            state.hole.priceForPie = +holeResult
        },
        additionalItemLinearMetres: (state, action) => {
            const ap = action.payload
            state.linearMetres.amount = ap
            state.linearMetres.price = (state.TileSize.price / 2) * ap
        },
        dryWallBathScreen: (state, action:{payload:dryWallBathInit,type:string}) => {
            const ap = action.payload
            const dryWallBase = dryWallWork.dryWallBath
            const bath = state.DryWallBath
            state.DryWallBath.bathLength = ap.bathLength
            if(ap.shelf) state.DryWallBath.shelf.price = dryWallBase.shelf
            if(ap.spaceUnderBath) state.DryWallBath.spaceUnderBath.price = dryWallBase.spaceUnderBath
            if(ap.hatch.install) {
                if(ap.hatch.type === 'plastic') state.DryWallBath.hatch.label = 'Люк(пластиковый)'
                else state.DryWallBath.hatch.label = 'Люк скрытого монтажа(с облицовкой плиткой)'
                state.DryWallBath.hatch.type = ap.hatch.type
                state.DryWallBath.hatch.price = dryWallBase.hatch[ap.hatch.type as keyof typeof dryWallBase.hatch]
            }
            const result = (bath.bathLength * dryWallBase.dryWallBathScreen) + bath.shelf.price +
                bath.hatch.price + bath.spaceUnderBath.price + dryWallBase.dryWallBathScreen * ap.bathLength
            state.DryWallBath.price = +result
            state.DryWallBath.bathroomScreen.price = dryWallBase.dryWallBathScreen * ap.bathLength
        },
        bathRoomSink : (state) => {
            state.BathRoomSink.price = plumbing.bathRoomSink
        },
        deletePriceFromCalculatorReducer: (state, action) => {
            const {name,type}:{name:string,type?:string} = action.payload

            if (type === 'dryWallBath') {
                    state.DryWallBath.hatch.price = 0
                    state.DryWallBath.price = 0
                    state.DryWallBath.bathroomScreen.price = 0
                    state.DryWallBath.shelf.price = 0
                    state.DryWallBath.spaceUnderBath.price = 0
                }
            if (type === 'dryWallWall') {
                state.DryWallWall.doorBoolean.price = 0
                state.DryWallWall.soundBoolean.price = 0
                state.DryWallWall.wallLength.price = 0
                state.DryWallWall.socketCount.price = 0
                state.DryWallWall.price = 0
            }
            if(type === 'hole') state.hole.price = 0
            if (type === 'dryWallBox') {
                state.DryWallBox.angleCount.price = 0
                state.DryWallBox.twoAngleCount.price = 0
                state.DryWallBox.hatch.price = 0
                state.DryWallBox.price = 0
            }
            if (type === 'dryWallShower') state.DryWallShower.showerBoard.price = 0
            if(name === 'bath') state.bath.price = 0
            if(name === 'toilet') state.toilet.price = 0
            if(name === 'showerType') state.showerType.price = 0
            if(name === 'antiWater') state.antiWater.price = 0
            if(name === 'TileSize' || name === 'prime') {
                state.TileSize.price = 0
                state.prime.price = 0
            }
            if(name === 'BathRoomSink') state.BathRoomSink.price = 0
            if(name === 'fillSeam') {
                state.fillSeam.type = ''
                state.fillSeam.price = 0
                state.fillSeam.label = 'Затирка'
            }
        }

    }
})

export const {makeFillSeam,fillMetres,resultCost,tileSize,antiWaterPrice,toiletInstallation,
    bathInstallation
,additionalItemAngle,additionalItemHole,bathRoomSink,showerInstallation,dryWallBathScreen,
    deletePriceFromCalculatorReducer,boxInstallation,wallInstallation,additionalItemLinearMetres} = CalculatorBathSlice.actions

export default CalculatorBathSlice.reducer