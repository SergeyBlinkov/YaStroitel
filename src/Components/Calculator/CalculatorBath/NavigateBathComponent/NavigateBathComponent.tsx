import React from 'react';
import './NavigateBathComponent.css'
import {useAppSelector} from "../../../../Redux/ReduxConfigStore";
import ButtonComponentId from "../../../helperComponent/ButtonComponentId";

//Каждый новый variable нужно вписывать сюда значение из поля name в компоненте CCCBathStorage(CCC)
const init = ['bath','additionalItems','dryWall','toilet','antiWater','showerType','BathRoomSink']

//todo разобраться со скролом на нужный участок страницы
function NavigateBathComponent() {

    const BathCalc = useAppSelector(state => state.CalculatorBath)
    const dryWallChecker = BathCalc.DryWallWall.price > 0 || BathCalc.DryWallBath.price > 0 ||
        BathCalc.DryWallBox.price > 0 || BathCalc.DryWallShower.price > 0
    const showElement = Object.values(BathCalc).filter(data => init.includes(data.type))


    return (<div className={'NavigateBathComponent'}>
        <ButtonComponentId
            id={'#tileSize'}
            name={'К размеру плитки'}
            classNames={'NavigateBathComponent_button'}
            icon={'fa-solid fa-earth-americas'}
        />
        <ButtonComponentId
            id={'#additionalItems'}
            name={'Дополнительные работы'}
            classNames={'NavigateBathComponent_button'}
            icon={'fa-solid fa-earth-americas'}
        />
                        {dryWallChecker && <div className={'NavigateBathComponent_button'}>
                        <i className="fa-solid fa-earth-americas"></i>
                        <a href={'#dryWall'}>Гипсокартонные работы</a>
                    </div>}
                        {showElement.map(data => (<div key={data.type}><ButtonComponentId
                            id={`#${data.type}`}
                            name={data.label}
                            classNames={'NavigateBathComponent_button'}
                            icon={'fa-solid fa-earth-americas'}
                        /></div>))
                        }

                    </div>
    );
}

export default NavigateBathComponent;