import React, {useState} from 'react';
import './style.css';
import {Button, TextField} from "@mui/material";
import {useAppDispatch} from "../../../../../Redux/ReduxConfigStore";
import {ChangeEvent} from "../../BathType";
import CCCNewButton from "../../../CalculatorChooseComponent/CCCNewButton";
import {additionalItemAngle} from "../../../../../Redux/CalculatorBathSlice";
import CCCMoreInfo from "../../../CalculatorChooseComponent/CCC_moreInfo";
import profile1 from './imgStore/profileItem1.jpg';
import profile2 from './imgStore/profileItem2.jpg';
import profile3 from './imgStore/profileItem3.jpg';
import degree1 from './imgStore/degree1.jpg';
import degree2 from './imgStore/degree2.jpg';
import degree3 from './imgStore/degree3.jpg';
import {toPeriod} from "../../../../helperComponent/helperComponent";
import AlertMessageHc from "../../../../helperComponent/AlertMessageHC";

const angleDescribe = 'Красивое дизайнерское решение, отлично выглядит и не бросается в глаза,\n' +
    '                        но менее устойчиво к механическим воздействиям и имеет более острые углы,\n' +
    '                        вариант более дорогой'
const profileDescribe = 'Практичный и безопасный вариант, не имеет острых углов, более устойчив\n' +
    '                        к механическим воздействиям, но имеет менее эстетичный внешний вид,\n' +
    '                        бросается в глаза, вариант более дешевый'
const angleImg = [degree1,degree2,degree3]
const profileImg = [profile1,profile2,profile3]

function AngleComponent() {
    const [storage,setStorage] = useState({type:'',amount:0})
    const [err,setErr] = useState({isShow:false,message:""})
    const dispatch = useAppDispatch()
    const profileChecker = storage.type === 'profile'
    const degreeChecker = storage.type === 'degree'
    const handleChange = (e:ChangeEvent) =>  setStorage({...storage,amount: toPeriod(e.target.value)})
    const handleClickDispatch = () => {
        if(storage.type === '') setErr(prev => ({...prev,isShow:true,message: 'Выберите: 45 градусов или профиль'}))
        if(storage.amount === 0) setErr((prev => ({...prev,isShow: true,message: 'Введите количество в погонных метрах'})))
        if(storage.type !== '' && storage.amount !== 0)
        {
            setErr(prev=>({...prev,isShow: false,message: ''}))
            dispatch(additionalItemAngle(storage))
        }
    }
    return (
        <div className={'AdditionalItemAngle'}>
            <div className={'AdditionalItemAngle_degree'}>
                <p>Запил под 45 градусов</p>
                <div className={'AdditionalItemAngle__describe'}>
                    <p>
                        {angleDescribe}
                    </p>
                    <CCCMoreInfo name={'Запил под 45'} description={angleDescribe} img={angleImg}/>
                </div>
                <Button
                    className={'AdditionalItemAngle__button'}
                    variant={degreeChecker ? 'contained' : 'outlined'}
                    color={degreeChecker ? 'success' : 'primary'}
                    onClick={() => setStorage({...storage,type:'degree'})}
                >Угол 45 градусов
                </Button>
            </div>
            <div className={'AdditionalItemAngle_profile'}>
                <p>Установка профиля</p>
                <div className={'AdditionalItemAngle__describe'}>
                    <p>
                        {profileDescribe}
                    </p>
                    <CCCMoreInfo name={'Профиль'} description={profileDescribe} img={profileImg}/>
                </div>

                <Button
                    variant={profileChecker ? 'contained' : 'outlined'}
                    color={profileChecker ? 'success' : 'primary'}
                    className={'AdditionalItemAngle__button'}

                    onClick={() => setStorage({...storage,type:'profile'})}
                >Профиль
                </Button>
            </div>
            <TextField
                className={'AdditionalItemAngle_textField'}
                helperText={'Внести сюда погонный метр всех внешних углов'}
                label={'Введите размер в Метрах через точку'}
                name={'angle'}
                onChange={handleChange}
                onKeyUp={(e) => {
                    if(e.key === 'Enter')
                        handleClickDispatch()
                }}
            />
            <AlertMessageHc inBool={err.isShow} label={err.message}/>
            <CCCNewButton label={'Добавить работу в смету'} click={handleClickDispatch} />
        </div>
    );
}

export default AngleComponent;