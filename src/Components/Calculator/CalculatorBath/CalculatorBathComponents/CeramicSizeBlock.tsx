import React from "react";
import ceramic from "../../../../database/priceWork/FlooringInstalation/ceramic.json";
import {useAppDispatch} from "../../../../Redux/ReduxConfigStore";
import {tileSize} from '../../../../Redux/CalculatorBathSlice'

interface CeramicSizeBlockProps {
        tile: string;
        price: number;
}
export default function CeramicSizeBlock() {
    const dispatch = useAppDispatch()
    const sentSize = (data:CeramicSizeBlockProps) => dispatch(tileSize(data))

    return <div className={'calculator_tileSize'}>
        {ceramic.ceramicTiles.size.map((data:CeramicSizeBlockProps) =>
            <div
                className={'calculator_tileSize__items'}
                key={data.tile}
                onClick={()=> sentSize(data)}
            >
            <p>{data.tile}</p>
        </div>)}
    </div>
}