import React, {useState} from 'react';
import CCC from "../../CalculatorChooseComponent/CCC";
import {Button} from "@mui/material";
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
    const handleOpen = (name:string) => setStorage(prev=> ({
        ...prev,[name]: !prev[name as keyof typeof prev]
    }))
    return (

            <div className={'calculatorBath-additionalWork_opened'} id={'additionalItems'}>
                    <CCC
                        variable={CCCAdditionalTileItemsData}
                        name={'additionalItems'}
                        bool={true}
                        label={'Дополнительные работы по плитке'}
                    />
                <div className={'calculatorBath-additionalWork_opened__items'} >
                    <Button
                        id={'bath'}
                        variant={'contained'}
                        onClick={()=>handleOpen('bathType')}
                        className={'calculatorBath-additionalWork_opened__button'}
                        >Установка ванны</Button>
                    <CCC
                    variable={CCCBathData}
                    name={'bath'}
                    bool={storage.bathType}
                    label={'Ванны'}
                />
                </div>
                <div className="calculatorBath-additionalWork_opened__items" >
                    <Button
                        id={'dryWall'}
                        variant={'contained'}
                        onClick={()=>handleOpen('dryWall')}
                        className={'calculatorBath-additionalWork_opened__button'}>
                            ~ Установка коробов из гипсокартона ~</Button>
                    <CCC
                        variable={CCCDryWallData}
                        name={'dryWall'}
                        bool={storage.dryWall}
                        label={'Варианты установки гипсокартона'}
                    />
                </div>
                <div className="calculatorBath-additionalWork_opened__items" >
                    <Button
                        id={'toilet'}
                        variant={'contained'}
                        onClick={()=>handleOpen('toiletBoolean')}
                        className={'calculatorBath-additionalWork_opened__button'}
                    >Установка туалета</Button>
                    <CCC
                        variable={CCCToiletData}
                        name={'toilet'}
                        bool={storage.toiletBoolean}
                        label={'Два варианта унитаза в помещении'}
                    />
                </div>
                <div className="calculatorBath-additionalWork_opened__items" >
                    <Button
                        id={'antiWater'}
                        variant={'contained'}
                        onClick={()=>handleOpen('antiWater')}
                        className={'calculatorBath-additionalWork_opened__button'}
                    >Гидроизоляция помещения</Button>
                    <CCC
                        variable={CCCAntiWaterData}
                        bool={storage.antiWater}
                        name={'antiWater'}
                        label={'Гидроизоляция помещения'}
                    />
                </div>
                <div className="calculatorBath-additionalWork_opened__items" >
                    <Button
                        id={'showerType'}
                        variant={'contained'}
                        onClick={()=>handleOpen('showerTray')}
                        className={'calculatorBath-additionalWork_opened__button'}
                    >Установка душ поддона</Button>
                    <CCC
                        variable={CCCShowerData}
                        name={'showerType'}
                        bool={storage.showerTray}
                        label={'Душевой поддон'}
                    />
                </div>
                <div className="calculatorBath-additionalWork_opened__items" >
                    <Button
                        id={'BathRoomSink'}
                        variant={'contained'}
                        onClick={()=>handleOpen('bathRoomSink')}
                        className={'calculatorBath-additionalWork_opened__button'}
                    >Установка раковины</Button>
                    <CCC
                        variable={CCCBathRoomSinkData}
                        name={'BathRoomSink'}
                        bool={storage.bathRoomSink}
                        label={'Раковина'}
                    />
                </div>

            </div>

    );
}

export default СCCBathStorage;