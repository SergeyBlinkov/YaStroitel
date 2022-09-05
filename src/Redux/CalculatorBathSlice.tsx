import {createSlice} from "@reduxjs/toolkit";
import ceramic from "../database/priceWork/FlooringInstalation/ceramic.json";
import plumbing from '../database/priceWork/plumbing/plumbing.json'
import dryWallBath from '../database/priceWork/dryWallWork/dryWallBath.json'
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
//


const hole = {
    type:'porcelain',
    label:'Отверстия',
    amount:0,
    price:0
}
const angle = {
    type:"degree",
    label:'Запил под 45',
    metres:0,
    price:0
}
const dryWall = {
    type:'dryWall',
    label: 'Гипсокартоновые работы',
    price:0,
    bath : {
        type:'dryWallBath',
        label:'Гипсокартонные работы у ванны',
        shelf: 0,
        bathLength: 0,
        spaceUnderBath: 0,
        hatch: {type:"",label:'Люк',price:0},
        price: 0

    },
    wall : {
        type:'dryWallWall',
        label:'Перегородка(стена) из гипсокартона',
        wallLength: 0,
        price:0
    },
    box : {
        type:'dryWallBox',
        label:'Закрыть коробом трубы',
        boxLength: 0,
        price:0
    },
    shower: {
        type:'dryWallShower',
        label:'Гипсокартонные работы в душе',
        showerBoard: {
            type:'dryWallShowerBoard',
            label:'Полка в душевой',
            amount:0,
            price:0
        }
    }
}
const linearMetres = {
    type:'linearMetres',
    label:'Погонные метры',
    price: 0
}
const antiWater = {
    type:'antiWater',
    label:'Гидроизоляция',
    variant:'',
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
    type: '',
    price: 0
}
const showerTray = {
    // label: 'Трап в душе',
    type: '',
    price: 0
}

const init:BathCalcType = {
    TileSize,
    MetresRoom,
    linearMetres,
    hole,
    angle,
    antiWater,
    finalResult: 0,
    toilet,
    bath,
    showerTray,
    dryWall
}

