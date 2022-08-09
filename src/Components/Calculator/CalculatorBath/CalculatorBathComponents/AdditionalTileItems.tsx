import React from 'react';
import {Button, ButtonGroup,TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../Redux/ReduxConfigStore";
import {angleChange, angleClick, holeChange, holeClick} from "../../../../Redux/CalculatorBathSlice";
import {ChangeEvent} from "../BathType";


const AdditionalTileItems = () => {
    const dispatch = useAppDispatch()
    const BathCalc = useAppSelector(state=>state.CalculatorBath)

    const angleHandleChange = (e:ChangeEvent) => dispatch(angleChange(+e.target.value))
    const holeHandleChange = (e:ChangeEvent) => dispatch(holeChange(+e.target.value))

    return (
        <div className={'calculator_additionalItem'}>
            <div className={'calculator_additionalItem__angle'}>
                <ButtonGroup disableElevation color={'inherit'} style={{height: 55, margin: '0 10px'}}>
                    <Button
                        disabled={BathCalc.angle.type === 'degree'}
                        onClick={()=>dispatch(angleClick('degree'))}
                    >Угол 45 градусов
                    </Button>
                    <Button
                        disabled={BathCalc.angle.type === 'profile'}
                        onClick={()=>dispatch(angleClick('profile'))}
                    >Профиль
                    </Button>
                </ButtonGroup>
                <TextField
                    helperText={'Внести сюда погонный метр всех внешних углов'}
                    label={'Введите размер в Метрах через точку'}
                    onChange={angleHandleChange}
                />
            </div>
            <div
                className={'calculator_additionalItem__linearMetres'}
            >
                <p>Сюда нужно внести участки стены менее 30см, измерить его высоту и записать в поле:</p>
                <TextField
                    helperText={'Внести сюда погонный метр всех таких мест'}
                    label={'Введите размер в Метрах через точку'}
                />
            </div>
            <div className={'calculator_additionalItem__hole'}>
                <ButtonGroup disableElevation color={'inherit'} style={{height: 55, margin: '0 10px'}}>
                    <Button
                        disabled={BathCalc.hole.type === 'porcelain'}
                        onClick={()=>dispatch(holeClick('porcelain'))}
                    >Керамогранит</Button>
                    <Button
                        disabled={BathCalc.hole.type === 'ceramic'}
                        onClick={()=>dispatch(holeClick('ceramic'))}
                    >Керамическая
                    </Button>
                </ButtonGroup>
                <TextField
                    label={'Количество отверстий в плитке'}
                    onChange={holeHandleChange}
                />
            </div>
        </div>
    );
};

export default AdditionalTileItems;