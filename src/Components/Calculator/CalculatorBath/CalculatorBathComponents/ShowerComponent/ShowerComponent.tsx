import React from 'react';
import {ListOfBenefitAndLimit} from "../../../../helperComponent/helperComponent";
import ShowerList from './ShowerComponentData.json'
import {imgCircle, imgSquare, imgStraight, imgWithCab, imgWithoutBorder} from "./ShowerStorePicture";
import './ShowerComponent.css'
import {useAppDispatch} from "../../../../../Redux/ReduxConfigStore";
import {showerInstallation} from "../../../../../Redux/CalculatorBathSlice";
import CCCNewButton from "../../../CalculatorChooseComponent/CCCNewButton";
type ShowerType = {
    type:string
}
const imgObject = {
    circle:imgCircle,
    square:imgSquare,
    straight:imgStraight,
    withCab:imgWithCab,
    withoutBorder:imgWithoutBorder
}



function ShowerComponent({type}:ShowerType) {
    const dispatch = useAppDispatch()
    const imgObjectKey = imgObject[type as keyof typeof imgObject]
    const key = ShowerList[type as keyof typeof ShowerList]
    const handleClick = () => dispatch(showerInstallation(type))

    return (<div className={'ShowerComponent'}>
        <ListOfBenefitAndLimit benefits={key.benefits} limitations={key.limitations}/>
        <div className={'ShowerComponent_ItemImage'}>
            {imgObjectKey.map((data,index) => (<img src={data} alt={`pic${index}`} key={index}/>)) }
        </div>
        <CCCNewButton label={'Установить этот душ'} click={handleClick}/>
    </div>);
}

export default ShowerComponent;