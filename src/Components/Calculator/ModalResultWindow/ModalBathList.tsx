import React from 'react';
import {
    TableCell,
    TableRow
} from "@mui/material";
import {useAppSelector} from "../../../Redux/ReduxConfigStore";
import ceramic from '../../../database/priceWork/FlooringInstalation/ceramic.json'


type ItemComponentType = {
    service: string,
    priceForPiece?: number,
    amount?: number | string,
    price: number
}

function ModalBathList() {
    const BathCalc = useAppSelector(state => state.CalculatorBath)

    const MetresData = BathCalc.MetresRoom.floor.amount + BathCalc.MetresRoom.wall.amount
    const ItemComponent = ({service, priceForPiece, amount, price}: ItemComponentType) => {
        return <>{price > 0 && <TableRow>
            <TableCell>{service}</TableCell>
            <TableCell>{priceForPiece || ''}</TableCell>
            <TableCell>{amount || ''}</TableCell>
            <TableCell>{price}</TableCell>
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
            service={BathCalc.linearMetres.label}
            priceForPiece={BathCalc.TileSize.price / 2}
            amount={BathCalc.linearMetres.amount}
            price={BathCalc.linearMetres.price}
        />
        <ItemComponent
            service={BathCalc.hole.label}
            priceForPiece={BathCalc.hole.priceForPie}
            amount={BathCalc.hole.amount}
            price={BathCalc.hole.price}
        />
        <ItemComponent
            service={BathCalc.angle.label}
            priceForPiece={BathCalc.angle.priceForPie}
            amount={BathCalc.angle.metres}
            price={BathCalc.angle.price}
        />
        <ItemComponent
            service={BathCalc.antiWater.label}
            priceForPiece={BathCalc.antiWater.priceForPie}
            amount={BathCalc.antiWater.amount}
            price={BathCalc.antiWater.price}
        />
        <ItemComponent
            service={BathCalc.toilet.label}
            amount={1}
            price={BathCalc.toilet.price}
        />
        <ItemComponent
            service={BathCalc.bath.label}
            amount={1}
            price={BathCalc.bath.price}
        />
        <ItemComponent
            service={BathCalc.DryWallBath.bathroomScreen.label}
            price={BathCalc.DryWallBath.bathroomScreen.price}
        />
        <ItemComponent
            service={BathCalc.DryWallBath.hatch.label}
            amount={1}
            price={BathCalc.DryWallBath.hatch.price}
        />
        <ItemComponent
            service={BathCalc.DryWallBath.spaceUnderBath.label}
            amount={`${BathCalc.DryWallBath.bathLength}м`}
            price={BathCalc.DryWallBath.spaceUnderBath.price}

        />
        <ItemComponent
            service={BathCalc.DryWallBath.shelf.label}
            price={BathCalc.DryWallBath.shelf.price}
        />
        <ItemComponent
            service={BathCalc.DryWallBox.angleCount.label}
            amount={BathCalc.DryWallBox.angleCount.amount}
            price={BathCalc.DryWallBox.angleCount.price}
        />
        <ItemComponent
            service={BathCalc.DryWallBox.twoAngleCount.label}
            amount={BathCalc.DryWallBox.twoAngleCount.amount}
            price={BathCalc.DryWallBox.twoAngleCount.price}
        />
        <ItemComponent
            service={BathCalc.DryWallBox.hatch.label}
            price={BathCalc.DryWallBox.hatch.price}
        />
        <ItemComponent
            service={BathCalc.DryWallShower.showerBoard.label}
            amount={BathCalc.DryWallShower.showerBoard.amount}
            price={BathCalc.DryWallShower.showerBoard.price}
            priceForPiece={BathCalc.DryWallShower.showerBoard.priceForPie}
        />
        <ItemComponent
            service={BathCalc.showerType.label}
            price={BathCalc.showerType.price}
            amount={1}
        />
        <ItemComponent
            service={BathCalc.DryWallWall.wallLength.label}
            amount={`${BathCalc.DryWallWall.wallLength.amount}п/м`}
            price={BathCalc.DryWallWall.wallLength.price}
        />
        <ItemComponent
            service={BathCalc.DryWallWall.doorBoolean.label}
            price={BathCalc.DryWallWall.doorBoolean.price}
        />
        <ItemComponent
            service={BathCalc.DryWallWall.soundBoolean.label}
            price={BathCalc.DryWallWall.soundBoolean.price}
        />
        <ItemComponent
            service={BathCalc.DryWallWall.socketCount.label}
            amount={`${BathCalc.DryWallWall.socketCount.amount}шт`}
            price={BathCalc.DryWallWall.socketCount.price}
        />
        <ItemComponent
            service={BathCalc.BathRoomSink.label}
            price={BathCalc.BathRoomSink.price}
            amount={1}
        />

    </>
}

export default ModalBathList;