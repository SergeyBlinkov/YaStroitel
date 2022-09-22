import React, { useRef } from 'react';
import {CSSTransition} from "react-transition-group";
import './style/CCC.css'
import './style/CCCTransition.css'
import CCCDescription from "./CCC_description";
import {H1Style} from "../../helperComponent/helperComponent";


type Variable = {
    type:string,
    img:string,
    description:string,
    label:string,
    component:JSX.Element
}
type CCCType = {
    variable:Variable[],
    bool:boolean,
    name:string,
    label:string
}

function CCC({variable,bool,name,label}:CCCType) {
    const nodeRef = useRef(null)

    return (
        <CSSTransition
            in={bool}
            timeout={500}
            classNames={'CCC'}
            mountOnEnter
            unmountOnExit
            nodeRef={nodeRef}
            >
            <div
                className="calculatorChooseComponent"
                id={name}
                ref={nodeRef}>
                <H1Style>~ {label} ~</H1Style>

                {variable.map((data,index)=> {
                    return <div
                        className={"calculatorChooseComponent_item"}
                        key={index}
                                >

                        <img
                            src={data.img}
                            alt={data.img}
                            className={'calculatorChooseComponent_item__img'}/>
                        <CCCDescription CCCItem={data}/>
                    </div>
                })}
            </div>
        </CSSTransition>

    );
}

export default CCC;