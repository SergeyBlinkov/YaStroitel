import React from 'react';
import './BathRoomSink.css'
import {Button} from "@mui/material";
import {useAppDispatch} from "../../../../../Redux/ReduxConfigStore";
import {bathRoomSink} from "../../../../../Redux/CalculatorBathSlice";
import {toast} from "react-toastify";

function BathRoomSink() {

    const dispatch = useAppDispatch()
    const handleClick = ()=> {
        toast.success('Элемент добавлен в смету')
        dispatch(bathRoomSink())
    }
    return (
        <div className={'BathRoomSink'}>
            <p className={'BathRoomSink_description'}>
                Раковина необходима в каждом санузле , их размер зависит зачастую от помещения,
                а так же от надобности, многие фирмы производят раковины мы лишь можем выделить
                некоторые фирмы которые делают их качественно:

            </p>
            <ul className={'BathRoomSink_li'}>
            <li>Cersanit</li>
            <li>Roca</li>
        </ul>
            <Button
                variant={'contained'}
                color={'success'}
                onClick={handleClick}
            >Установить раковину</Button>
        </div>
    );
}

export default BathRoomSink;