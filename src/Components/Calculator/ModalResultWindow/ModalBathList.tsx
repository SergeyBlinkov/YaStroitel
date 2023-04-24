import React from 'react';
import {
    IconButton,
    TableCell,
    TableRow
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import ceramic from '../../../database/priceWork/FlooringInstalation/ceramic.json'
import {deletePriceFromCalculatorReducer} from "../../../Redux/CalculatorBathSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {ICalculatorKeys} from "../../../Redux/TypesCalculatorBathSlice";


type ItemComponentType = {
    name:ICalculatorKeys
    mainType?:string,
    service: string,
    priceForPiece?: number,
    type?:string,
    amount?: number | string,
    price: number
}
type Data = {
    name: ICalculatorKeys
    type?: string ,
    mainType?:string,
}

function ModalBathList() {
    const BathCalc = useAppSelector(state => state.CalculatorBath)
    const dispatch = useAppDispatch()
    const MetresData:number = BathCalc.MetresRoom.floor.amount + BathCalc.MetresRoom.wall.amount
    let TwoTilesAmount:number = 0
    BathCalc.TileSize.tiles.forEach((tile) => TwoTilesAmount +=tile.amount)
    let amount = BathCalc.TileSize.oneTile === 'oneTile' ? MetresData : TwoTilesAmount
    const deleteOnClickFunc = (data:Data) => {
        const {name,type,mainType} = data
        dispatch(deletePriceFromCalculatorReducer({name,type,mainType}))
    }
    const ItemComponent = ({service, priceForPiece, amount, price,type,mainType,name}: ItemComponentType) => {
        let data = {name,type,mainType}
        return <>{price > 0 &&( <TableRow>
            <TableCell sx={{color:'#E5DCCB'}}>{service}</TableCell>
            <TableCell sx={{color:'#E5DCCB'}}>{priceForPiece || ''}</TableCell>
            <TableCell sx={{color:'#E5DCCB'}}>{amount || ''}</TableCell>
            <TableCell sx={{color:'#E5DCCB'}}>{price}</TableCell>
            <TableCell sx={{color:'#E5DCCB'}}><IconButton
                aria-label="delete"
                size="small"
                onClick={() => deleteOnClickFunc(data)}>
                        <span className={"ModalDeleteIcon"}><DeleteIcon
                            fontSize="inherit"
                        /></span>
            </IconButton></TableCell>
        </TableRow>
           )
        }</>
    }
    return <>
        {BathCalc.TileSize.tiles.map((tilesData,index) => {
            const isOneTile = BathCalc.TileSize.oneTile === 'oneTile'
            const amount:number = isOneTile ? MetresData : tilesData.amount
           return amount > 0 && <ItemComponent
               name={'TileSize'}
               mainType={tilesData.size}
               key={index}
               service={tilesData.label}
               priceForPiece={tilesData.singlePrice}
               amount={amount}
               price={tilesData.price}
           />
        })}
        {BathCalc.TileSize.tiles.map((tilesData,index) => {
            const type = tilesData.fillSeam.type
            const isOneTile = BathCalc.TileSize.oneTile === 'oneTile'
            const amount = isOneTile ? MetresData : tilesData.amount
            let GroutPrice:number = 0
            const groutData = ceramic.ceramicTiles.fillSeam
            if(type.length > 0) GroutPrice = +groutData[type as keyof typeof groutData].price
            else GroutPrice = 0
            return tilesData.fillSeam.type.length > 0 && <ItemComponent
                name={'TileSize'}
                        key={index}
                        type={'fillSeam'}
                        service={tilesData.fillSeam.label}
                        priceForPiece={GroutPrice}
                        amount={amount}
                        price={tilesData.fillSeam.price}
                        mainType={tilesData.size}
                    />

        })}
        <ItemComponent
            name={'prime'}
            service={BathCalc.prime.label}
            priceForPiece={ceramic.ceramicTiles.prime}
            amount={amount}
            price={BathCalc.prime.price}
        />
        {BathCalc.linearMetres.amount.map((tiles,index) => (
            <ItemComponent
                name={'linearMetres'}
                key={index}
                type={BathCalc.linearMetres.type}
                service={tiles.label}
                priceForPiece={tiles.price}
                amount={tiles.amount}
                price={tiles.price}
                mainType={tiles.size}
            />
        ))}
        <ItemComponent
            name={'hole'}
            type={BathCalc.hole.type}
            service={BathCalc.hole.label}
            priceForPiece={BathCalc.hole.priceForPie}
            amount={BathCalc.hole.amount}
            price={BathCalc.hole.price}
        />
        <ItemComponent
            name={'angle'}
            type={BathCalc.angle.type}
            service={BathCalc.angle.label}
            priceForPiece={BathCalc.angle.priceForPie}
            amount={BathCalc.angle.metres}
            price={BathCalc.angle.price}
        />
        <ItemComponent
            name={'antiWater'}
            type={BathCalc.antiWater.type}
            service={BathCalc.antiWater.label}
            priceForPiece={BathCalc.antiWater.priceForPie}
            amount={BathCalc.antiWater.amount}
            price={BathCalc.antiWater.price}
        />
        <ItemComponent
            name={'toilet'}
            type={BathCalc.toilet.type}
            service={BathCalc.toilet.label}
            amount={1}
            price={BathCalc.toilet.price}
        />
        <ItemComponent
            name={'bath'}
            type={BathCalc.bath.type}
            service={BathCalc.bath.label}
            amount={1}
            price={BathCalc.bath.price}
        />
        <ItemComponent
            name={'DryWallBath'}
            type={'bathroomScreen'}
            service={BathCalc.DryWallBath.bathroomScreen.label}
            price={BathCalc.DryWallBath.bathroomScreen.price}
        />
        <ItemComponent
            name={'DryWallBath'}
            type={'hatch'}
            service={BathCalc.DryWallBath.hatch.label}
            amount={1}
            price={BathCalc.DryWallBath.hatch.price}
        />
        <ItemComponent
            name={'DryWallBath'}
            type={'spaceUnderBath'}
            service={BathCalc.DryWallBath.spaceUnderBath.label}
            amount={`${BathCalc.DryWallBath.bathLength}м`}
            price={BathCalc.DryWallBath.spaceUnderBath.price}

        />
        <ItemComponent
            name={'DryWallBath'}
            type={'shelf'}
            service={BathCalc.DryWallBath.shelf.label}
            price={BathCalc.DryWallBath.shelf.price}
        />
        <ItemComponent
            name={'DryWallBox'}
            type={'angleCount'}
            service={BathCalc.DryWallBox.angleCount.label}
            amount={BathCalc.DryWallBox.angleCount.amount}
            price={BathCalc.DryWallBox.angleCount.price}
        />
        <ItemComponent
            name={'DryWallBox'}
            type={'twoAngleCount'}
            service={BathCalc.DryWallBox.twoAngleCount.label}
            amount={BathCalc.DryWallBox.twoAngleCount.amount}
            price={BathCalc.DryWallBox.twoAngleCount.price}
        />
        <ItemComponent
            name={'DryWallBox'}
            type={'hatch'}
            service={BathCalc.DryWallBox.hatch.label}
            price={BathCalc.DryWallBox.hatch.price}
        />
        <ItemComponent
            name={'DryWallShower'}
            type={'showerBoard'}
            service={BathCalc.DryWallShower.showerBoard.label}
            amount={BathCalc.DryWallShower.showerBoard.amount}
            price={BathCalc.DryWallShower.showerBoard.price}
            priceForPiece={BathCalc.DryWallShower.showerBoard.priceForPie}
        />
        <ItemComponent
            name={'showerType'}
            type={BathCalc.showerType.type}
            service={BathCalc.showerType.label}
            price={BathCalc.showerType.price}
            amount={1}
        />
        <ItemComponent
            name={'DryWallWall'}
            type={"wallLength"}
            service={BathCalc.DryWallWall.wallLength.label}
            amount={`${BathCalc.DryWallWall.wallLength.amount}п/м`}
            price={BathCalc.DryWallWall.wallLength.price}
        />
        <ItemComponent
            name={'DryWallWall'}
            mainType={"DryWallWall"}
            type={'doorBoolean'}
            service={BathCalc.DryWallWall.doorBoolean.label}
            price={BathCalc.DryWallWall.doorBoolean.price}
        />
        <ItemComponent
            name={'DryWallWall'}
            type={'soundBoolean'}
            service={BathCalc.DryWallWall.soundBoolean.label}
            price={BathCalc.DryWallWall.soundBoolean.price}
        />
        <ItemComponent
            name={'DryWallWall'}
            type={'socketCount'}
            service={BathCalc.DryWallWall.socketCount.label}
            amount={`${BathCalc.DryWallWall.socketCount.amount}шт`}
            price={BathCalc.DryWallWall.socketCount.price}
        />
        <ItemComponent
            name={'BathRoomSink'}
            service={BathCalc.BathRoomSink.label}
            price={BathCalc.BathRoomSink.price}
            amount={1}
        />

    </>
}

export default ModalBathList;