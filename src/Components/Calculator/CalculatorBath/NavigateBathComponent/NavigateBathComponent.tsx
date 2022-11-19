import React from 'react';
import './NavigateBathComponent.css'
import ButtonComponentId from "../../../helperComponent/ButtonComponentId";



function NavigateBathComponent() {



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
            <ButtonComponentId
                id={'#dryWall'}
                name={'Гипсокартонные работы'}
                classNames={'NavigateBathComponent_button'}
                icon={'fa-solid fa-earth-americas'}
            />
            <ButtonComponentId
                id={'#BathRoomSink'}
                name={'Установка раковины'}
                classNames={'NavigateBathComponent_button'}
                icon={'fa-solid fa-earth-americas'}
            />
            <ButtonComponentId
                id={'#showerType'}
                name={'Душевой поддон'}
                classNames={'NavigateBathComponent_button'}
                icon={'fa-solid fa-earth-americas'}
            />
            <ButtonComponentId
                id={'#antiWater'}
                name={'Гидроизоляция помещения'}
                classNames={'NavigateBathComponent_button'}
                icon={'fa-solid fa-earth-americas'}
            />
            <ButtonComponentId
                id={'#toilet'}
                name={'Установка туалета'}
                classNames={'NavigateBathComponent_button'}
                icon={'fa-solid fa-earth-americas'}
            />
            <ButtonComponentId
                id={'#bath'}
                name={'Установка ванны'}
                classNames={'NavigateBathComponent_button'}
                icon={'fa-solid fa-earth-americas'}
            />
    </div>
    );
}

export default NavigateBathComponent;