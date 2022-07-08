import React from 'react';
import './CalculatorBathStyle.css'
import CeramicSizeBlock from "./CeramicSizeBlock";
import CalculatorMetres from "./CalculatorMetres";
import AdditionalTileItems from "./AdditionalTileItems";
import {AntiWater, BathInstallation, ShowerTray, ToiletInstallation} from "./AdditionalWork";
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import {BathCalc} from "./BathType";
import ceramic from "../../../database/priceWork/FlooringInstalation/ceramic.json"
import {calcBathResult} from "../../../Redux/CalculatorBathSlice";
import {Button} from "@mui/material";
import DryWall from "../DryWallComponent/DryWall";

const CalculatorBath = () => {
    const BathCalc:BathCalc = useAppSelector(state=>state.CalculatorBath)
    const dispatch = useAppDispatch()
    console.log(BathCalc)
    const result = () => {
        const {antiWater,angle,hole,linearMetres} = BathCalc
        const toilet = BathCalc.toilet.price
        const bath = BathCalc.bath.price
        const metres = BathCalc.metres.floor + BathCalc.metres.wall
        const showerTray = BathCalc.showerTray.price
        const price = BathCalc.size.price
        const {fillSeam,prime} = ceramic.ceramicTiles
        const tile = (price * +metres) + fillSeam + prime
        const result = tile + hole.price + angle.price + linearMetres + antiWater + toilet
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
            <div className={'calculatorBath-additionalWork'}>
                <BathInstallation />
                <AntiWater />
                <ToiletInstallation />
                <ShowerTray />
                <DryWall />
            </div>

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