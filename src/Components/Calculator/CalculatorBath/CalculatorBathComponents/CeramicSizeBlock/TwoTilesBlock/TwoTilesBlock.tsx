import React, {ChangeEvent, FC} from 'react';
import './TwoTilesBlock.css'
import {useAppDispatch, useAppSelector} from "../../../../../../Redux/ReduxConfigStore";
import {deletePriceFromCalculatorReducer, tileAmount} from "../../../../../../Redux/CalculatorBathSlice";
import {ButtonBase} from "@mui/material";
import RecommendationBlock from "../../../../../helperComponent/RecommendationBlock/RecommendationBlock";
import {CustomTextField} from "../../../../../../ui_local/materialUi_Theme/mui_local_theme";
type TTiles = {
    label: string, size: string, price: number, amount: number
}

type TTwoTilesItem = {
    tile:TTiles
    index:number
}


const TwoTilesItem:FC<TTwoTilesItem> = ({tile,index}) => {
    const dispatch = useAppDispatch()
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        const obj = {size:tile.size,amount:value}
        return dispatch(tileAmount(obj))
    }
    const handleDelete = () => dispatch(deletePriceFromCalculatorReducer({name:'TileSize',mainType:tile.size}))
    return <div className={'TwoTilesItem'} key={index}>
        <p>{tile.label}</p>
        <CustomTextField placeholder={'кв/м'} onChange={handleChange}/>
        <ButtonBase onClick={handleDelete}><i className="fa-solid fa-circle-xmark"></i>
        </ButtonBase>
        </div>
}

const TwoTilesBlock= () => {
    const BathCalc = useAppSelector(state => state.CalculatorBath)
    const tileLen = BathCalc.TileSize.tiles.length
    const tilePrice = BathCalc.TileSize.tiles[0].singlePrice
    const activeOneTile = BathCalc.TileSize.oneTile === 'oneTile'
    const activeMeasure = BathCalc.TileSize.oneTile === 'setMeasure'
    const activeTwoTile = BathCalc.TileSize.oneTile === 'twoTile'
    const recommendationMark = BathCalc.MetresRoom.floor.amount === 0 && !activeOneTile && !activeMeasure
    let TileAmount:number = 0
    const totalMetres = (BathCalc.MetresRoom.floor.amount + BathCalc.MetresRoom.wall.amount)
    for(let i= 0;i < BathCalc.TileSize.tiles.length;i++) {
        TileAmount += +BathCalc.TileSize.tiles[i].amount
    }
    const metresLeft:number | string = (totalMetres - TileAmount) < 0 ? 'Вы ввели больше метров чем у вас в помещении': (totalMetres - TileAmount).toFixed(1)
    return <section className={`TwoTilesBlock`}>
        <section className={`TwoTilesBlock_hiddenBlock ${(activeTwoTile || activeMeasure) && 'TwoTilesBlockActive'}`}>
            <article className={`TwoTilesBlock_Items `}>
                {(tileLen === 0 || tilePrice === 0) && (activeTwoTile || activeMeasure) &&
                    <p className={'TwoTilesBlock_Items__filler'}>Вы должны выбрать плитки ниже, чтобы увидеть их здесь</p>}
                {tilePrice > 0 && BathCalc.TileSize.tiles.map((tile, index) =>
                    <TwoTilesItem tile={tile} index={index} key={tile.size}/>)}
            </article>
            {(BathCalc.MetresRoom.floor.amount > 0 && activeTwoTile) &&
                <dfn className={"TwoTilesBlock_rest"}>
                    Осталось всего квадратных метров:   <span className={'TwoTilesBlock_rest__amount'}>{metresLeft}</span>
                </dfn>}
        </section>
        <RecommendationBlock isShow={recommendationMark}>
            Если вписать квадратные метры выше, вы будете знать сколько метров осталось
        </RecommendationBlock>
    </section>
}
export default TwoTilesBlock;