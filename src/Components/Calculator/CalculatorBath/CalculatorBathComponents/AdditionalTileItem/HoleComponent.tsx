import React, {useState} from 'react';
import './style.css';
import {Button, TextField} from "@mui/material";
import {ChangeEvent} from "../../BathType";
import {useAppDispatch} from "../../../../../Redux/ReduxConfigStore";
import {toPeriod} from "../../../../helperComponent/helperComponent";
import CCCNewButton from "../../../CalculatorChooseComponent/CCCNewButton";
import {additionalItemHole} from "../../../../../Redux/CalculatorBathSlice";

function HoleComponent() {
    const [storage,setStorage] = useState({type:'porcelain',amount:0})
    const dispatch = useAppDispatch()
    const porcelainChecker = storage.type === 'porcelain'
    const handleChange = (e: ChangeEvent) => setStorage({...storage,amount:toPeriod(e.target.value)})
    const handleClick = (type:string) => setStorage({...storage,type})
    const handleClickDispatch = () => dispatch(additionalItemHole(storage))
    return (
        <div className={'AdditionalItemHole'}>
            <h2>Ваш формат плитки</h2>
            <div className={'AdditionalItemHole_item'}>
                <p>
                    Керамогранит намного тяжелее в работе и соответственно в нем сложнее делать
                    отверстия, так же необходимы коронки с алмазным напылением для проделывания
                    отверстий
                </p>
                <Button
                    variant={porcelainChecker ? 'contained' : 'text'}
                    color={porcelainChecker ? 'success' : 'primary'}
                    onClick={() => handleClick('porcelain')}
                >Керамогранит</Button>
            </div>
            <div className={'AdditionalItemHole_item'}>
                <p>
                    Керамическая плитка более проста в работе и отверстия можно делать коронками
                    с вальфрамовым напылением, конечно вам никто не запрещает делать это и с алмазными.
                </p>
                <Button
                    variant={!porcelainChecker ? 'contained' : 'text'}
                    color={!porcelainChecker ? 'success' : 'primary'}
                    onClick={() => handleClick('ceramic')}
                >Керамическая
                </Button>
            </div>
            <TextField
                className={'AdditionalItemHole_textField'}
                label={'Количество отверстий в плитке'}
                name={'hole'}
                onChange={handleChange}
                onKeyUp={(e) => e.key === 'Enter' && handleClickDispatch()}
            />
            <CCCNewButton label={'Добавить работу в смету'} click={handleClickDispatch} />
        </div>
    );
}

export default HoleComponent;