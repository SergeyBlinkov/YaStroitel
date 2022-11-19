import React, {useRef, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../Redux/ReduxConfigStore";
import {fillMetres} from "../../../../Redux/CalculatorBathSlice";
import {toPeriod} from "../../../helperComponent/helperComponent";
import MainPic1 from './imgStore/mainpic1.jpg'
import {CSSTransition, SwitchTransition} from "react-transition-group";




const init = {x: '', y: '', z: 2.5}
type InputEvent = React.ChangeEvent<HTMLInputElement>;
const CalculatorMetres = () => {
    const dispatch = useAppDispatch()
    const BathCalc = useAppSelector(state => state.CalculatorBath)
    const ShowElement = Object.values(BathCalc).filter(data => data.price > 0)
    const [roomSize, setRoomSize] = useState(init)
    const [showSize, setShowSize] = useState(false)
    const roomSizeRef = useRef(null)
    const helpSizeRef = useRef(null)
    const nodeRef = showSize ? roomSizeRef : helpSizeRef
    const generalMetres = BathCalc.MetresRoom.floor.amount + BathCalc.MetresRoom.wall.amount
    const handleChangeMetres = (e: InputEvent) => {
        const m = e.target.value
        const floor = toPeriod(m)
        const oneWall = Math.sqrt(floor)
        const wall = ((oneWall * roomSize.z) * 4) - 1.6
        return dispatch(fillMetres({floor: +floor, wall}))
    }
    const handleChangeBool = () => setShowSize(!showSize)
    const handleSideMetres = (e: InputEvent): void => {
        const {name, value} = e.target
        return setRoomSize({...roomSize, [name]: toPeriod(value)})
    }

    const calculateRoomMetres = () => {
        const floor = +roomSize.x * +roomSize.y
        const wall = ((+roomSize.x * +roomSize.z) * 2) + ((+roomSize.y * +roomSize.z) * 2) - 1.6
        return dispatch(fillMetres({floor, wall}))
    }

    return (
        <div className={'calculatorBathMetres'}>
            <img src={MainPic1} alt={'mainPic1'}/>
            <div className={'calculatorBathMetres-mainPic'}>

                <h2>Введите ниже квадратные метры вашей ванны</h2>
                    <TextField
                        type={'text'} name={'metres'}
                        error={ShowElement.length > 0 && BathCalc.MetresRoom.floor.amount === 0}
                        label={'Квадратные метры вашей комнаты'}
                        helperText={(ShowElement.length > 0 && BathCalc.MetresRoom.floor.amount === 0) && 'Введите сюда значение'}
                        onChange={handleChangeMetres}
                        className={'calculatorBathMetres-mainPic_inputField'}
                    />
                <div className={'calculator-metres'}>
                    {BathCalc.MetresRoom.floor.amount > 0 && <p
                        className={'calculator-generalMetres'}
                    >
                        Ваш общий метраж в помещении(Стены + Полы): <span>{generalMetres} кв/м</span>
                    </p>}
                </div>
                <SwitchTransition mode={'out-in'}>
                    <CSSTransition
                    key={showSize ? "roomSizeRef" : "helpSizeRef"}
                    timeout={500}
                    nodeRef={nodeRef}
                    classNames={'MoveToRight'}
                    >
                    <div ref={nodeRef}>
                        {showSize ?
                            <div className={'calculator_roomSize'}>
                                <div className={'calculator_roomSize_group'}>
                                    <div className={'calculator_roomSize_item'}>
                                        <p className={'calculator_roomSize_item__p'}>Ширина</p>
                                        <TextField
                                            helperText={'Введите размер в Метрах'}
                                            name={'x'}
                                            onChange={handleSideMetres}
                                            label={'Первая сторона'}
                                        />
                                    </div>
                                    <div className={'calculator_roomSize_item'}>
                                        <p className={'calculator_roomSize_item__p'}>Длина</p>
                                        <TextField
                                            helperText={'Введите размер в Метрах'}
                                            name={'y'}
                                            label={'Вторая сторона'}
                                            onChange={handleSideMetres}
                                        />
                                    </div>
                                    <div className={'calculator_roomSize_item'}>
                                        <p className={'calculator_roomSize_item__p'}>Высота</p>
                                        <TextField
                                            helperText={'Введите размер в Метрах * Не обязательно'}
                                            name={'z'}
                                            label={'Высота Потолков *Стандартно 2.5'}
                                            onChange={handleSideMetres}
                                        />
                                    </div>
                                </div>
                                <div className="calculator_roomSize_group__buttonResult">
                                    <Button
                                        className={'calculator_roomSize__button'}
                                        color={'inherit'}
                                        variant={'outlined'}
                                        onClick={() => calculateRoomMetres()}
                                    >Узнать Результат</Button>
                                </div>


                            </div> :
                            <div className={'calculator_roomSize_chooseSize'}>
                                <p>Мы поможем вам расчитать размер</p>
                                <Button onClick={handleChangeBool} variant={'contained'} color={'success'}>
                                    Не знаете размер?
                                </Button>
                            </div>}
                    </div>
                    </CSSTransition>
                </SwitchTransition>

            </div>


        </div>
    );
};

export default CalculatorMetres;