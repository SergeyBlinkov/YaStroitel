import React, {useState} from 'react';
import './CalculatorBathStyle.css'
import CeramicSizeBlock from "./CeramicSizeBlock";
import CalculatorMetres from "./CalculatorMetres";
import AdditionalTileItems from "./AdditionalTileItems";
import {AntiWater, BathInstallation, ShowerTray, ToiletInstallation} from "./AdditionalWork";
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import {BathCalc, ChangeEvent} from "./BathType";
import ceramic from "../../../database/priceWork/FlooringInstalation/ceramic.json"
import {
    bathInstallation,
    calcBathResult,
    showerTrayClick,
    toiletInstallation
} from "../../../Redux/CalculatorBathSlice";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
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
    //handlers state
    const [showerTray,setShowerTray] = useState<boolean>(false)
    const [toiletState, setToiletState] = useState<boolean>(false)
    const [bathType,setBathType] = useState<boolean>(false)
    const [dryWall,setDryWall] = useState<boolean>(false)
    //end handlers state
    //handlers
    const changeBathInstallation = (e:ChangeEvent) => {
        const check = e.target.checked
        if(!check) {
            dispatch(bathInstallation('nothing'))
        }
        return setBathType(e.target.checked)
    }
    const handleChangeShowerTray = (e:ChangeEvent) => {
        const check = e.target.checked
        if(!check) {
            dispatch(showerTrayClick('nothing'))
        }
        return setShowerTray(check)
    }
    const handleChangeToilet = (e:ChangeEvent) => {
        const check = e.target.checked
        if (!check) dispatch(toiletInstallation({type: '', price: 0}))
        return setToiletState(check)
    }
    const handleChangeDryWall = (e:ChangeEvent) => {
        const check = e.target.checked
        if(!check) {

        }
        return setDryWall(check)
    }
    // end handlers
    return (
        <div
            className={'calculatorBath'}
        >
            <CeramicSizeBlock />
            <CalculatorMetres />
            <h2>Далее дополнительные работы</h2>
            <AdditionalTileItems />
            <div className={'calculatorBath-additionalWork'}>
                <FormControlLabel
                    control={<Checkbox
                        checked={bathType}
                        onChange={changeBathInstallation}
                    />}
                    label={'Установка ванны'}
                />
                <AntiWater />
                <FormControlLabel
                    control={<Checkbox
                        onChange={handleChangeToilet}
                        checked={toiletState}
                    />} label={'Установка туалета'}/>
                <FormControlLabel
                    control={<Checkbox onChange={handleChangeShowerTray}/>}
                    label={'Установка душ поддона'}/>
                <FormControlLabel
                    control={<Checkbox onChange={handleChangeDryWall} />}
                    label={'Установка коробов из гипсокартона'}/>
            </div>
            <div className={'calculatorBath-additionalWork_opened'}>
                <ShowerTray showerTray={showerTray} />
                <ToiletInstallation toiletState={toiletState} />
                <BathInstallation bathType={bathType}/>
                <DryWall dryWall={dryWall} />
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