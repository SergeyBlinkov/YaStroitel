import React, {useState} from 'react';
import CCCNewButton from "../../../CalculatorChooseComponent/CCCNewButton";
import {useAppDispatch, useAppSelector} from "../../../../../Redux/ReduxConfigStore";
import {Checkbox, FormControlLabel} from "@mui/material";
import {ChangeEvent} from "../../BathType";
import {antiWaterPrice} from "../../../../../Redux/CalculatorBathSlice";
import CCCMoreInfo from "../../../CalculatorChooseComponent/CCC_moreInfo";
import AntiWaterFloor from '../../DataForCCCBath/imgStorage/antiwaterFloor.jpg';
import antiWaterWall from '../../DataForCCCBath/imgStorage/antiWaterWall.jpg';
import antiWaterTape from '../../DataForCCCBath/imgStorage/antiWaterLine.jpg';
import './AntiWaterComponent.css';
import AlertMessageHC from "../../../../helperComponent/AlertMessageHC";

type AntiWaterType = {
    floor:boolean,
    wall:boolean,
    tape:boolean
}
const init:AntiWaterType = {
    floor:false,
    wall:false,
    tape:false
}
function AntiWaterComponent() {
    const [antiWaterType,setAntiWaterType] = useState(init)
    const BathCalc = useAppSelector(state=>state.CalculatorBath)
    const dispatch = useAppDispatch()
    const handleChange = (e:ChangeEvent) => {
        const {checked,name} = e.target
        return setAntiWaterType((prevState) => ({...prevState,[name]:checked}))
    }
    const handleClickFloor = () => {
        return dispatch(antiWaterPrice(antiWaterType))
    }

    return (
        <div className={'AntiWaterComponent'}>
            <h2>Несколько вариантов гидроизоляции помещения:</h2>
            <div className={'AntiWaterComponent_item'}>
                <FormControlLabel
                    control={<Checkbox
                        onChange={handleChange}
                        checked={antiWaterType.floor}
                        name={'floor'}
                        disabled={BathCalc.MetresRoom.floor.amount === 0}
                    />}

                    label={'Гидроизоляция полов'}/>
                <CCCMoreInfo name={'Гидроизоляция полов'}
                             description={'Гидроизоляция полов необходима для того , что бы в случае протечки' +
                                 ' и затопления ванной комнаты' +
                    ',вода, которая заполнила ванную комнату не уходила ниже по этажам и не затопила ваших ' +
                                 'соседей ниже'}
                            img={[AntiWaterFloor]}/>
                <AlertMessageHC
                    inBool={BathCalc.MetresRoom.floor.amount === 0}
                    label={'Введите размеры вашей комнаты'}/>
            </div>
            <div className={'AntiWaterComponent_item'}>
                <FormControlLabel
                    control={<Checkbox
                        onChange={handleChange}
                        checked={antiWaterType.wall}
                        name={'wall'}
                        disabled={BathCalc.MetresRoom.wall.amount === 0}

                    />}
                    label={'Гидроизоляция стен'}/>
                <CCCMoreInfo
                    name={'Гидроизоляция стен'}
                    description={'Гидроизоляция стен и полов гарантирует вам спокойствие от протечек' +
                        ' любого вида, так же' +
                        'может помочь если ваши стены были сделаны из гипса(в идеале демонтировать гипс ' +
                        'и заменить на цемнтную штукатурку' +
                        ') , но гидроизоляция поверх гипса может помочь вам с более надеждной укладки ' +
                        'плитки на гипсовую штукатурку.'}
                    img={[antiWaterWall]}
                />
                <AlertMessageHC
                    inBool={BathCalc.MetresRoom.floor.amount === 0}
                    label={'Введите размеры вашей комнаты'}/>
            </div>
            <div className={'AntiWaterComponent_item'}>
                <FormControlLabel
                    control={<Checkbox
                        onChange={handleChange}
                        checked={antiWaterType.tape}
                        name={'tape'}
                        disabled={BathCalc.MetresRoom.floor.amount === 0}
                    />}

                    label={'Гидроизоляционная лента'}/>
                <CCCMoreInfo name={'Гидроизоляционная лента'} description={'Гидроизоляционная лента необходима что бы проеклить стык между стеной и полом , для более ' +
                    'надежного и более герметичного стык двух поверхностей , что бы вода никак не смогла просочиться к ' +
                    'вашим соседям.'} img={[antiWaterTape]} />
                <AlertMessageHC
                    inBool={BathCalc.MetresRoom.floor.amount === 0}
                    label={'Введите размеры вашей комнаты'}/>
            </div>
        <CCCNewButton
            label={'Добавить гидроизоляционные работы в смету'}
            click={handleClickFloor}/>
        </div>
    );
}

export default AntiWaterComponent;