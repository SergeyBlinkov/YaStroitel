import React, {useRef, useState} from 'react';
import {openReducer} from "../../../Redux/calculatorChooseComponentSlice";
import {CSSTransition} from "react-transition-group";
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";

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
    const ChooseComponent = useAppSelector(state=>state.ChooseBathComponent)
    const neededArray = ChooseComponent[name as keyof typeof ChooseComponent]
    const classChecker = neededArray.filter(component => component.type === CCCItem.type && component.show).length === 0

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
                onClick={() => dispatch(openReducer({name,type:CCCItem.type}))}
            >
                {CCCItem.description}
            </div>
        </CSSTransition>
            <CSSTransition
                in={!classChecker}
                timeout={500}
                nodeRef={descriptionRefComponent}
                classNames={'CCC_description'}
                onEnter={() => setShowDescription(false)}
                onExit={() => setShowDescription(true)}
                mountOnEnter
                unmountOnExit
            >
                <div
                    ref={descriptionRefComponent}
                    className={'calculatorChooseComponent_item__openedComponent'}
                >
                    {CCCItem.component}
                </div>
            </CSSTransition>
        </>

}

export default CCCDescription;