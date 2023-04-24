import React, {FC} from 'react';
import pic1Size from '../../imgStore/10x10pic.jpg';
import pic8Size from '../../imgStore/goodBath1.jpg';
import MainPic1 from '../../imgStore/mainpic1.jpg'
import './CeramicAmountTile.css'
import {TTileType} from "../CeramicSizeBlock";
import {useAppDispatch, useAppSelector} from "../../../../../../Redux/ReduxConfigStore";
import {setNumberTile} from "../../../../../../Redux/CalculatorBathSlice";
type TCeramicItem = {
    name:keyof TTileType
    img: string;
    label: string;
    description: string;
}
type TCeramicAmount = {
    item : TCeramicItem,
}
type TInit = {
    oneTile:TCeramicItem,
    twoTile:TCeramicItem,
    setMeasure:TCeramicItem
}
const init:TInit = {
    oneTile:{
        name: 'oneTile',
        img:pic1Size,
        label:'Будет один вид плитки',
        description: 'И полы и стены будут выполненны из одного вида плитки'
    },
    twoTile:{
        name: 'twoTile',
        img:pic8Size,
        label:'Будет два вида плитки или более',
        description: 'Стены из одного вида плитки, полы из другого'
    },
    setMeasure:{
        name: 'setMeasure',
        img:MainPic1,
        label:'Необходимо расчитать собственный размер',
        description: 'Впишите свои размеры, которые нужно будет выполнить из плитки'
    }
}

const CeramicAmountItem:FC<TCeramicAmount> = ({item}) => {
    const BathCalc = useAppSelector(state =>state.CalculatorBath)
    const dispatch = useAppDispatch()
    const {name,img, label,description} = item
    let active = name === BathCalc.TileSize.oneTile
    const handleClick = () => dispatch(setNumberTile(name))
    return <article className={`CeramicAmountItem`} onClick={handleClick}>
        <div className={'CeramicAmountItem__background'}></div>
        <img src={img} alt={label}/>
        <label className={'CeramicAmountItem__label'}>{label}</label>
        <p className={'CeramicAmountItem__description'}>{description}</p>
        {active && <i className="fa-solid fa-check active"></i>}
    </article>
}

const CeramicAmountTile = () => {
    return (
        <article className={'CeramicAmountTile'}>
            <CeramicAmountItem item={init.oneTile}/>
            <CeramicAmountItem item={init.twoTile}/>
            <CeramicAmountItem item={init.setMeasure}/>
        </article>
    );
};

export default CeramicAmountTile;
