import {createSlice} from "@reduxjs/toolkit";
import ceramic from "../database/priceWork/FlooringInstalation/ceramic.json";
import plumbing from '../database/priceWork/plumbing/plumbing.json'
import dryWallBath from '../database/priceWork/dryWallWork/dryWallBath.json'

const init = {
    size:{tile: "",price:Number()},
    metres: {floor:Number(),wall:Number()},
    linearMetres: Number(),
    hole:{
        type:'porcelain',
        count:Number(),
        price:Number()
    },
    angle:{
        type:"degree",
        metres:Number(),
        price:Number()
    },
    antiWater: Number(),
    finalResult: Number(),
    toilet:{type:'',price:Number()},
    bath : {type:'',price:Number()},
    showerTray : {type: '', price:Number()},
    dryWall: {
        bath : {
            board: Number(),
            bathLength: Number(),
            price:Number()
        },
        wall : {
            wallLength: Number(),
            price:Number()
        },
        box : {
            boxLength: Number(),
            price:Number()
        },
        shower: {
            showerBoard: {
                amount:Number(),
                price:Number()
            }
        }
    }
}
const CalculatorBathSlice = createSlice({
    name: 'CalculatorBath',
    initialState:init,
    reducers: {
        fillMetres: (state,action) => {
            const ap = action.payload
            const apFloor = action.payload.floor.toFixed(1)
            const apWall = action.payload.wall.toFixed(1)
            if(ap.floor > 0 || ap.wall > 0) {
                state.metres.wall = +apWall
                state.metres.floor = +apFloor
            } else {
                state.metres.wall = 0
                state.metres.floor = 0
            }
        },
        resultCost : (state) => {
            const {size,linearMetres,hole,angle,antiWater} = state
            const metres = state.metres.wall + state.metres.floor
            const  {fillSeam,prime} = ceramic.ceramicTiles
            state.finalResult = ((size.price + fillSeam + prime) * +metres) +
                hole.price + angle.price + linearMetres + antiWater
        },
        tileSize: (state,action) => {
            state.size = action.payload
        },
        calcBathResult: (state,action) => {
            state.finalResult = action.payload
        },
        antiWaterPrice: (state, action) => {
            state.antiWater = action.payload
        },
        toiletInstallation: (state, action) => {
            state.toilet = action.payload
        },
        bathInstallation : (state, action) => {
            const ap = action.payload
            const nothing = {type:'',price:0}
            if(ap === 'nothing') state.bath = nothing
            else state.bath = plumbing.bath[ap as keyof typeof plumbing.bath]
        },
        angleChange: (state, action) => {
            const metres = action.payload
            const angleResult = ceramic.ceramicTiles.angle
            const name = state.angle.type
            state.angle = {
                type: name,
                metres:+metres,
                price: angleResult[name as keyof typeof angleResult] * +metres
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
            state.hole.count = ap
            state.hole.price = ap * holeResult
        },
        holeClick : (state, action) =>  {
            state.hole.type = action.payload
            const hole = ceramic.ceramicTiles.hole
            const holeResult = +hole[state.hole.type as keyof typeof hole]
            state.hole.price = state.hole.count * holeResult
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
        dryWallBoardBath: (state, action) => {
            const board = dryWallBath.dryWallBath.board
            const price = state.dryWall.bath.price
            const ap = action.payload
            if(ap) {
                state.dryWall.bath.board = board
                state.dryWall.bath.price = price + board
            } else {
                state.dryWall.bath.board = 0
                state.dryWall.bath.price = price - board
            }
        }

    }
})

export const {fillMetres,tileSize,calcBathResult,antiWaterPrice,toiletInstallation,bathInstallation
,angleChange,angleClick,holeChange,holeClick,showerTrayClick,dryWallBoardBath} = CalculatorBathSlice.actions

export default CalculatorBathSlice.reducer