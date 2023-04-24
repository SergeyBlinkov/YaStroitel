import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import ceramic from "../database/priceWork/FlooringInstalation/ceramic.json";
import plumbing from '../database/priceWork/plumbing/plumbing.json'
import dryWallWork from '../database/priceWork/dryWallWork/dryWallBath.json'
import {BathCalcType, Tiles} from "../Components/Calculator/CalculatorBath/BathType";
import {toPeriod} from "../Components/helperComponent/helperComponent";
import {
    IAntiWater,
    IBoxInstallation,
    IDeletePrice,
    IDryWallBathInit,
    IMakeFillSeam,
    IWallInstallation
} from "./TypesCalculatorBathSlice";



const hole = {
    type: 'porcelain',
    label: 'Отверстия',
    priceForPie: 0,
    amount: 0,
    price: 0
}
const angle = {
    type: "",
    label: 'Запил под 45',
    priceForPie: 0,
    metres: 0,
    price: 0
}


const DryWallBath = {
    type: 'DryWallBath',
    label: 'Гипсокартонные работы у ванны',
    shelf: {label: 'Полка у ванны', price: 0, type: "shelf"},
    bathroomScreen: {label: "Установка экрана под ванну", price: 0, type: "bathroomScreen"},
    bathLength: 0,
    spaceUnderBath: {label: 'Пространство под ванной', price: 0, type: "spaceUnderBath"},
    hatch: {type: "hatch", hatchType: "", label: 'Люк', price: 0},
    price: 0

}
const DryWallWall = {
    type: 'DryWallWall',
    label: 'Перегородка (стена) из гипсокартона',
    wallLength: {label: 'Длина стены', price: 0, amount: 0, type: "wallLength"},
    doorBoolean: {label: 'Дверной проём', price: 0, type: "doorBoolean"},
    soundBoolean: {label: 'Звукоизоляция', price: 0, type: "soundBoolean"},
    socketCount: {label: 'Отверстие под розетки', amount: 0, price: 0, type: "socketCount"},
    price: 0
}
const DryWallBox = {
    type: 'DryWallBox',
    label: 'Закрыть коробом трубы',
    angleCount: {label: 'Короб с одним внешним углом', amount: 0, price: 0, type: "angleCount"},
    twoAngleCount: {label: 'Короб с двумя внешними углами', amount: 0, price: 0, type: "twoAngleCount"},
    hatch: {label: 'Отверстие под люк в коробе', price: 0, type: "hatch"},
    price: 0
}
//todo DryWallShower пока что не задействован
const DryWallShower = {
    type: 'DryWallShower',
    label: 'Гипсокартонные работы в душе',
    price: 0,
    showerBoard: {
        type: 'showerBoard',
        label: 'Полка в душевой',
        priceForPie: 0,
        amount: 0,
        price: 0
    }
}

