import React, {useRef} from 'react';
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {ChangeEvent} from "../../CalculatorBath/BathType";
import './BathComponent.css'
import './BathComponentCssTransition.css'
import {useAppDispatch} from "../../../../Redux/ReduxConfigStore";
import {inPriceReducer} from "../../../../Redux/calculatorChooseComponentSlice";
import {dryWallBoardBath} from "../../../../Redux/CalculatorBathSlice";


function BathComponent({name,type}: {name:string,type:string}) {
    const nodeRef = useRef(null)
    const dispatch = useAppDispatch()

    const changeCheckbox = (e:ChangeEvent) => dispatch(dryWallBoardBath(e.target.checked))

    return  <div
                className={'BathComponent calculatorChooseComponent_item__openedComponent'}
                ref={nodeRef}
            >
                <div className="BathComponent_bathLength">
                    <p>Длина ванны в погонных метрах:</p>
                    <TextField
                        size={'small'}
                        label={'Введите сюда длинну ванны'}/>
                </div>
                <div className={'BathComponent_shelf'}>
                    <FormControlLabel
                        control={<Checkbox onChange={changeCheckbox}/>}
                        label={'Необходимо установить полку у ванны?'}/>
                </div>
                <div className="BathComponent_hatch">
                    <FormControlLabel
                        control={<Checkbox />}
                        label={'Установка скрытого люка из плитки?'}/>
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
}

export default BathComponent;