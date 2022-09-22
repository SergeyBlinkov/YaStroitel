import React, {useRef} from "react";
import ceramic from "../../../../database/priceWork/FlooringInstalation/ceramic.json";
import {useAppDispatch, useAppSelector} from "../../../../Redux/ReduxConfigStore";
import {makeFillSeam, tileSize} from '../../../../Redux/CalculatorBathSlice'
import pic1Size from './imgStore/10x10pic.jpg';
import pic2Size from './imgStore/20x20pic.jpg';
import pic3Size from './imgStore/40x40pic.jpg';
import pic4Size from './imgStore/100x100pic.jpg';
import pic5Size from './imgStore/60x60pic.jpg';
import pic6Size from './imgStore/80x80pic.jpg';
import pic7Size from './imgStore/120x60pic.jpg';
import pic8Size from './imgStore/littleStonePic.jpg';
import pic9Size from './imgStore/littleTile.jpg';
import {Button, ButtonGroup} from "@mui/material";
import {CSSTransition} from "react-transition-group";
import {H1Style} from "../../../helperComponent/helperComponent";
const init = [
    {
        type:'10x10',
        img: pic1Size
    },
    {
        type:'20x20',
        img: pic2Size
    },
    {
        type:'40x40',
        img : pic3Size
    },
    {
        type:'100x100',
        img :pic4Size
    },
    {
        type:'60x60',
        img: pic5Size
    },
    {
        type:'80x80',
        img: pic6Size
    },
    {
        type:'120x60',
        img: pic7Size
    },
    {
        type: 'littleStone',
        img: pic8Size
    },
    {
        type:'littleTile',
        img: pic9Size
    }
]


interface CeramicSizeBlockProps {
        tile: string;
        price: number;
        label:string,
        img?:string
}
export default function CeramicSizeBlock() {
    const dispatch = useAppDispatch()
    const BathCalc = useAppSelector(state=>state.CalculatorBath)
    const sentSize = (data:CeramicSizeBlockProps) => dispatch(tileSize(data))
    const ceramicSize = ceramic.ceramicTiles.size
    const newArray = ceramicSize.map(data => Object.assign(data,{img:init.filter(data2 => data.tile === data2.type)[0].img}))
    const showElement = Object.values(BathCalc).filter(data => data.price > 0)
    const handleClickFillSeam = (type:string) => dispatch(makeFillSeam(type))
    const showChecker = showElement.length > 0 && BathCalc.TileSize.price !== 0
    const ItemClass = 'calculator_tileSize__items calculator_tileSize__items'
    const ButtonRef = useRef(null)
    return <div className={'calculator_tileSize'} id={'tileSize'}>
        <H1Style>Выберите размер плитки
            </H1Style>
        {newArray.map((data,index) =>{
            const tileCheck = data.tile === BathCalc.TileSize.size
            return (<div
                className={(showChecker && tileCheck) ? `${ItemClass + index} red` : `${ItemClass + index}`}
                key={data.tile}
                onClick={()=> sentSize(data)}
            >
                <div className={'calculator_tileSize__img'}>
                <img src={data.img} alt={`pic${data.tile}`}/>

            </div>
                <CSSTransition
                    in={BathCalc.TileSize.size === data.tile}
                    classNames={'Fast-Transition'}
                    timeout={500}
                    mountOnEnter
                    unmountOnExit
                    nodeRef={ButtonRef}

                >
                    <div className={'calculator_tileSize__fillSeamBlock'} ref={ButtonRef} >
                        <h3 >Какого вида будет затирка?</h3>
                        <ButtonGroup className={'MUIButtonBlock'}>
                            <Button
                                onClick={()=>handleClickFillSeam('grout')}
                                variant={'contained'}
                                color={BathCalc.fillSeam.type === 'grout' ? 'success' : 'primary'}
                            >Цементная</Button>
                            <Button
                                onClick={()=>handleClickFillSeam('epoxy')}
                                variant={'contained'}
                                color={BathCalc.fillSeam.type === 'epoxy' ? 'success' : 'primary'}
                            >Эпоксидная</Button>
                        </ButtonGroup></div>
                </CSSTransition>
            <p className={'calculator_tileSize__label'}>{data.label}</p>
        </div>)})}
    </div>
}