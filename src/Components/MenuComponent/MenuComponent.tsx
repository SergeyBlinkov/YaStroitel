import React, {useState} from 'react';
import './MenuComponent.css';
import NavigateBathComponent from "../Calculator/CalculatorBath/NavigateBathComponent/NavigateBathComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";



let init = 'CloseMenu'

function MenuComponent() {
    const [openMenu,setOpenMenu] = useState(init)
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
            </div>
                <button className={`MenuComponent_ButtonBlock`} onClick={openMenuFunc}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className={'MenuComponent_ButtonBlock__button '}
                        />
                </button>

        </nav>
    );
}

export default MenuComponent;