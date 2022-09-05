import React from 'react'
import {Button, ButtonGroup} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../../../Redux/ReduxConfigStore";
import {
    showerTrayClick,

} from "../../../../Redux/CalculatorBathSlice";

import {ButtonEvent} from "../BathType";







 function ShowerTray ({showerTray}:{showerTray:boolean}) {
        const BathCalc = useAppSelector(state=>state.CalculatorBath)
        const dispatch = useAppDispatch()

        const handlePrice = (e:ButtonEvent) => {
            const name = (e.target as any).name
            return dispatch(showerTrayClick(name))
        }
        return <div className="showerTray">

            {showerTray && <div className="showerTray-open">
                <ButtonGroup>
                    <Button
                        name={'linear'}
                        disabled={BathCalc.showerTray.type === 'linear'}
                        onChange={handlePrice}
                        onClick={handlePrice}>
                        Прямой</Button>
                    <Button
                        name={'square'}
                        disabled={BathCalc.showerTray.type === 'square'}
                        onChange={handlePrice}
                        onClick={handlePrice}>
                        Квадратный</Button>
                    <Button
                        name={'circle'}
                        disabled={BathCalc.showerTray.type === 'circle'}
                        onChange={handlePrice}
                        onClick={handlePrice}>
                        Полукруглый</Button>
                </ButtonGroup>
            </div>}
        </div>
 }