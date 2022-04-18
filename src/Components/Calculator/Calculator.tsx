import React, {useMemo, useState} from 'react';
import './CalculatorStyle.css'
import ceramic from '../../database/priceWork/FlooringInstalation/ceramic.json'
import {Button, ButtonGroup, TextField} from "@mui/material";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface CeramicSizeBlockProps {
    data: {
        tile: string;
        price: number;
    }
}

const Calculator = () => {
    const init = {
        size: {
            tile: "",
            price: Number()
        },
        metres: Number(),
        linearMetres: Number(),
        hole: Number(),
        angle: Number()
    }

    const [calculatorState, setCalculatorState] = useState(init)
    const [roomSize, setRoomSize] = useState({x: Number(), y: Number(), z: 2.5})
    const [additionalItems, setAdditionalItems] = useState({
        angle: {
            cost: Number(),
            count: Number()
        },
        hole: {
            type: 'porcelain',
            count: Number(),
            cost: 200
        }
    })
    console.log(calculatorState)
    const CalculatorResult = useMemo(() => {
        const m = calculatorState.metres
        return ((calculatorState.size.price + ceramic.ceramicTiles.fillSeam + ceramic.ceramicTiles.prime) * m) + calculatorState.angle

    }, [calculatorState])
    const CeramicSizeBlock = ({data}: CeramicSizeBlockProps) => {
        return <div className={'calculator_tileSize__items'} onClick={() => {
            setCalculatorState({...calculatorState, size: data})
        }
        }>
            <p>{data.tile}</p>
        </div>
    }
    const handleChangeMetres = (e: InputEvent): void => {
        return setCalculatorState({...calculatorState, metres: Math.floor(Number(e.target.value))})
    }
    const handleChangeRoomSize = (e: InputEvent): void => {
        const {name, value} = e.target
        return setRoomSize({...roomSize, [name]: value})
    }
    useMemo(()=>{
        return setCalculatorState({...calculatorState,
        angle: additionalItems.angle.cost * (additionalItems.angle.count)})
    },[additionalItems.angle])
    useMemo(()=> {
        return setCalculatorState({...calculatorState,
        hole: additionalItems.hole.cost * additionalItems.hole.count})
    },[additionalItems.hole])
    const handleChangeAngle = (e:InputEvent):void => setAdditionalItems({...additionalItems,
    angle:{
        ...additionalItems.angle,
        count: +e.target.value
    }})

    const calculateRoomSize = () => {
        const result = ((roomSize.x * roomSize.z) * 2) + (((roomSize.y * roomSize.z) * 2) - 1.6)
        return setCalculatorState({...calculatorState, metres: result})
    }
    const setAngle = (price: number) => setAdditionalItems({...additionalItems,
    angle: {
        ...additionalItems.angle,
        cost: price
    }})
    const setTypeHole = (type: string) => setAdditionalItems({...additionalItems,
    hole:{
        ...additionalItems.hole,
        type: type,
        cost: ceramic.ceramicTiles.hole[type as keyof typeof ceramic.ceramicTiles.hole]
    }})
    return (
        <div className={'calculator'}>
            <div className={'calculator_tileSize'}>
                {ceramic.ceramicTiles.size.map((data, index) => {
                    return <CeramicSizeBlock data={data} key={index}/>
                })}
            </div>
            <h2>Квадратные метры вашей комнаты</h2>
            <TextField type={'text'} name={'metres'} value={calculatorState.metres ? calculatorState.metres : ''}
                       onChange={handleChangeMetres} helperText={'Ваша комната в квадратных метрах'}
                       label={'Введите сюда в формате целого числа'}
                       style={{width: '320px'}}/>
            <div className={'calculator_roomSize'}>
                <TextField helperText={'Введите размер в Метрах через точку'} onChange={handleChangeRoomSize} name={'x'}
                           label={'Первая сторона'}/>
                <TextField helperText={'Введите размер в Метрах через точку'} onChange={handleChangeRoomSize} name={'y'}
                           label={'Вторая сторона'}/>
                <TextField helperText={'Введите размер в Метрах через точку * Не обязательно'} onChange={handleChangeRoomSize}
                           name={'z'} label={'Высота Потолков *Стандартно 2.5'}/>
                <Button color={'inherit'} variant={'outlined'} onClick={calculateRoomSize}>Узнать Результат</Button>
            </div>
            <h2>Далее дополнительные работы</h2>
            <div className={'calculator_additionalItem'}>
                <div className={'calculator_additionalItem__angle'}>
                    <ButtonGroup disableElevation color={'inherit'} style={{height: 55, margin: '0 10px'}}>
                        <Button disabled={additionalItems.angle.cost === ceramic.ceramicTiles.angle.degree}
                                onClick={() => setAngle(ceramic.ceramicTiles.angle.degree)}>Угол 45 градусов</Button>
                        <Button disabled={additionalItems.angle.cost === ceramic.ceramicTiles.angle.profile}
                                onClick={() => setAngle(ceramic.ceramicTiles.angle.profile)}>Профиль</Button>
                    </ButtonGroup>
                    <TextField onChange={handleChangeAngle}
                               helperText={'Внести сюда погонный метр всех внешних углов с каждой стороны'}
                               label={'Введите размер в Метрах через точку'}/></div>

                <div className={'calculator_additionalItem__linearMetres'}>
                    <p>Сюда нужно внести участки стены менее 30см, измерить его высоту и записать в поле:</p>
                    <TextField onChange={handleChangeAngle}
                               helperText={'Внести сюда погонный метр всех таких мест'}
                               label={'Введите размер в Метрах через точку'}/>
                </div>
                <div className={'calculator_additionalItem__hole'}>
                    <ButtonGroup disableElevation color={'inherit'} style={{height: 55, margin: '0 10px'}}>
                        <Button disabled={additionalItems.hole.type === 'porcelain'} onClick={()=>setTypeHole('porcelain')}>Керамогранит</Button>
                        <Button disabled={additionalItems.hole.type === 'ceramic'} onClick={()=>setTypeHole('ceramic')}>Керамическая</Button>
                    </ButtonGroup>
                    <TextField label={'Количество отверстий в плитке'} onChange={(e:InputEvent)=>setAdditionalItems({...additionalItems,hole:{
                        ...additionalItems.hole,
                            count: +e.target.value
                        }})}/>
                </div>

            </div>
            <div className={'calculator_result'}>
                {calculatorState.size.tile && CalculatorResult}
            </div>
        </div>
    );
};

export default Calculator;