import React, {useMemo, useRef} from 'react';
import {CSSTransition} from "react-transition-group";
import './CCC.css'
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import {closeReducer, openReducer} from "../../../Redux/calculatorChooseComponentSlice";


type Variable = {
    type:string,
    img:string,
    description:string,
    label:string
}
function CCC({variable,bool,name}:{variable:Variable[],bool:boolean,name:string}) {
    const nodeRef = useRef(null)
    const dispatch = useAppDispatch()
    const ChooseComponent = useAppSelector(state=>state.ChooseBathComponent)
    const neededArray = ChooseComponent[name as keyof typeof ChooseComponent]
    useMemo(() => {
        if(!bool) dispatch(closeReducer(name))
    },[bool])
    const BeforeComponent = () => {
        const arr = neededArray.filter(data => data.inPrice)
        const resultArray = variable.filter((data) =>
            arr.filter(component => data.type === component.type).length > 0)
        return resultArray.map(data => <div
            className={'calculatorChooseComponent_beforeElement__item'}
            key={data.type}
        >
            {data.label}
        </div>)
    }
    return (
        <CSSTransition
            in={bool}
            timeout={200}
            classNames={'CCC'}
            mountOnEnter
            unmountOnExit
            nodeRef={nodeRef}
            >
            <div className="calculatorChooseComponent">
                <div className="calculatorChooseComponent_beforeElement">
                    {BeforeComponent()}
                </div>
                {variable.map((data,index)=> {
                    const classChecker = neededArray.filter(component => component.type === data.type && component.show).length === 0
                    return <div className={!classChecker ? "calculatorChooseComponent_item opened" : "calculatorChooseComponent_item"}
                                key={index}
                                onClick={()=>dispatch(openReducer({name,type:data.type}))}>
                        <img
                            src={data.img}
                            alt={data.img}
                            className={'calculatorChooseComponent_item__img'}/>
                        <p className={'calculatorChooseComponent_item__description'}>
                            {data.description}
                        </p>
                    </div>
                })}
            </div>
        </CSSTransition>

    );
}

export default CCC;