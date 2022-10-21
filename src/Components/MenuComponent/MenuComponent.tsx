import React, {useEffect, useRef, useState} from 'react';
import './MenuComponent.css';
import NavigateBathComponent from "../Calculator/CalculatorBath/NavigateBathComponent/NavigateBathComponent";
import ModalList from "../Calculator/ModalResultWindow/ModalList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import WorkList from "../Calculator/WorkList/WorkList";
import {CSSTransition} from "react-transition-group";
import {BathCalcType} from "../Calculator/CalculatorBath/BathType";
import {useAppSelector} from "../../Redux/ReduxConfigStore";

function MenuComponent() {
    const [openMenu,setOpenMenu] = useState('')
    const [addNewItem,setAddNewItem] = useState('')
    const menuRef= useRef(null)
    const BathCalc:BathCalcType = useAppSelector(state=>state.CalculatorBath)
    const showElement = Object.values(BathCalc).filter(data => data.price > 0)
    const workRef= useRef(null)
    const [showComponent,setShowComponent] = useState({menu:true,work:true})

    useEffect(()=> {
        if(openMenu === 'CloseMenu')
            setAddNewItem('AddNewItemAnimation')
       setTimeout(() =>{
        setAddNewItem('')
    },1000)},[showElement.length,openMenu])
    const openMenuFunc = () => openMenu === 'OpenMenu' ?
        setOpenMenu('CloseMenu') :
        setOpenMenu('OpenMenu')
    const changeBoolean = (e:React.MouseEvent<HTMLButtonElement>) =>{
        const target = (e.target as any).name
        setShowComponent(prev=> ({...prev,[target]:!prev[target as keyof typeof prev]}))
    }
    return (
        <nav className={`MenuComponent ${openMenu}`}>
            <div className={'MenuComponent_menuBar'}>
                <div className={'MenuComponent_menuBar__menu'}>
                    <button className={'ButtonStyle'} name={'menu'} onClick={changeBoolean}>Меню навигации</button>
                    <CSSTransition
                        in={showComponent.menu}
                        timeout={1000}
                        nodeRef={menuRef}
                        classNames={'SlideTop'}
                        mountOnEnter
                        unmountOnExit
                    >
                        <div ref={menuRef}><NavigateBathComponent /></div>
                    </CSSTransition>
                </div>

                <div className={'MenuComponent_menuBar__work'}>
                    <button className={'ButtonStyle'} name={'work'} onClick={changeBoolean}>Работы в смете</button>
                    <CSSTransition
                        in={showComponent.work}
                        timeout={1000}
                        classNames={'SlideTop'}
                        nodeRef={workRef}
                        mountOnEnter
                        unmountOnExit>
                        <div ref={workRef} className={'work'}><WorkList /></div>
                    </CSSTransition>
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