import React, {useRef, useState} from 'react';
import {Button, ButtonGroup, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {ChangeEvent} from "../../CalculatorBath/BathType";
import './BathComponent.css'
import './BathComponentCssTransition.css'
import {useAppDispatch} from "../../../../Redux/ReduxConfigStore";
import {dryWallBathScreen} from "../../../../Redux/CalculatorBathSlice";
import CCCMoreInfo from "../../CalculatorChooseComponent/CCC_moreInfo";
import spaceUnderBathFull from './img/spaceunderbathfull.jpg'
import bathHatch2 from './img/bathHatch2.jpg';
import bathHatch1 from './img/bathHatch1.jpg';
import bathHatch3 from  './img/bathHatch3.jpg'
import bathShelf1 from './img/bathShelf1.jpeg';
import bathShelf2 from './img/bathShelf2.jpg';
import bathShelf3 from './img/bathShelf3.jpg';
import {toPeriod} from "../../../helperComponent/helperComponent";
import CCCNewButton from "../../CalculatorChooseComponent/CCCNewButton";
const descriptionSpace = 'Пространство под ванной необходимо для того, что ' +
    'бы вы могли комфортно подойти в плотную к ванне и экран вам не мешал,' +
    'варианта два: 1 - пространство по всей ванне, 2 - пространство по середине'
const descriptionHatch = 'Скрытый люк в экране необходим для того, что бы в случае ремнтных работ' +
    ',либо обслуживания,очистки вам не приходилось разбирать весь экран для устранения различных проблем' +
    'зачастую люк бывает пластиковый и металический(скрытый) поверх обрамляется плиткой'
const descriptionShelf = 'Полка у ванны зачастую нужна для того, когда ваша ванна маленькая от стены ' +
    'до стены и вам необходимо нарастить буквально от 10см и более что бы там не было дыры,' +
    'так же полка может иметь функциональную особенность ниже на картинках показано каким образом'


type Init = {
    bathLength:number,
    shelf:boolean,
    hatch: {hatchType:string,install:boolean},
    spaceUnderBath:boolean
}

const init = {
    bathLength:0,
    shelf:false,
    hatch:{hatchType:'',install:false},
    spaceUnderBath:false
}

function BathComponent() {
    const [bathInfo,setBathInfo] = useState<Init>(init)
    const nodeRef = useRef(null)
    const dispatch = useAppDispatch()
    const handleClickDispatch = () => dispatch(dryWallBathScreen(bathInfo))
    const changeCheckbox = (e:ChangeEvent) => {
        const {name,checked} = e.target
        if(name === 'hatch') setBathInfo({...bathInfo,
            hatch: {
                ...bathInfo.hatch,
                install:checked
            }})
        else setBathInfo({...bathInfo,[name]:checked})
    }
    const handleChangeBathLength = (e:ChangeEvent) =>
        setBathInfo({...bathInfo,bathLength:toPeriod(e.target.value)})
    const handleTypeHatch = (hatchName:string) => setBathInfo({...bathInfo,hatch:{
            ...bathInfo.hatch,
            hatchType:hatchName
            }})

    return  <div
                className={'BathComponent'}
                ref={nodeRef}>
        <div className="BathComponent_bathLength">
            <p>Длина ванны в погонных метрах:</p>
            <TextField
                type={'number'}
                size={'small'}
                onChange={handleChangeBathLength}
                label={'Введите сюда длинну ванны'}/>
        </div>
        <div className={'BathComponent_shelf'}>
            <FormControlLabel
                control={<Checkbox name={'shelf'} onChange={changeCheckbox}/>}
                label={'Необходимо установить полку у ванны?'}/>
            <CCCMoreInfo name={'Полка у ванны'}
                         description={descriptionShelf}
                         img={[bathShelf1,bathShelf2,bathShelf3]} />
        </div>
        <div className="BathComponent_hatch">
            <FormControlLabel
                control={<Checkbox name={'hatch'} onChange={changeCheckbox}/>}
                label={'Установка скрытого люка из плитки?'}/>
            <CCCMoreInfo name={'Установка скрытого люка из плитки'}
                         description={descriptionHatch}
                         img={[bathHatch1,bathHatch2,bathHatch3]}/>
            {bathInfo.hatch.install &&
                <ButtonGroup className={'BathComponent_hatch__buttonGroup'} color={'inherit'}>
                    <Button
                        onClick={() => handleTypeHatch('plastic')}
                        disabled={bathInfo.hatch.hatchType === 'plastic'}>
                        Пластиковый</Button>
                    <Button
                        onClick={() => handleTypeHatch('tile')}
                        disabled={bathInfo.hatch.hatchType === 'tile'}>
                        Люк из плитки</Button>
                </ButtonGroup>
            }
        </div>
        <div className="BathComponent_hatch">
            <FormControlLabel
                control={<Checkbox name={'spaceUnderBath'} onChange={changeCheckbox}/>}
                label={'Пространство под ванной?'}/>
            <CCCMoreInfo
                name={'Пространство под ванной'}
                description={descriptionSpace}
                img={[spaceUnderBathFull]} />

        </div>
        {bathInfo.bathLength > 0 && <CCCNewButton label={'Добавить работу в смету'} click={handleClickDispatch} />}
    </div>
}

export default BathComponent;