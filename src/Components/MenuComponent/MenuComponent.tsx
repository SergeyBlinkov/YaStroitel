import React, {useEffect, useState} from 'react';
import './MenuComponent.css';
import NavigateBathComponent from "../Calculator/CalculatorBath/NavigateBathComponent/NavigateBathComponent";
import ModalList from "../Calculator/ModalResultWindow/ModalList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import WorkList from "../Calculator/WorkList/WorkList";
import {BathCalcType} from "../Calculator/CalculatorBath/BathType";
import {useAppSelector} from "../../Redux/ReduxConfigStore";


function MenuComponent() {
    const [openMenu,setOpenMenu] = useState('')
    const [addNewItem,setAddNewItem] = useState('')
    const BathCalc:BathCalcType = useAppSelector(state=>state.CalculatorBath)
    const showElement = Object.values(BathCalc).filter(data => data.price > 0)


    useEffect(()=> {
        if(openMenu === 'CloseMenu')
            setAddNewItem('AddNewItemAnimation')
       setTimeout(() =>{
        setAddNewItem('')
    },1000)},[showElement.length,openMenu])

    const openMenuFunc = () => openMenu === 'OpenMenu' ?
        setOpenMenu('CloseMenu') :
        setOpenMenu('OpenMenu')
    return (
        <nav className={`MenuComponent ${openMenu}`}>
            <div className={'MenuComponent-menuBar'}>
                <div className={'MenuComponent-menuBar_menu'}>
                    <button className={'ButtonStyle'}>Меню навигации</button>
                    <NavigateBathComponent />
                </div>

                <div className={'MenuComponent-menuBar_work'}>
                    <button className={'ButtonStyle'}>Работы в смете</button>
                    <WorkList />
                </div>
                    <ModalList />

            </div>
                <span className={`MenuComponent_ButtonBlock ${addNewItem}`} onClick={openMenuFunc}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className={'MenuComponent_ButtonBlock__button '}
                        />
                </span>

        </nav>
    );
}

export default MenuComponent;