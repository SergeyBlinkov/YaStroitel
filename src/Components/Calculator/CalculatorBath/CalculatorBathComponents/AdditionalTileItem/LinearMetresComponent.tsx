import React, {useState} from 'react';
import './style.css';
import {TextField} from "@mui/material";
import {ChangeEvent} from "../../BathType";
import {useAppDispatch} from "../../../../../Redux/ReduxConfigStore";
import {toPeriod} from "../../../../helperComponent/helperComponent";
import CCCNewButton from "../../../CalculatorChooseComponent/CCCNewButton";
import {additionalItemLinearMetres} from "../../../../../Redux/CalculatorBathSlice";
import linearMetres1 from './imgStore/linearMetres1.jpg';
import linearMetres2 from './imgStore/linearMetres2.jpg';

const linearMetresStore = [linearMetres1,linearMetres2]
function LinearMetresComponent() {
    const [amount,setAmount] = useState(0)
    const dispatch = useAppDispatch()
    const handleChange = (e: ChangeEvent) => setAmount(toPeriod(e.target.value))
    const handleClickDispatch = () => dispatch(additionalItemLinearMetres(amount))
    return (<div className={'AdditionalItemLinearMetres'}>
            <h2>Откосы</h2>
            <p className={'AdditionalItemLinearMetres_description'}>Сюда нужно внести участки стены менее 30см, измерить его высоту и записать в поле:</p>
            <div className={'AdditionalItemLinearMetres_img'}>
                {linearMetresStore.map((data,index) => (
                <img src={data} key={data} alt={`pic${index}`}/>))}
            </div>
            <TextField
                className={'AdditionalItemLinearMetres_textField'}
                name={'linearMetres'}
                onChange={handleChange}
                helperText={'Внести сюда погонный метр всех таких мест'}
                label={'Введите размер в Метрах через точку'}
                onKeyUp={(e) => e.key === 'Enter' && handleClickDispatch()}
            />
            <CCCNewButton label={'Добавить работу в смету'} click={handleClickDispatch} />
        </div>

    );
}

export default LinearMetresComponent;