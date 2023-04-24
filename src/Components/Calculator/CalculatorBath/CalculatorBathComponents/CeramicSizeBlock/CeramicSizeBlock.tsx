import React, {FC} from "react";
import ceramic from "../../../../../database/priceWork/FlooringInstalation/ceramic.json";
import './CeramicSizeStyle.css'
import {useAppDispatch, useAppSelector} from "../../../../../Redux/ReduxConfigStore";
import {makeFillSeam, tileSize} from '../../../../../Redux/CalculatorBathSlice'
import pic1Size from '../imgStore/10x10pic.jpg';
import pic2Size from '../imgStore/20x20pic.jpg';
import pic3Size from '../imgStore/40x40pic.jpg';
import pic4Size from '../imgStore/100x100pic.jpg';
import pic5Size from '../imgStore/60x60pic.jpg';
import pic6Size from '../imgStore/80x80pic.jpg';
import pic7Size from '../imgStore/120x60pic.jpg';
import pic8Size from '../imgStore/littleStonePic.jpg';
import pic9Size from '../imgStore/littleTile.jpg';
import {ButtonGroup} from "@mui/material";
import {H1Style} from "../../../../helperComponent/helperComponent";
import CeramicAmountTile from "./CeramicAmountTile/CeramicAmountTile";
import TwoTilesBlock from "./TwoTilesBlock/TwoTilesBlock";
import { CustomButton } from "../../../../../ui_local/materialUi_Theme/mui_local_theme";

const init = [
    {
        type: '10x10',
        img: pic1Size
    },
    {
        type: '20x20',
        img: pic2Size
    },
    {
        type: '40x40',
        img: pic3Size
    },
    {
        type: '100x100',
        img: pic4Size
    },
    {
        type: '60x60',
        img: pic5Size
    },
    {
        type: '80x80',
        img: pic6Size
    },
    {
        type: '120x60',
        img: pic7Size
    },
    {
        type: 'littleStone',
        img: pic8Size
    },
    {
        type: 'littleTile',
        img: pic9Size
    }
]


export type TTileType = {
    oneTile:boolean
    twoTile:boolean
    setMeasure:boolean
}


type TTilesArray = {
    size:string;
    price:number
    label:string
    img:string;

}
const CeramicBlocks = () => {
    const ceramicSize = ceramic.ceramicTiles.size
    const TilesArray:TTilesArray[] = ceramicSize.map(data => Object.assign(data, {img: init.filter(data2 => data.size === data2.type)[0].img}))
    return <section className={'CeramicBlocks'}>
        {TilesArray.map((item,index) => <CeramicItems item={item} index={index} key={index}/>)}
    </section>


}
type TCeramicData = {
    item:TTilesArray
    index:number
}

const CeramicItems:FC<TCeramicData> = ({item,index}) => {
    const BathCalc = useAppSelector(state => state.CalculatorBath)
    const {size,img,label} = item
    const tileCheck = BathCalc.TileSize.tiles.filter((data) => data.singlePrice > 0 && data.size === size)
    const dispatch = useAppDispatch()
    const ItemClass = 'CeramicBlocksItem CeramicBlocksItem'
    return <article
        className={ItemClass + index + ` ${tileCheck.length > 0 && 'CeramicBlocksItemActive'}`}
        key={size}

    >
        <div className={'CeramicBlocksItem__bg'}></div>
        <div className={'CeramicBlocksItem__img'} onClick={() => dispatch(tileSize(item))
        }>
            <img src={img} alt={`pic${size}`}/>
        </div>
        {(tileCheck.length > 0) && <FillSeamBlock item={{...item}} />
            }
        <p className={'CeramicBlocksItem__label'}>{label}</p>
    </article>
}

const FillSeamBlock:FC<Pick<TCeramicData,'item'>> = ({item}) => {
    const BathCalc = useAppSelector(state => state.CalculatorBath)
    const TileItem = BathCalc.TileSize.tiles.filter((tile) => tile.size === item.size)[0]
    const dispatch = useAppDispatch()
    const handleClickFillSeam = (type: 'epoxy' | 'grout') => dispatch(makeFillSeam({item,type}))
    return <div className={'CeramicBlocksItem_fillSeamBlock'}>
        <h3>Какого вида будет затирка?</h3>
        <ButtonGroup className={'CeramicBlocksItem_fillSeamBlock__buttonBlock'}>
            <CustomButton
                onClick={() => handleClickFillSeam('grout')}
                variant={'contained'}
                color={TileItem.fillSeam.type === 'grout' ? 'success' : 'primary'}
            >Цементная</CustomButton>
            <CustomButton
                onClick={() => handleClickFillSeam('epoxy')}
                variant={'contained'}
                color={TileItem.fillSeam.type === 'epoxy' ? 'success' : 'primary'}
            >Эпоксидная</CustomButton>
        </ButtonGroup></div>
}

export default function CeramicSizeBlock() {
    return <div className={'CeramicSizeBlock'} id={'tileSize'}>
        <H1Style>Выберите размер плитки</H1Style>
        <CeramicAmountTile />
        <TwoTilesBlock />
        <H1Style className={'CeramicSizeBlock__h2'}>Ниже размеры плитки</H1Style>
        <CeramicBlocks />
    </div>

}