import React, {useRef, useState} from 'react';
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../Redux/ReduxConfigStore";
import {fillMetres} from "../../../../Redux/CalculatorBathSlice";
import {H2Style, toPeriod} from "../../../helperComponent/helperComponent";
import MainPic1 from './imgStore/mainpic1.jpg'
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {CustomButton, CustomTextField} from '../../../../ui_local/materialUi_Theme/mui_local_theme';




const init = {x: '', y: '', z: 2.5}
type InputEvent = React.ChangeEvent<HTMLInputElement>;
const CalculatorMetres = () => {
    const dispatch = useAppDispatch()
    const BathCalc = useAppSelector(state => state.CalculatorBath)
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

                <H2Style>Введите ниже квадратные метры вашей ванны</H2Style>
                    <CustomTextField
                        type={'text'} name={'metres'}
                        placeholder={'Квадратные метры вашей комнаты'}
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
                    <div ref={nodeRef} className={showSize ? 'calculator_roomSize' : 'calculator_roomSize_chooseSize'}>
                        {showSize ?
                            <>
                                <div className={'calculator_roomSize_group'}>
                                    <div className={'calculator_roomSize_item'}>
                                        <p className={'calculator_roomSize_item__p'}>Ширина</p>
                                        <CustomTextField
                                            name={'x'}
                                            onChange={handleSideMetres}
                                            placeholder={'Первая сторона'}
                                        />
                                    </div>
                                    <div className={'calculator_roomSize_item'}>
                                        <p className={'calculator_roomSize_item__p'}>Длина</p>
                                        <CustomTextField
                                            name={'y'}
                                            placeholder={'Вторая сторона'}
                                            onChange={handleSideMetres}
                                        />
                                    </div>
                                    <div className={'calculator_roomSize_item'}>
                                        <p className={'calculator_roomSize_item__p'}>Высота</p>
                                        <CustomTextField
                                            name={'z'}
                                            placeholder={'Высота Потолков *Стандартно 2.5'}
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


                            </> :
                            <>
                                <p>Мы поможем вам расчитать размер</p>
                                <CustomButton onClick={handleChangeBool} variant={'contained'}>
                                    Не знаете размер?
                                </CustomButton>
                            </>}
                    </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>


        </div>
    );
};

export default CalculatorMetres;