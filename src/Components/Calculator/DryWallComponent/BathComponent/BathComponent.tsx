import React, {useState} from 'react';
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {ChangeEvent} from "../../CalculatorBath/BathType";
import './BathComponent.css'
import {useAppDispatch} from "../../../../Redux/ReduxConfigStore";
import {inPriceReducer} from "../../../../Redux/calculatorChooseComponentSlice";


function BathComponent({name,type}: {name:string,type:string}) {
    const [boardBath,setBoardBath] = useState(false)
    const dispatch = useAppDispatch()
    const changeCheckbox = (e:ChangeEvent) => {
        const check = e.target.checked
        return setBoardBath(check)
    }
    return (
        <div className={'BathComponent'}>
            <TextField label={'Введите сюда длинну ванны'}/>
            <div>
                <FormControlLabel
                    control={<Checkbox onChange={changeCheckbox}/>}
                    label={'Необходимо установить полку у ванны?'}/>
                {boardBath && <div className={'BathComponent_shelf'}>
                    <p>Введите сюда их количество</p>
                    <TextField />
                </div>
                }
            </div>

            <Button
                variant={'outlined'}
                color={'inherit'}
                onClick={()=>dispatch(inPriceReducer({name,type}))}
                className={"finalButton"}
            >
                Добавить работу в финальную стоимость
            </Button>
        </div>
    );
}

export default BathComponent;