import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../Redux/ReduxConfigStore";
import {fillMetres} from "../../../../Redux/CalculatorBathSlice";
import {toPeriod} from "../../../helperComponent/helperComponent";

const init = {x:'',y:'',z:2.5}
type InputEvent = React.ChangeEvent<HTMLInputElement>;
const CalculatorMetres = () => {
    const dispatch = useAppDispatch()
    const BathCalc = useAppSelector(state=>state.CalculatorBath)
    const [roomSize, setRoomSize] = useState(init)

    const generalMetres = BathCalc.metres.floor + BathCalc.metres.wall
    const handleChangeMetres = (e: InputEvent) => {
        const m = e.target.value
        const floor = toPeriod(m)
        const wall = ((Math.sqrt(floor) * roomSize.z) * 4) - 1.6
        return dispatch(fillMetres({floor:+floor,wall}))
    }
    const handleSideMetres = (e:InputEvent) : void => {
        const {name,value} = e.target
        return setRoomSize({...roomSize,[name] : toPeriod(value)})
    }

    const calculateRoomMetres = () => {
        const floor = +roomSize.x * +roomSize.y
        const wall = ((+roomSize.x * +roomSize.z) * 2) + ((+roomSize.y * +roomSize.z) * 2) - 1.6
        return dispatch(fillMetres({floor,wall}))
    }

    return (
        <div
            className={'calculatorBathMetres'}
        >
            <h2>Квадратные метры вашей комнаты</h2>
            <TextField type={'text'} name={'metres'}
                       helperText={'Ваша комната в квадратных метрах'}
                       onChange={handleChangeMetres}
                       style={{width: '320px'}}
            />
            <div className={'calculator_roomSize'}>
                <TextField
                    helperText={'Введите размер в Метрах'}
                    name={'x'}
                    onChange={handleSideMetres}
                    label={'Первая сторона'}
                />
                <TextField
                    helperText={'Введите размер в Метрах'}
                    name={'y'}
                    label={'Вторая сторона'}
                    onChange={handleSideMetres}
                />
                <TextField
                    helperText={'Введите размер в Метрах * Не обязательно'}
                    name={'z'}
                    label={'Высота Потолков *Стандартно 2.5'}
                    onChange={handleSideMetres}
                />
                <div
                    className={'calculator_roomSize__metres'}
                >
                    <Button
                    color={'inherit'}
                    variant={'outlined'}
                    onClick={() => calculateRoomMetres()}
                >Узнать Результат</Button>
                {BathCalc.metres.floor > 0 && <p
                    className={'calculator_roomSize__generalMetres'}
                >
                    Ваш общий метраж в помещении: <span>{generalMetres}</span>
                </p>}
                </div>
            </div>
        </div>
    );
};

export default CalculatorMetres;