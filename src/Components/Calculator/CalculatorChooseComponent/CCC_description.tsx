import React, {useRef, useState} from 'react';
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {Tooltip} from "@mui/material";

type Variable = {
    type: string,
    img: string,
    description: string,
    label: string,
    component: JSX.Element
}

function CCCDescription({CCCItem}: { CCCItem: Variable }) {

    const [showDescription, setShowDescription] = useState(true)
    const descriptionRefString = useRef(null)
    const openedRef = useRef(null)
    const nodeRef = showDescription ? openedRef : descriptionRefString
    return <SwitchTransition mode={'out-in'}>
        <CSSTransition
            key={showDescription ? 'description' : 'opened'}
            timeout={200}
            nodeRef={nodeRef}
            classNames={'CCC_description'}
        >
            <div ref={nodeRef} style={{display:'flex',alignContent:'center',justifyContent:'center'}}>
                {showDescription ? <div
                    ref={openedRef}
                    className={'calculatorChooseComponent_item__description'}
                    onClick={() => setShowDescription(false)}
                >
                    <i className="fa-regular fa-hand"></i>
                    <h3>{CCCItem.label}</h3>
                    <span>~</span>
                    <p>{CCCItem.description}</p>
                </div> : <div
                    ref={descriptionRefString}
                    className={'calculatorChooseComponent_item__openedComponent'}
                >
                    <Tooltip title={'Назад'}>
                        <i className="fa-regular fa-hand-point-left returnButton"
                           onClick={() => setShowDescription(true)}></i>
                    </Tooltip>
                    {CCCItem.component}
                </div>}
            </div>
        </CSSTransition>
    </SwitchTransition>

}

export default CCCDescription;