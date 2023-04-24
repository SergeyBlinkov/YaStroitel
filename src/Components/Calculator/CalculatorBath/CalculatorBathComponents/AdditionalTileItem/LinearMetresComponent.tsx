import React, {useState} from 'react';
import './style.css';
import {TextField} from "@mui/material";
import {Tiles} from "../../BathType";
import {useAppDispatch, useAppSelector} from "../../../../../Redux/ReduxConfigStore";
import {toPeriod} from "../../../../helperComponent/helperComponent";
import CCCNewButton from "../../../CalculatorChooseComponent/CCCNewButton";
import {additionalItemLinearMetres} from "../../../../../Redux/CalculatorBathSlice";
import linearMetres1 from './imgStore/linearMetres1.jpg';
import linearMetres2 from './imgStore/linearMetres2.jpg';
import AlertMessageHc from "../../../../helperComponent/AlertMessageHC";
import CCCMoreInfo from "../../../CalculatorChooseComponent/CCC_moreInfo";

const describeLinear = 'Сюда нужно внести участки стены менее 30см, измерить его высоту и записать в поле:'

type THandleChange = {
    e:any,
    tile: Tiles
}

const linearMetresStore = [linearMetres1,linearMetres2]
function LinearMetresComponent() {
    const BathCalc = useAppSelector(state=>state.CalculatorBath)
    const [amount,setAmount] = useState<Tiles[]>([])
    const [err,setErr] = useState({isShow:false,message:''})
    const dispatch = useAppDispatch()
    const handleChange = ({e,tile}:THandleChange) => {
        const newAmount = toPeriod(e.target.value)
        if(amount.length > BathCalc.TileSize.tiles.length) {
            const delArray = BathCalc.TileSize.tiles.map((tile) =>
                amount.filter((filt) => filt.size === tile.size)[0])
            setAmount(delArray)
        }
        if(amount.length === 0 || amount.filter((item) => item.size === tile.size).length === 0) {
            setAmount((prev) => ([...prev,({...tile,amount:newAmount})]))
        }
        else {
            setAmount((prev) => prev.map((prevItem) =>
            prevItem.size === tile.size ? ({...prevItem,amount:newAmount}) : prevItem))
        }
    }
    const handleClickDispatch = () => {
        if(amount.length > BathCalc.TileSize.tiles.length) {
            const delArray = BathCalc.TileSize.tiles.map((tile) =>
                amount.filter((filt) => filt.size === tile.size)[0])
            setAmount(()=> delArray)
            setErr(prev=> ({...prev,isShow: false,message: ''}))
            dispatch(additionalItemLinearMetres(delArray))
        }
        if(amount.every((item) => item.amount === 0)) setErr(prev=> ({...prev,isShow: true,message: 'Введите размер в погонных метрах'}))
        else {
            setErr(prev=> ({...prev,isShow: false,message: ''}))
            dispatch(additionalItemLinearMetres(amount))
        }
    }
    return (<div className={'AdditionalItemLinearMetres'}>
            <section className={'AdditionalItemLinearMetres_label'}>
            <h2 className={'AdditionalItemLinearMetres__h2'}>
                Откосы
            </h2>
            <CCCMoreInfo name={'Запил под 45'} description={describeLinear} img={linearMetresStore}/>
            </section>
            <div className={'AdditionalItemLinearMetres_textFieldGroup'}>
                {BathCalc.TileSize.tiles[0].singlePrice > 0 ? BathCalc.TileSize.tiles.map((tile) => (
                    <section key={tile.size} className={'textFieldGroup_item'}>
                        <span>{tile.label}</span>
                        <TextField
                            name={tile.size}
                            onChange={(e) => handleChange({e,tile})}
                            label={'Введите размер в Метрах через точку'}
                            onKeyUp={(e) => e.key === 'Enter' && handleClickDispatch()}
                        />
                    </section>
                )) : <span>Вы должны выбрать хотя бы одну плитку</span>}
            </div>
            <AlertMessageHc inBool={err.isShow} label={err.message}/>
            <CCCNewButton label={'Добавить работу в смету'} click={handleClickDispatch} />
        </div>

    );
}

export default LinearMetresComponent;