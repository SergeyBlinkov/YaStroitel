import React, {useRef, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import {useAppDispatch} from "../../../Redux/ReduxConfigStore";
import {Tooltip} from "@mui/material";

type Variable = {
    type:string,
    img:string,
    description:string,
    label:string,
    component:JSX.Element
}

function CCCDescription({CCCItem,name}:{CCCItem:Variable,name:string}) {

    const [showDescription,setShowDescription] = useState(true)
    const dispatch = useAppDispatch()
    const descriptionRefString = useRef(null)
    const descriptionRefComponent = useRef(null)
    return  <>
        <CSSTransition
            in={showDescription}
            timeout={500}
            nodeRef={descriptionRefString}
            classNames={'CCC_description'}
            mountOnEnter
            unmountOnExit
        ><div
                ref={descriptionRefString}
                className={'calculatorChooseComponent_item__description'}
                onClick={() => setShowDescription(false)}
            >
            <i className="fa-regular fa-hand"></i>
            <h3>{CCCItem.label}</h3>
            <span>~</span>
            <p>{CCCItem.description}</p>
            </div>
        </CSSTransition>
            <CSSTransition
                in={!showDescription}
                timeout={500}
                nodeRef={descriptionRefComponent}
                classNames={'CCC_description'}
                mountOnEnter
                unmountOnExit
            >
                <div
                    ref={descriptionRefComponent}
                    className={'calculatorChooseComponent_item__openedComponent'}
                >
                    <Tooltip title={'Назад'}>
                        <i className="fa-regular fa-hand-point-left returnButton"
                            onClick={() => setShowDescription(true)}></i>
                    </Tooltip>
                    {CCCItem.component}
                </div>
            </CSSTransition>
        </>

}

export default CCCDescription;