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


type ItemComponentType = {
    mainType?:string,
    service: string,
    priceForPiece?: number,
    type?:string,
    amount?: number | string,
    price: number
}
type Data = {
    mainType?:string,
    type: string | undefined,
    label: string
}

function ModalBathList() {
    const BathCalc = useAppSelector(state => state.CalculatorBath)
    const dispatch = useAppDispatch()
    const MetresData = BathCalc.MetresRoom.floor.amount + BathCalc.MetresRoom.wall.amount
    const deleteOnClickFunc = (data:Data) => {
        for (const [key, value] of Object.entries(BathCalc)) {
            if(value.label === data.label) {
                console.log(key , data.type)
             dispatch(deletePriceFromCalculatorReducer({name:key,type:data.type}))
                }
            if(value.type === data.mainType ){
               if(value[data.type as keyof typeof value]?.type === data.type) {
                   dispatch(deletePriceFromCalculatorReducer({name:data.type,type:data.mainType}))
                }
            }
        }
    }
    const ItemComponent = ({service, priceForPiece, amount, price,type,mainType}: ItemComponentType) => {

        let data = {type,label:service,mainType}
        return <>{price > 0 && <TableRow>
            <TableCell>{service}</TableCell>
            <TableCell>{priceForPiece || ''}</TableCell>
            <TableCell>{amount || ''}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell><IconButton
                aria-label="delete"
                size="small"
                onClick={() => deleteOnClickFunc(data)}>
                        <span className={"ModalDeleteIcon"}><DeleteIcon
                            fontSize="inherit"
                        /></span>
            </IconButton></TableCell>
        </TableRow>
        }</>
    }
    return <>
        <ItemComponent
            service={BathCalc.TileSize.label}
            priceForPiece={BathCalc.TileSize.price}
            amount={MetresData}
            price={MetresData * BathCalc.TileSize.price}
        />
        <ItemComponent
            type={BathCalc.fillSeam.type}
            service={BathCalc.fillSeam.label}
            amount={MetresData}
            price={BathCalc.fillSeam.price}
        />
        <ItemComponent
            service={BathCalc.prime.label}
            priceForPiece={ceramic.ceramicTiles.prime}
            amount={MetresData}
            price={BathCalc.prime.price}
        />
        <ItemComponent
            type={BathCalc.linearMetres.type}
            service={BathCalc.linearMetres.label}
            priceForPiece={BathCalc.TileSize.price / 2}
            amount={BathCalc.linearMetres.amount}
            price={BathCalc.linearMetres.price}
        />
        <ItemComponent
            type={BathCalc.hole.type}
            service={BathCalc.hole.label}
            priceForPiece={BathCalc.hole.priceForPie}
            amount={BathCalc.hole.amount}
            price={BathCalc.hole.price}
        />
        <ItemComponent
            type={BathCalc.angle.type}
            service={BathCalc.angle.label}
            priceForPiece={BathCalc.angle.priceForPie}
            amount={BathCalc.angle.metres}
            price={BathCalc.angle.price}
        />
        <ItemComponent
            type={BathCalc.antiWater.type}
            service={BathCalc.antiWater.label}
            priceForPiece={BathCalc.antiWater.priceForPie}
            amount={BathCalc.antiWater.amount}
            price={BathCalc.antiWater.price}
        />
        <ItemComponent
            type={BathCalc.toilet.type}
            service={BathCalc.toilet.label}
            amount={1}
            price={BathCalc.toilet.price}
        />
        <ItemComponent
            type={BathCalc.bath.type}
            service={BathCalc.bath.label}
            amount={1}
            price={BathCalc.bath.price}
        />
        <ItemComponent
            mainType={"DryWallBath"}
            type={BathCalc.DryWallBath.bathroomScreen.type}
            service={BathCalc.DryWallBath.bathroomScreen.label}
            price={BathCalc.DryWallBath.bathroomScreen.price}
        />
        <ItemComponent
            mainType={"DryWallBath"}
            type={BathCalc.DryWallBath.hatch.type}
            service={BathCalc.DryWallBath.hatch.label}
            amount={1}
            price={BathCalc.DryWallBath.hatch.price}
        />
        <ItemComponent
            mainType={"DryWallBath"}
            type={BathCalc.DryWallBath.spaceUnderBath.type}
            service={BathCalc.DryWallBath.spaceUnderBath.label}
            amount={`${BathCalc.DryWallBath.bathLength}м`}
            price={BathCalc.DryWallBath.spaceUnderBath.price}

        />
        <ItemComponent
            mainType={"DryWallBath"}
            type={BathCalc.DryWallBath.shelf.type}
            service={BathCalc.DryWallBath.shelf.label}
            price={BathCalc.DryWallBath.shelf.price}
        />
        <ItemComponent
            mainType={"DryWallBox"}
            type={BathCalc.DryWallBox.angleCount.type}
            service={BathCalc.DryWallBox.angleCount.label}
            amount={BathCalc.DryWallBox.angleCount.amount}
            price={BathCalc.DryWallBox.angleCount.price}
        />
        <ItemComponent
            mainType={"DryWallBox"}
            type={BathCalc.DryWallBox.twoAngleCount.type}
            service={BathCalc.DryWallBox.twoAngleCount.label}
            amount={BathCalc.DryWallBox.twoAngleCount.amount}
            price={BathCalc.DryWallBox.twoAngleCount.price}
        />
        <ItemComponent
            mainType={"DryWallBox"}
            type={BathCalc.DryWallBox.hatch.type}
            service={BathCalc.DryWallBox.hatch.label}
            price={BathCalc.DryWallBox.hatch.price}
        />
        <ItemComponent
            mainType={"DryWallShower"}
            type={BathCalc.DryWallShower.showerBoard.type}
            service={BathCalc.DryWallShower.showerBoard.label}
            amount={BathCalc.DryWallShower.showerBoard.amount}
            price={BathCalc.DryWallShower.showerBoard.price}
            priceForPiece={BathCalc.DryWallShower.showerBoard.priceForPie}
        />
        <ItemComponent
            type={BathCalc.showerType.type}
            service={BathCalc.showerType.label}
            price={BathCalc.showerType.price}
            amount={1}
        />
        <ItemComponent
            mainType={"DryWallWall"}
            type={"wallLength"}
            service={BathCalc.DryWallWall.wallLength.label}
            amount={`${BathCalc.DryWallWall.wallLength.amount}п/м`}
            price={BathCalc.DryWallWall.wallLength.price}
        />
        <ItemComponent
            mainType={"DryWallWall"}
            type={BathCalc.DryWallWall.doorBoolean.type}
            service={BathCalc.DryWallWall.doorBoolean.label}
            price={BathCalc.DryWallWall.doorBoolean.price}
        />
        <ItemComponent
            mainType={"DryWallWall"}
            type={BathCalc.DryWallWall.soundBoolean.type}
            service={BathCalc.DryWallWall.soundBoolean.label}
            price={BathCalc.DryWallWall.soundBoolean.price}
        />
        <ItemComponent
            mainType={"DryWallWall"}
            type={BathCalc.DryWallWall.socketCount.type}
            service={BathCalc.DryWallWall.socketCount.label}
            amount={`${BathCalc.DryWallWall.socketCount.amount}шт`}
            price={BathCalc.DryWallWall.socketCount.price}
        />
        <ItemComponent
            mainType={"BathRoomSink"}
            type={BathCalc.BathRoomSink.type}
            service={BathCalc.BathRoomSink.label}
            price={BathCalc.BathRoomSink.price}
            amount={1}
        />

    </>
}

export default ModalBathList;