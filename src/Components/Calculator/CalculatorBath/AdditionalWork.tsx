import React from 'react'
import {Button, ButtonGroup, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import {
    antiWaterPrice,
    bathInstallation,
    showerTrayClick,
    toiletInstallation
} from "../../../Redux/CalculatorBathSlice";
import ceramic from '../../../database/priceWork/FlooringInstalation/ceramic.json'
import plumbing from '../../../database/priceWork/plumbing/plumbing.json'
import {ChangeEvent,ButtonEvent} from "./BathType";



//BATH-INSTALLATION
export const BathInstallation = () => {
    const dispatch = useAppDispatch()
    const BathCalc = useAppSelector(state=>state.CalculatorBath)
    const [checked,setChecked] = useState(Boolean)
    const changeBathInstallation = (e:ChangeEvent) => {
        const check = e.target.checked
        if(!check) {
            dispatch(bathInstallation('nothing'))
        }
        return setChecked(e.target.checked)
    }
    const handleChange = (e:ButtonEvent) => {
        const name = (e.target as any).name
        return dispatch(bathInstallation(name))
    }
    return  <div
        className={'BathInstallation'}

    > <FormControlLabel
        control={<Checkbox
        checked={checked}
        onChange={changeBathInstallation}
    />}
        label={'Установка ванны'}
    />
        {checked && <ButtonGroup>
            <Button
                onClick={handleChange}
                name={'cast-iron'}
                disabled={BathCalc.bath.type === 'cast-iron'}
            >
                Чугунная</Button>
            <Button
                name={'steel'}
                onClick={handleChange}
                disabled={BathCalc.bath.type === 'steel'}
            >
                Акриловая</Button>
            <Button
                name={'acrylic'}
                onClick={handleChange}
                disabled={BathCalc.bath.type === 'acrylic'}
            >
                Стальная</Button>
        </ButtonGroup>}
    </div>
}
//ANTI-WATER
type Checked = {floor:boolean,wall:boolean}
const init:Checked = {floor:false,wall:false}
export const AntiWater = () => {
    const dispatch = useAppDispatch()
    const BathCalc = useAppSelector(state=>state.CalculatorBath)

    const [checked,setChecked] = useState(init)
    const checkedChange = (e:ChangeEvent) => {
        const name = e.target.name
        const check = e.target.checked
        const antiWater = ceramic.ceramicTiles.antiWater
        const floorPrice = BathCalc.metres.floor * antiWater
        const wallPrice = BathCalc.metres.wall * antiWater
        const handleChange = (name:string,price:number) => {
            if(name === 'floor' && !check) setChecked({...checked,
                floor:false,
                wall:false
            })
            else setChecked({...checked,[name]:check})
            return dispatch(antiWaterPrice(price))
        }
        if(name === 'floor') {
            check ?
                handleChange(name,floorPrice):
                handleChange(name,0)
        }
        else {
            check ?
                handleChange(name,wallPrice + floorPrice):
                handleChange(name,floorPrice)
        }
    }
    return <div
        className={'AntiWater'}
    >
        <FormGroup>
            <FormControlLabel
                control={<Checkbox
                    checked={checked.floor}
                    onChange={checkedChange}
                    name={'floor'}
                />}
                label={'Гидроизоляция полов'}
            />
            {checked.floor && <FormControlLabel
                control={<Checkbox
                    checked={checked.wall}
                    name={'wall'}
                    onChange={checkedChange}
                />}
                label={'Гидроизоляция стен'}
            />}
        </FormGroup>
    </div>
}
// Toilet installation

export function ToiletInstallation () {
    const BathCalc = useAppSelector(state=>state.CalculatorBath)
    const dispatch = useAppDispatch()
    const [toiletState, setToiletState] = useState(false)
    const handleChange = (e:ChangeEvent) => {
        const check = e.target.checked
        if (!check) dispatch(toiletInstallation({type: '', price: 0}))
        return setToiletState(check)
    }
    const changeName = (e:ButtonEvent) => {
        const name = (e.target as any).name
        const toilet = plumbing.toilet
        return dispatch(toiletInstallation({
            type:`${name}`,price:toilet[name as keyof typeof toilet]}))
    }
    return <div
            className={'ToiletInstallation'}
            >
        <FormControlLabel
            control={<Checkbox
                onChange={handleChange}
                checked={toiletState}
        />} label={'Установка туалета'}/>
        {toiletState && <ButtonGroup>
            <Button
                name={'toilet'}
                onClick={changeName}
                disabled={BathCalc.toilet.type === 'toilet'}
            >Унитаз</Button>
            <Button
                name={'installation'}
                onClick={changeName}
                disabled={BathCalc.toilet.type === 'installation'}
            >Инсталяция</Button>
        </ButtonGroup>}
    </div>
}
// SHOWER_TRAY

 export function ShowerTray () {
        const [showerTray,setShowerTray] = useState(false)
        const BathCalc = useAppSelector(state=>state.CalculatorBath)
        const dispatch = useAppDispatch()
        const handleChange = (e:ChangeEvent) => {
            const check = e.target.checked
            if(!check) {
                dispatch(showerTrayClick('nothing'))
            }
            return setShowerTray(check)
        }
        const handlePrice = (e:ButtonEvent) => {
            const name = (e.target as any).name
            return dispatch(showerTrayClick(name))
        }
        return <div className="showerTray">
            <FormControlLabel
                control={<Checkbox onChange={handleChange}/>}
                label={'Установка душ поддона'}/>
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