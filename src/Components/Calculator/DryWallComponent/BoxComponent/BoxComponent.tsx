import React, {useState} from 'react';
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {ChangeEvent} from "../../CalculatorBath/BathType";
import CCCNewButton from "../../CalculatorChooseComponent/CCCNewButton";
import {useAppDispatch} from "../../../../Redux/ReduxConfigStore";
import {boxInstallation} from "../../../../Redux/CalculatorBathSlice";
import './BoxComponent.css'
import {toPeriod} from "../../../helperComponent/helperComponent";

function BoxComponent() {
    const [storage,setStorage] = useState({
        hatch:{
            count:0,
            bool:false
        },
        angle:{
            angleCount:0,
            twoAngleCount:0,
            bool:false
    }
    })
    const dispatch = useAppDispatch()
    const handleChangeBool = (e:ChangeEvent) => {
        const name = e.target.name
        const check = e.target.checked
        return setStorage((prevState => ({...prevState,[name]:{
            ...prevState[name as keyof typeof prevState],
                bool:check
            }})))
    }
    const handleChangeText = (e:ChangeEvent) => {
        const {name,value} = e.target
        const newValue = toPeriod(value)
        if(name === 'hatch') setStorage((prevState => ({
            ...prevState,hatch: {
                ...prevState.hatch,
                count:+newValue
            }
        })))
        else {
            setStorage((prevState => ({
                ...prevState,angle: {
                    ...prevState.angle,
                    [name]:+newValue
            }
            })))
        }
    }
    const handleClickDispatch = () => dispatch(boxInstallation(storage))
    return (

        <div
            className={'BoxComponent'}>
            <div className={'BoxComponent_item'}>
                <p>Введите сюда погонные метры ваших труб, которые необходимо будет закрыть</p>
                <TextField label={"В погонных метрах"} name={'angleCount'} onChange={handleChangeText}/>
            </div>
            <div className={'BoxComponent_item'}>
                <FormControlLabel control={<Checkbox
                    checked={storage.angle.bool}
                    name={'angle'}
                    onChange={handleChangeBool}/>} label={'Будут короба с двумя внешними углами?'}/>
                {storage.angle.bool && <div className={'BoxComponent_item__twoAngle'}>
                <p>Введите ниже их размер в погонных метрах(2 внешних угла)</p>
                <TextField label={"В погонных метрах"} name={'twoAngleCount'} onChange={handleChangeText}/>
            </div>}
            </div>
            <div className={'BoxComponent_item'}>
                <FormControlLabel control={<Checkbox checked={storage.hatch.bool} name={'hatch'}
                onChange={handleChangeBool}/>} label={'Необходимо сделать отверстие под люк?'}/>
                {storage.hatch.bool && <TextField label={'Введите количество люков'} name={'hatch'} onChange={handleChangeText}/>}
            </div>
            {(storage.angle.angleCount > 0 || storage.angle.twoAngleCount > 0) && <CCCNewButton label={'Добавить работу в смету'} click={handleClickDispatch} />}
        </div>

    );
}

export default BoxComponent;