import React, {useState} from 'react';
import {ChangeEvent} from "../BathType";
import CCC from "../../CalculatorChooseComponent/CCC";
import {Checkbox, FormControlLabel, Tooltip} from "@mui/material";
import {
    CCCAdditionalTileItemsData,
    CCCAntiWaterData,
    CCCBathData, CCCBathRoomSinkData,
    CCCDryWallData,
    CCCShowerData,
    CCCToiletData
} from "./DataCCCBathComponent";


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
    antiWater: boolean,
    showerTray: boolean,
    toiletBoolean: boolean,
    bathType: boolean,
    dryWall: boolean,
    bathRoomSink: boolean
}
const init = {
    antiWater: false,
    showerTray: false,
    toiletBoolean: false,
    bathType: false,
    dryWall: false,
    bathRoomSink: false
}

function СCCBathStorage() {
    const [storage, setStorage] = useState<Init>(init)
    const handleChange = (e: ChangeEvent) => {
        const {checked, name} = e.target
        return setStorage((prevState) => ({...prevState, [name]: checked}))
    }
    return (
        <>
            <div className={'calculatorBath-additionalWork'}>
                <Tooltip title={'Все елементы появятся внизу'} placement={'right'}><FormControlLabel
                    control={<Checkbox
                        checked={storage.bathType}
                        onChange={handleChange}
                        name={'bathType'}
                    />}
                    label={'Установка ванны'}
                /></Tooltip>
                <Tooltip title={'Все елементы появятся внизу'} placement={'right'}><FormControlLabel
                    control={<Checkbox
                        name={'toiletBoolean'}
                        onChange={handleChange}
                        checked={storage.toiletBoolean}
                    />}
                    label={'Установка туалета'}/>
                </Tooltip>
                <Tooltip title={'Все елементы появятся внизу'} placement={'right'}><FormControlLabel
                    control={<Checkbox
                        onChange={handleChange}
                        checked={storage.showerTray}
                        name={'showerTray'}
                    />}
                    label={'Установка душ поддона'}/></Tooltip>
                <Tooltip title={'Все елементы появятся внизу'} placement={'right'}><FormControlLabel
                    control={<Checkbox
                        onChange={handleChange}
                        checked={storage.dryWall}
                        name={'dryWall'}
                    />}

                    label={'Установка коробов из гипсокартона'}/></Tooltip>
                <Tooltip title={'Все елементы появятся внизу'} placement={'right'}><FormControlLabel
                    control={<Checkbox
                        onChange={handleChange}
                        checked={storage.antiWater}
                        name={'antiWater'}/>}

                    label={'Гидроизоляция помещения'}/></Tooltip>
                <Tooltip title={'Все елементы появятся внизу'} placement={'right'}><FormControlLabel
                    control={<Checkbox
                        name={'bathRoomSink'}
                        onChange={handleChange}
                        checked={storage.bathRoomSink}/>}
                    label={'Установка раковины'}
                /></Tooltip>
            </div>
            <div className={'calculatorBath-additionalWork_opened'}>
                <CCC
                    variable={CCCAdditionalTileItemsData}
                    name={'additionalItems'}
                    bool={true}
                    label={'Дополнительные работы по плитке'}
                />
                <CCC
                    variable={CCCBathData}
                    name={'bath'}
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
                <CCC
                    variable={CCCShowerData}
                    name={'showerType'}
                    bool={storage.showerTray}
                    label={'Душевой поддон'}
                />
                <CCC
                    variable={CCCBathRoomSinkData}
                    name={'BathRoomSink'}
                    bool={storage.bathRoomSink}
                    label={'Раковина'}
                />
            </div>
        </>
    );
}

export default СCCBathStorage;