const CalculatorBathSlice = createSlice({
    name: 'CalculatorBath',
    initialState:init,
    reducers: {
        fillMetres: (state,action) => {
            const ap:{floor:number,wall:number} = action.payload
            const apFloor = action.payload.floor.toFixed(1)
            const apWall = action.payload.wall.toFixed(1)
            if(ap.floor > 0 || ap.wall > 0) {
                state.MetresRoom.wall.amount = +apWall
                state.MetresRoom.floor.amount = +apFloor
            } else {
                state.MetresRoom.wall.amount = 0
                state.MetresRoom.floor.amount = 0
            }
        },
        resultCost : (state) => {
            const {TileSize,linearMetres,hole,angle,antiWater} = state
            const metres = state.MetresRoom.wall.amount + state.MetresRoom.floor.amount
            const  {fillSeam,prime} = ceramic.ceramicTiles
            state.finalResult = ((TileSize.price + fillSeam + prime) * +metres) +
                hole.price + angle.price + linearMetres.price + antiWater.price
        },
        tileSize: (state,action) => {
            state.TileSize = action.payload
        },
        calcBathResult: (state,action:{payload:number,type:string}) => {
            state.finalResult = action.payload
        },
        antiWaterPrice: (state, action:antiWaterType) => {
            const {floor,wall,tape} = action.payload
            const antiWater = ceramic.ceramicTiles.antiWater
            const floorPrice = state.MetresRoom.floor.amount * antiWater
            const wallPrice = state.MetresRoom.wall.amount * antiWater
            const tapePrice = 500
            if(floor) {
                state.antiWater.price = floorPrice
                state.antiWater.variant = 'Полы'}
            if(wall) {
                state.antiWater.price = wallPrice
                state.antiWater.variant = 'Стены'
            }
            if(tape) {
                state.antiWater.price = tapePrice
                state.antiWater.variant = 'Гидроизоляционная лента'
            }
            if(floor && wall) {
                state.antiWater.price = floorPrice + wallPrice
                state.antiWater.variant = 'Полы и стены'
            }
            if(floor && wall && tape) {
                state.antiWater.price = floorPrice + wallPrice + tapePrice
                state.antiWater.variant = 'Полы, стены и гидроизоляционная лента'
            }
            if(floor && tape) {
                state.antiWater.price = floorPrice + tapePrice
                state.antiWater.variant = 'Полы и гидроизоляционная лента'
            }
            if(wall && tape) {
                state.antiWater.price = wallPrice + tapePrice
                state.antiWater.variant = 'Стены и гидроизоляционная лента'
            }
        },
        toiletInstallation: (state, action:{type:string,payload:string}) => {
            const type = action.payload
            state.toilet = {label:(type === 'toilet'? 'Напольный туалет' : 'Инсталяция'),
            type,
            price:plumbing.toilet[type as keyof typeof plumbing.toilet]}
        },
        bathInstallation : (state, action) => {
            const ap:string = action.payload
            state.bath = plumbing.bath[ap as keyof typeof plumbing.bath]
        },

        angleChange: (state, action) => {
            const metres = action.payload
            const angleResult = ceramic.ceramicTiles.angle
            const name = state.angle.type
            state.angle = {
                type: name,
                label: angleResult[name as keyof typeof angleResult].label,
                metres:+metres,
                price: angleResult[name as keyof typeof angleResult].price * +metres
            }
        },
        angleClick:(state, action) => {
            const angleResult = ceramic.ceramicTiles.angle
            const ap = action.payload
            state.angle.type = ap
            state.angle.price = +state.angle.metres * +angleResult[ap as keyof typeof angleResult]
        },
        holeChange : (state, action) =>  {
            const ap = action.payload
            const hole = ceramic.ceramicTiles.hole
            const holeResult = +hole[state.hole.type as keyof typeof hole]
            state.hole.amount = ap
            state.hole.price = ap * holeResult
        },
        holeClick : (state, action) =>  {
            state.hole.type = action.payload
            const hole = ceramic.ceramicTiles.hole
            const holeResult = +hole[state.hole.type as keyof typeof hole]
            state.hole.price = state.hole.amount * holeResult
        },
        showerTrayClick : (state, action) => {
            const ap = action.payload
            const shower = ceramic.ceramicTiles.showerTray
            if(ap === 'nothing') {
                state.showerTray = {
                    type: '',
                    price: 0
                }
            } else state.showerTray = {
                type:ap,
                price:shower[ap as keyof typeof shower]
            }
        },
        dryWallBathScreen: (state, action:{payload:dryWallBathInit,type:string}) => {
            const ap = action.payload
            const dryWallBase = dryWallBath.dryWallBath
            const bath = state.dryWall.bath
            state.dryWall.bath.bathLength = ap.bathLength
            if(ap.shelf) state.dryWall.bath.shelf = dryWallBase.shelf
            if(ap.spaceUnderBath) state.dryWall.bath.spaceUnderBath = dryWallBase.spaceUnderBath
            if(ap.hatch.install) {
                state.dryWall.bath.hatch.type = ap.hatch.type
                state.dryWall.bath.hatch.price = dryWallBase.hatch[ap.hatch.type as keyof typeof dryWallBase.hatch]
            }
            const result = (bath.bathLength * dryWallBase.dryWallBathScreen) + bath.shelf +
                bath.hatch.price + bath.spaceUnderBath
            state.dryWall.bath.price = +result
            state.dryWall.price = state.dryWall.price + result
        },
        deletePriceFromCalculatorReducer: (state, action) => {
            const {name,type}:{name:string,type?:string} = action.payload
            console.log(name,type)
            if(name === 'dryWall') {
                if (type === 'dryWallBath') {
                    state.dryWall.bath.hatch.price = 0
                    state.dryWall.bath.price = 0
                }
                if (type === 'dryWallWall') state.dryWall.wall.price = 0
                if (type === 'dryWallBox') state.dryWall.box.price = 0
                if (type === 'dryWallShower') state.dryWall.shower.showerBoard.price = 0
                state.dryWall.price = 0
            }
            if(name === 'bath') state.bath.price = 0
            if(name === 'toilet') state.toilet.price = 0
            if(name === 'showerTray') state.showerTray.price = 0
            if(name === 'antiWater') state.antiWater.price = 0
        }
    }
})

export const {fillMetres,tileSize,calcBathResult,antiWaterPrice,toiletInstallation,bathInstallation
,angleChange,angleClick,holeChange,holeClick,showerTrayClick,dryWallBathScreen,
    deletePriceFromCalculatorReducer} = CalculatorBathSlice.actions

export default CalculatorBathSlice.reducer