const linearMetres = {
    type: 'linearMetres',
    label: 'Плиточные откосы(места менее 30см)',
    amount: [{
        size: "Размер",
        label: 'Плитка',
        price: 0,
        amount: 0
    }],
    price: 0
}
const antiWater = {
    type: 'antiWater',
    label: 'Гидроизоляция',
    priceForPie: 0,
    amount: 0,
    price: 0
}
const TileSize = {
    oneTile: 'oneTile',
    tiles: [{
        size: "Размер",
        label: 'Плитка',
        price: 0,
        singlePrice: 0,
        amount: 0,
        fillSeam: {
            label: 'Затирка',
            type: '',
            price: 0
        }
    }]
}
const MetresRoom = {
    label: 'Квадратные метры комнаты',
    floor: {
        label: 'Полы',
        amount: 0
    },
    wall: {
        label: 'Стены',
        amount: 0
    }
}
const toilet = {
    label: 'Туалет',
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
    label: 'Установка раковины',
    type: 'BathRoomSink',
    price: 0
}
const prime = {
    label: 'Грунтовка',
    price: 0
}
const initBathSlice: BathCalcType = {
    TileSize,
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
    initialState: initBathSlice,
    reducers: {
        fillMetres: (state, action:PayloadAction<{ floor: number, wall: number }>) => {
            const ap = action.payload
            const apFloor = +action.payload.floor.toFixed(1)
            const apWall = +action.payload.wall.toFixed(1)
            const m2 = apFloor + apWall
            const fillSeam = ceramic.ceramicTiles.fillSeam
            const oneTile = state.TileSize.oneTile === 'oneTile'
            if (ap.floor > 0 || ap.wall > 0) {
                state.MetresRoom.wall.amount = apWall
                state.MetresRoom.floor.amount = apFloor
            } else {
                state.MetresRoom.wall.amount = 0
                state.MetresRoom.floor.amount = 0
            }
            if (state.prime.price === 0) {
                if (oneTile) {
                    state.prime.price = +(m2 * ceramic.ceramicTiles.prime).toFixed(0)
                } else {
                    state.TileSize.tiles.forEach(tile => state.prime.price += tile.amount)
                }

            }
            if (state.TileSize.tiles.every(tile => tile.singlePrice === 0)) {

            } else {
                state.TileSize.tiles.forEach((tile) => {
                    const type = tile.fillSeam.type
                    if (oneTile) {
                       tile.price = tile.singlePrice * m2
                    } else if(tile.price === 0) {
                       tile.price += tile.singlePrice * tile.amount
                    }
                    if (tile.fillSeam.type.length > 0) {
                    const fillSeamPrice = +fillSeam[type as keyof typeof fillSeam].price
                        if (oneTile) {
                           tile.fillSeam.price = fillSeamPrice * m2
                        } else {
                           tile.fillSeam.price = fillSeamPrice * tile.amount
                        }
                    }
                })
            }
        },

        resultCost: (state) => {
            const {antiWater, angle, hole, linearMetres} = state
            const toilet = state.toilet.price
            const bath = state.bath.price
            const m2 = state.MetresRoom.floor.amount + state.MetresRoom.wall.amount
            const m2TwoTile = () => {
                let m2 = 0
                state.TileSize.tiles.forEach(tileData => m2 += tileData.amount)
                return m2
            }
            const metres = m2 > 0 && state.TileSize.oneTile === 'oneTile' ? m2 : m2TwoTile()
            const showerType = state.showerType.price
            const DryWallBath = state.DryWallBath.price
            const DryWallWall = state.DryWallWall.price
            const DryWallBox = state.DryWallBox.price
            const DryWallShower = state.DryWallShower.price
            const BathRoomSinkResult = state.BathRoomSink.price
            // let price
            // if (state.TileSize.tiles.length < 2) {
            //     price = state.TileSize.tiles[0].price
            // } else {
            //     price = 0
            // }
            let fillSeam: number = 0
            state.TileSize.tiles.forEach(tileData => fillSeam += tileData.fillSeam.price)
            let prime = state.prime.price
            let tile: number = 0
            if (state.TileSize.oneTile === 'oneTile') {
                prime = +( m2 * ceramic.ceramicTiles.prime).toFixed(0)
                tile = state.TileSize.tiles[0].price
            } else {
                state.TileSize.tiles.forEach((tileData) => {
                    tile += tileData.price
                    prime = state.prime.price
                })
            }
            const result = tile + hole.price + angle.price + linearMetres.price + antiWater.price
                + toilet + bath + showerType + DryWallBath + DryWallWall + DryWallBox + DryWallShower
                + BathRoomSinkResult + fillSeam + prime
            if (tile === 0 || +metres === 0) state.finalResult = 0
            state.finalResult = result
        },
        tileAmount: (state, action) => {
            const fillSeamData = ceramic.ceramicTiles.fillSeam
            const ap = action.payload
            const amount: number = +toPeriod(ap.amount)
            let prime: number = 0
            state.TileSize.tiles = state.TileSize.tiles.map((tiles) => {
                const type = tiles.fillSeam.type
                if (tiles.size === ap.size) {
                    tiles.price = amount * tiles.singlePrice
                    if (tiles.fillSeam.type.length > 0) {
                        return ({
                            ...tiles, amount, fillSeam: {
                                ...tiles.fillSeam,
                                price: +fillSeamData[type as keyof typeof fillSeamData].price * amount
                            }
                        })
                    }
                    return ({...tiles, amount})
                } else return tiles
            })
            state.TileSize.tiles.forEach((tileData) => prime += +(tileData.amount * ceramic.ceramicTiles.prime).toFixed(0))

            state.prime.price = prime
        },
        setNumberTile: (state, action) => {
            state.TileSize.oneTile = action.payload
        },
        tileSize: (state, action) => {

            const metres = state.MetresRoom.floor.amount + state.MetresRoom.wall.amount
            const {size} = action.payload
            const oneTile = state.TileSize.oneTile === 'oneTile'
            const currTile = ceramic.ceramicTiles.size.filter(data => data.size === size)[0]
            const tileExist = state.TileSize.tiles.filter(data => data.size === size)[0]
            const tileSize = {
                label: `Размер плитки: ${currTile.label}`,
                size: currTile.size,
                singlePrice: currTile.price,
                price: 0,
                amount: 0,
                fillSeam: {
                    label: 'Затирка',
                    type: '',
                    price: 0
                }
            }
            if (tileExist) {
                // const newArr = state.TileSize.tiles.map(tile => tile.size === size ? tileSize : tile)
                state.prime.price = +(metres * ceramic.ceramicTiles.prime)
                // state.TileSize.tiles = newArr
                return
            }
            if (state.TileSize.tiles[0].singlePrice === 0 || oneTile) {
                if (metres > 0) {
                    tileSize.price = currTile.price * +metres
                }
                state.TileSize.tiles = [tileSize]
            } else {

                state.TileSize.tiles.push(tileSize)
            }
            if (oneTile) {
                state.prime.price = +(metres * ceramic.ceramicTiles.prime).toFixed(0)
            } else {
                state.TileSize.tiles.forEach(tile => state.prime.price += +(tile.amount * ceramic.ceramicTiles.prime).toFixed(0))
            }
        },
        makeFillSeam: (state, action:PayloadAction<IMakeFillSeam>) => {

            const {type, item} = action.payload
            let fillSeamType = ''
            if (type === 'epoxy') fillSeamType = 'Эпоксидная'
            if (type === 'grout') fillSeamType = 'Цементная'
            const fillSeam = ceramic.ceramicTiles.fillSeam
            const oneTileChecker = state.TileSize.oneTile === 'oneTile'
            const m2 = state.MetresRoom.floor.amount + state.MetresRoom.wall.amount
            let tileItem = state.TileSize.tiles.filter((tile) => tile.size === item.size)[0]
            let fillSeamResult = {
                label: `Затирка ${fillSeamType} ${tileItem.label} `,
                type: type,
                price: 0
            }
            if (m2 > 0 && oneTileChecker) {
                fillSeamResult.price = +fillSeam[type as keyof typeof fillSeam].price * m2
                state.prime.price = ceramic.ceramicTiles.prime * m2
            }
            if (tileItem.amount > 0 && !oneTileChecker) {
                fillSeamResult.price = +fillSeam[type as keyof typeof fillSeam].price * tileItem.amount
                state.prime.price = ceramic.ceramicTiles.prime * tileItem.amount
            }
            state.TileSize.tiles = state.TileSize.tiles.map((tile) => tile.size === item.size ? ({...tile,fillSeam:fillSeamResult} ): tile)
        },
        antiWaterPrice: (state, action: PayloadAction<IAntiWater>) => {
            const {floor, wall, tape} = action.payload
            const antiWater = ceramic.ceramicTiles.antiWater
            const FloorMetres = +state.MetresRoom.floor.amount.toFixed(1)
            const WallMetres = +state.MetresRoom.wall.amount.toFixed(1)
            const TapeMetres = +(Math.sqrt(state.MetresRoom.floor.amount) * 4).toFixed(1)
            const floorPrice = state.MetresRoom.floor.amount * antiWater
            const wallPrice = state.MetresRoom.wall.amount * antiWater
            const tapePrice = TapeMetres * antiWater
            state.antiWater.priceForPie = antiWater
            if (floor) {
                state.antiWater.price = floorPrice
                state.antiWater.label = 'Гидроизоляция полов'
                state.antiWater.amount = FloorMetres
            }
            if (wall) {
                state.antiWater.price = wallPrice
                state.antiWater.label = 'Гидроизоляция стен'
                state.antiWater.amount = WallMetres
            }
            if (tape) {
                state.antiWater.price = tapePrice
                state.antiWater.amount = TapeMetres
                state.antiWater.label = 'Гидроизоляционная лента'
            }
            if (floor && wall && !tape) {
                state.antiWater.amount = +(FloorMetres + WallMetres).toFixed(1)
                state.antiWater.price = floorPrice + wallPrice
                state.antiWater.label = 'Гидроизоляция полов и стен'
            }
            if (floor && wall && tape) {
                state.antiWater.amount = +(FloorMetres + WallMetres + TapeMetres).toFixed(1)
                state.antiWater.price = floorPrice + wallPrice + tapePrice
                state.antiWater.label = 'Гидроизоляция полов, стен и гидроизоляционная лента'
            }
            if (floor && tape && !wall) {
                state.antiWater.amount = +(FloorMetres + TapeMetres).toFixed(1)
                state.antiWater.price = floorPrice + tapePrice
                state.antiWater.label = 'Гидроизоляция полов и гидроизоляционная лента'
            }
            if (wall && tape && !floor) {
                state.antiWater.amount = +(WallMetres + TapeMetres).toFixed(1)
                state.antiWater.price = wallPrice + tapePrice
                state.antiWater.label = 'Гидроизоляция стен и гидроизоляционная лента'
            }
        },
        toiletInstallation: (state, action: PayloadAction<string>) => {
            const type = action.payload
            state.toilet = {
                label: (type === 'toilet' ? 'Напольный туалет' : 'Инсталяция'),
                type: 'toilet',
                price: plumbing.toilet[type as keyof typeof plumbing.toilet]
            }
        },
        boxInstallation: (state, action: PayloadAction<IBoxInstallation>) => {
            const {hatch, angle} = action.payload
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
        wallInstallation: (state, action: PayloadAction<IWallInstallation>) => {
            const {length, DoorBoolean, SoundBoolean, SocketCount} = action.payload
            const DoorResult = dryWallWork.dryWallWall.doorPrice
            const SoundResult = dryWallWork.dryWallWall.soundPrice * length
            const SocketCountResult = dryWallWork.dryWallWall.socketPrice * SocketCount
            const LengthResult = dryWallWork.dryWallWall.lengthPrice * length
            if (DoorBoolean) state.DryWallWall.doorBoolean.price = DoorResult
            if (SoundBoolean) state.DryWallWall.soundBoolean.price = SoundResult
            if (SocketCount > 0) {
                state.DryWallWall.socketCount.amount = SocketCount
                state.DryWallWall.socketCount.price = SocketCountResult
            }
            state.DryWallWall.wallLength.amount = length
            state.DryWallWall.wallLength.price = LengthResult
            state.DryWallWall.price = DoorResult + SoundResult + SocketCountResult + LengthResult
        },
        bathInstallation: (state, action: PayloadAction<string>) => {
            const ap = action.payload
            state.bath = plumbing.bath[ap as keyof typeof plumbing.bath]
        },
        showerInstallation: (state, action: PayloadAction<string>) => {
            const ap = action.payload
            if (ap === 'straight') {
                state.showerType.label = 'Прямой душевой поддон'
                state.showerType.price = plumbing.shower.straight
            }
            if (ap === 'circle') {
                state.showerType.label = 'Полукруглый душ поддон'
                state.showerType.price = plumbing.shower.circle
            }
            if (ap === 'square') {
                state.showerType.label = 'Прямоугольный душ поддон'
                state.showerType.price = plumbing.shower.square
            }
            if (ap === 'withCab' || ap === 'withoutBorder') {
                state.showerType.label = 'Тяжело расчитать данный вариант, необходимо посещение объекта'
                state.showerType.price = 0
            }
        },
        additionalItemAngle: (state, action) => {

            const {type, amount} = action.payload
            const angle = ceramic.ceramicTiles.angle
            const angleResult = +angle[type as keyof typeof angle].price
            state.angle.type = type
            state.angle.priceForPie = +angleResult
            state.angle.metres = +amount
            state.angle.price = +angleResult * +amount
        },
        additionalItemHole: (state, action: { type: string, payload: { type: string, amount: number } }) => {
            const {type, amount} = action.payload
            state.hole.type = action.payload.type
            const hole = ceramic.ceramicTiles.hole
            const holeResult = +hole[type as keyof typeof hole]
            state.hole.amount = amount
            state.hole.price = amount * holeResult
            state.hole.priceForPie = +holeResult
        },
        additionalItemLinearMetres: (state, action:PayloadAction<Tiles[]>) => {
            const ap = action.payload
            const linearArray = ap.map(tile => ({...tile,
                label:`Откосы у плитки - ${tile.label}`,
                singlePrice:tile.singlePrice / 2,
                price:(tile.singlePrice / 2) * tile.amount}))
            let price = 0
            for (let i = 0; i < ap.length; i++) {
                price += linearArray[i].price
            }
            state.linearMetres.amount = linearArray
            state.linearMetres.price = price
        },
        dryWallBathScreen: (state, action: PayloadAction<IDryWallBathInit>) => {
            const ap = action.payload
            const dryWallBase = dryWallWork.dryWallBath
            const bath = state.DryWallBath
            state.DryWallBath.bathLength = ap.bathLength
            if (ap.shelf) state.DryWallBath.shelf.price = dryWallBase.shelf
            if (ap.spaceUnderBath) state.DryWallBath.spaceUnderBath.price = dryWallBase.spaceUnderBath
            if (ap.hatch.install) {
                if (ap.hatch.hatchType === 'plastic') state.DryWallBath.hatch.label = 'Люк(пластиковый)'
                else state.DryWallBath.hatch.label = 'Люк скрытого монтажа(с облицовкой плиткой)'
                state.DryWallBath.hatch.hatchType = ap.hatch.hatchType
                state.DryWallBath.hatch.price = dryWallBase.hatch[ap.hatch.hatchType as keyof typeof dryWallBase.hatch]
            }
            state.DryWallBath.bathroomScreen.price = dryWallBase.dryWallBathScreen * ap.bathLength
            const result = state.DryWallBath.bathroomScreen.price + bath.shelf.price +
                bath.hatch.price + bath.spaceUnderBath.price
            state.DryWallBath.price = +result

        },
        bathRoomSink: (state) => {
            state.BathRoomSink.price = plumbing.bathRoomSink
        },
        deletePriceFromCalculatorReducer: (state, action:PayloadAction<IDeletePrice>) => {
            const {name, type, mainType} = action.payload

            if (name === 'DryWallBath') {
                if (type === 'DryWallBath') {
                    state.finalResult = state.finalResult - state.DryWallBath.price
                    state.DryWallBath.hatch.price = 0
                    state.DryWallBath.price = 0
                    state.DryWallBath.bathroomScreen.price = 0
                    state.DryWallBath.shelf.price = 0
                    state.DryWallBath.spaceUnderBath.price = 0
                }
                if (type === 'hatch') {
                    state.DryWallBath.price =
                        state.DryWallBath.price - state.DryWallBath.hatch.price
                    state.finalResult = state.finalResult - state.DryWallBath.hatch.price
                    state.DryWallBath.hatch.price = 0
                }
                if (type === 'bathroomScreen') {
                    state.DryWallBath.price =
                        state.DryWallBath.price - state.DryWallBath.bathroomScreen.price
                    state.finalResult = state.finalResult - state.DryWallBath.bathroomScreen.price
                    state.DryWallBath.bathroomScreen.price = 0
                }
                if (type === 'spaceUnderBath') {
                    state.DryWallBath.price =
                        state.DryWallBath.price - state.DryWallBath.spaceUnderBath.price
                    state.finalResult = state.finalResult - state.DryWallBath.spaceUnderBath.price
                    state.DryWallBath.spaceUnderBath.price = 0
                }
                if (type === 'shelf') {
                    state.DryWallBath.price =
                        state.DryWallBath.price - state.DryWallBath.shelf.price
                    state.finalResult = state.finalResult - state.DryWallBath.shelf.price
                    state.DryWallBath.shelf.price = 0
                }
            }
            if (name === 'DryWallWall') {
                if (type === 'socketCount') {
                    state.DryWallWall.price =
                        state.DryWallWall.price - state.DryWallWall.socketCount.price
                    state.finalResult = state.finalResult - state.DryWallWall.socketCount.price
                    state.DryWallWall.socketCount.price = 0
                }
                if (type === 'doorBoolean') {
                    state.DryWallWall.price =
                        state.DryWallWall.price - state.DryWallWall.doorBoolean.price
                    state.finalResult = state.finalResult - state.DryWallWall.doorBoolean.price
                    state.DryWallWall.doorBoolean.price = 0
                }
                if (type === 'soundBoolean') {
                    state.DryWallWall.price =
                        state.DryWallWall.price - state.DryWallWall.soundBoolean.price
                    state.finalResult = state.finalResult - state.DryWallWall.soundBoolean.price
                    state.DryWallWall.soundBoolean.price = 0
                }
                if (type === 'wallLength') {
                    state.DryWallWall.price =
                        state.DryWallWall.price - state.DryWallWall.wallLength.price
                    state.finalResult = state.finalResult - state.DryWallWall.wallLength.price
                    state.DryWallWall.wallLength.price = 0
                }
                if (type === 'DryWallWall') {
                    state.DryWallWall.doorBoolean.price = 0
                    state.DryWallWall.soundBoolean.price = 0
                    state.DryWallWall.wallLength.price = 0
                    state.DryWallWall.socketCount.price = 0
                    state.DryWallWall.price = 0
                }
            }
            if (name === 'angle') {
                state.finalResult = state.finalResult - state.angle.price
                state.angle.price = 0
            }
            if (name === 'hole') {
                state.finalResult = state.finalResult - state.hole.price
                state.hole.price = 0
            }
            if (name === 'linearMetres') {
                state.finalResult -= state.linearMetres.price
                const newArr = state.linearMetres.amount.filter((tile) => {
                    state.linearMetres.price -= tile.price
                    return tile.size !== mainType
                })
                state.linearMetres.amount = newArr
            }
            if (name === 'DryWallBox') {
                if (type === 'angleCount') {
                    state.DryWallBox.price =
                        state.DryWallBox.price - state.DryWallBox.angleCount.price
                    state.finalResult = state.finalResult - state.DryWallBox.angleCount.price
                    state.DryWallBox.angleCount.price = 0
                }
                if (type === 'twoAngleCount') {
                    state.DryWallBox.price =
                        state.DryWallBox.price - state.DryWallBox.twoAngleCount.price
                    state.finalResult = state.finalResult - state.DryWallBox.twoAngleCount.price
                    state.DryWallBox.twoAngleCount.price = 0
                }
                if (type === 'hatch') {
                    state.DryWallBox.price =
                        state.DryWallBox.price - state.DryWallBox.hatch.price
                    state.finalResult = state.finalResult - state.DryWallBox.hatch.price
                    state.DryWallBox.hatch.price = 0
                }
                if (type === 'DryWallBox') {
                    state.DryWallBox.angleCount.price = 0
                    state.DryWallBox.twoAngleCount.price = 0
                    state.DryWallBox.hatch.price = 0
                    state.DryWallBox.price = 0
                }
            }
            if (name === 'DryWallShower') {
                state.finalResult = state.finalResult - state.DryWallShower.showerBoard.price
                state.DryWallShower.showerBoard.price = 0
            }
            if (name === 'bath') {
                state.finalResult = state.finalResult - state.bath.price
                state.bath.price = 0
            }
            if (name === 'toilet') {
                state.finalResult = state.finalResult - state.toilet.price
                state.toilet.price = 0
            }
            if (name === 'showerType') {
                state.finalResult = state.finalResult - state.showerType.price
                state.showerType.price = 0
            }
            if (name === 'antiWater') {
                state.finalResult = state.finalResult - state.antiWater.price
                state.antiWater.price = 0
            }
            if (name === 'TileSize') {
                const item = state.TileSize.tiles.filter((tile) => tile.size === mainType)[0]
                if (type === 'fillSeam') {
                    state.finalResult -= item.fillSeam.price
                    const newArr = state.TileSize.tiles.map(tiles => tiles.size === mainType ? ({
                        ...tiles,
                        fillSeam: {
                            ...tiles.fillSeam,
                            label: 'Затирка',
                            type: '',
                            price: 0
                        }
                    }) : tiles)
                    state.TileSize.tiles = newArr
                } else {
                    state.finalResult -= (item.price + item.fillSeam.price)
                    if(state.TileSize.tiles.length === 1) {
                        state.TileSize.tiles = TileSize.tiles
                    }   else {
                    state.TileSize.tiles = state.TileSize.tiles.filter((tile ) =>
                    tile.size !== mainType)
                    }
                }
                return
            }
            if (name === 'prime') {
                state.finalResult -= state.prime.price
                state.prime.price = 0

            }
            if (name === 'BathRoomSink') {
                state.finalResult = state.finalResult - state.BathRoomSink.price
                state.BathRoomSink.price = 0
            }
        }

    }
})

export const {
    makeFillSeam, fillMetres, resultCost, tileSize, antiWaterPrice, toiletInstallation,
    bathInstallation
    , additionalItemAngle, additionalItemHole, bathRoomSink, showerInstallation, dryWallBathScreen,
    deletePriceFromCalculatorReducer, boxInstallation, wallInstallation, additionalItemLinearMetres,
    tileAmount, setNumberTile
} = CalculatorBathSlice.actions

export default CalculatorBathSlice.reducer