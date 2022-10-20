import React, {useRef, useState} from 'react';
import './NavigateBathComponent.css'
import {List,ListSubheader} from "@mui/material";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppSelector} from "../../../../Redux/ReduxConfigStore";
import {CSSTransition} from "react-transition-group";

//Каждый новый variable нужно вписывать сюда значение из поля name в компоненте CCCBathStorage(CCC)
const init = ['bath','additionalItems','dryWall','toilet','antiWater','showerType','BathRoomSink']

//todo разобраться со скролом на нужный участок страницы
function NavigateBathComponent() {
    const [openNavi,setOpenNavi] = useState<string>('OpenNavigate')
    const BathCalc = useAppSelector(state => state.CalculatorBath)
    const listRef = useRef(null)
    const openChecker = openNavi === 'OpenNavigate'
    const dryWallChecker = BathCalc.DryWallWall.price > 0 || BathCalc.DryWallBath.price > 0 ||
        BathCalc.DryWallBox.price > 0 || BathCalc.DryWallShower.price > 0
    const showElement = Object.values(BathCalc).filter(data => data.price > 0 &&
        init.includes(data.type))
    const openNaviFunc = () => openChecker ?
        setOpenNavi('CloseNavigate') :
        setOpenNavi('OpenNavigate')

    return (<CSSTransition
            in={showElement.length > 0 || (BathCalc.TileSize.price > 0 && BathCalc.MetresRoom.floor.amount > 0)}
            timeout={500}
            classNames={'Fast-transition'}
            nodeRef={listRef}
            mountOnEnter
            unmountOnExit
        >
            <div className={`NavigateBathComponent ${openNavi}`} ref={listRef}>
                <List
                    sx={{width: '130px', maxWidth: 130, bgcolor: 'background.paper'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Навигация
                        </ListSubheader>}>

                    <div className={'NavigateBathComponent_list'} ref={listRef}>

                        <div className={'NavigateBathComponent_button'}>
                        <i className="fa-solid fa-earth-americas"></i>
                        <a href={'#tileSize'}>К размеру плитки</a>
                    </div>
                        <div className={'NavigateBathComponent_button'}>
                            <i className="fa-solid fa-earth-americas"></i>
                            <a href={'#additionalItems'}>Дополнительные работы</a>
                        </div>
                        {dryWallChecker && <div className={'NavigateBathComponent_button'}>
                        <i className="fa-solid fa-earth-americas"></i>
                        <a href={'#dryWall'}>Гипсокартонные работы</a>
                    </div>}
                        {showElement.map(data => {
                                return <div key={data.type} className={'NavigateBathComponent_button'}>
                                    <i className="fa-solid fa-earth-americas"></i>
                                    <a href={`#${data.type}`}>{data.label}</a>
                                </div>
                            })
                        }

                    </div>
                </List>
                <span className={'NavigateBathComponent_iconDiv'} onClick={openNaviFunc}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className={'NavigateBathComponent_iconDiv__button'}
                        rotate={openChecker ? 'fa-rotate-180' : 'fa-rotate-360'}/>
                </span>
            </div>
        </CSSTransition>
    );
}

export default NavigateBathComponent;