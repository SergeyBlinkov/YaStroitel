import React from 'react';
import './CalculatorBathStyle.css'
import CeramicSizeBlock from "./CalculatorBathComponents/CeramicSizeBlock";
import CalculatorMetres from "./CalculatorBathComponents/CalculatorMetres";
import AdditionalTileItems from "./CalculatorBathComponents/AdditionalTileItems";
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import {BathCalcType} from "./BathType";
import ceramic from "../../../database/priceWork/FlooringInstalation/ceramic.json"
import {calcBathResult} from "../../../Redux/CalculatorBathSlice";
import {Button} from "@mui/material";
import СCCBathStorage from "./DataForCCCBath/СССBathStorage";

const CalculatorBath = () => {
    const BathCalc:BathCalcType = useAppSelector(state=>state.CalculatorBath)
    const dispatch = useAppDispatch()
    console.log(BathCalc)
    const result = () => {
        const {antiWater,angle,hole,linearMetres} = BathCalc
        const toilet = BathCalc.toilet.price
        const bath = BathCalc.bath.price
        const metres = BathCalc.MetresRoom.floor.amount + BathCalc.MetresRoom.wall.amount
        const showerTray = BathCalc.showerTray.price
        const price = BathCalc.TileSize.price
        const {fillSeam,prime} = ceramic.ceramicTiles
        const tile = (price * +metres) + fillSeam + prime
        const result = tile + hole.price + angle.price + linearMetres.price + antiWater.price + toilet
        + bath + showerTray
        return (price === 0 || +metres === 0) ?
            dispatch(calcBathResult(0)) :
            dispatch(calcBathResult(result))
    }

    return (
        <div
            className={'calculatorBath'}
        >
            <CeramicSizeBlock />
            <CalculatorMetres />
            <h2>Далее дополнительные работы</h2>
            <AdditionalTileItems />
            <СCCBathStorage />
            <div className={'BathCalc-result'}>
                <Button onClick={result}>
                    Стоимость ремонта в вашей ванной
                </Button>
                <p>{BathCalc.finalResult === 0 ?
                    'Скорее всего вы ничего не выбрали':
                    BathCalc.finalResult}
                </p>
            </div>
        </div>
    );
};

export default CalculatorBath;