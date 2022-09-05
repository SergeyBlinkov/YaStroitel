import React, {useState} from 'react';
import {ChangeEvent} from "../BathType";
import CCC from "../../CalculatorChooseComponent/CCC";
import {Checkbox, FormControlLabel} from "@mui/material";
import {CCCAntiWaterData, CCCBathData, CCCDryWallData, CCCToiletData} from "./DataCCCBathComponent";


//Что бы компонент работал правильно необходимо:
//1)Добавить новый елемент в типизацию и в сам стейт(init).
//2)Добавить на !checked в функцию handleChange:
// 2.1)if(name === 'bathType' && !checked) dispatch(closeReducer(name)
//  где 'name' это то , что вы добавили в стейт(init), checked приходит из ивента, в диспатч уходит это же 'name'
// 2.2) dispatch('тут reducer из CalculatorBathSlice что бы в общей смете убрать стоимость работы'('none'))
//  на 'none' сделать в reducer что бы он делал {type:'',price:0}
//3)Создаем отдельную <FormControlLabel/> для нового елемента
//4)В самом низу создаем компонент <CCC/> перекидываем в него:
// 4.1) 'variable' берется из компонента DataCCCBathComponent;
// 4.2) 'name' имя нового елемента из стейта(init);
// 4.3) 'bool' boolean значение этого самого стейта(init);
// 4.4) 'label' то, что будет написано в заголовке компонента

type Init = {
    antiWater:boolean,
    showerTray:boolean,
    toiletBoolean:boolean,
    bathType:boolean,
    dryWall:boolean
}
const init = {
    antiWater:false,
    showerTray:false,
    toiletBoolean:false,
    bathType:false,
    dryWall:false
}
function СCCBathStorage() {
    const [storage,setStorage] = useState<Init>(init)
    const handleChange = (e:ChangeEvent) => {
        const {checked,name} = e.target
        return setStorage((prevState) => ({...prevState,[name]:checked}))
    }
    return (
        <>
            <div className={'calculatorBath-additionalWork'}>
            <FormControlLabel
                control={<Checkbox
                    checked={storage.bathType}
                    onChange={handleChange}
                    name={'bathType'}
                />}
                label={'Установка ванны'}
            />
            <FormControlLabel
                control={<Checkbox
                    name={'toiletBoolean'}
                    onChange={handleChange}
                    checked={storage.toiletBoolean}
                />}
                label={'Установка туалета'}/>
            <FormControlLabel
                control={<Checkbox
                    onChange={handleChange}
                    checked={storage.showerTray}
                    name={'showerTray'}
                />}
                label={'Установка душ поддона'}/>
            <FormControlLabel
                control={<Checkbox
                    onChange={handleChange}
                    checked={storage.dryWall}
                    name={'dryWall'}
                />}

                label={'Установка коробов из гипсокартона'}/>
                <FormControlLabel
                    control={<Checkbox
                        onChange={handleChange}
                        checked={storage.antiWater}
                        name={'antiWater'}
                    />}

                    label={'Гидроизоляция помещения'}/>
        </div>
            <div className={'calculatorBath-additionalWork_opened'}>
                <CCC
                    variable={CCCBathData}
                    name={'bathType'}
                    bool={storage.bathType}
                    label={'Ванны'}
                />
                <CCC
                    variable={CCCDryWallData}
                    name={'dryWall'}
                    bool={storage.dryWall}
                    label={'Варианты установки гипсокартона'}
                />
                <CCC
                    variable={CCCToiletData}
                    name={'toilet'}
                    bool={storage.toiletBoolean}
                    label={'Два варианта унитаза в помещении'}
                />
                <CCC
                    variable={CCCAntiWaterData}
                    bool={storage.antiWater}
                    name={'antiWater'}
                    label={'Гидроизоляция помещения'}
                    />
            </div>
        </>
    );
}

export default СCCBathStorage;