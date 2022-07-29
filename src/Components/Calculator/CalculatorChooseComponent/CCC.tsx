import React, {useMemo, useRef} from 'react';
import {CSSTransition} from "react-transition-group";
import './style/CCC.css'
import './style/CCCTransition.css'
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import {closeInPrice, closeReducer} from "../../../Redux/calculatorChooseComponentSlice";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import CCCDescription from "./CCC_description";


type Variable = {
    type:string,
    img:string,
    description:string,
    label:string,
    component:JSX.Element
}
function CCC({variable,bool,name}:{variable:Variable[],bool:boolean,name:string}) {

    const nodeRef = useRef(null)
    const beforeRef = useRef(null)
    const dispatch = useAppDispatch()
    const ChooseComponent = useAppSelector(state=>state.ChooseBathComponent)
    const neededArray = ChooseComponent[name as keyof typeof ChooseComponent]

    useMemo(() => {
        if(!bool) dispatch(closeReducer(name))
    },[bool,dispatch,name])
    const beforeElementArray = neededArray.filter(data => data.inPrice)
    const BeforeComponent = () => {
        const resultArray = variable.filter((data) =>
            beforeElementArray.filter(component => data.type === component.type).length > 0)
        return (<>{resultArray.map(data => <div
            className={'calculatorChooseComponent_beforeElement__item'}
            key={data.type}
        >
            <p>{data.label}</p>
            <IconButton
                aria-label="delete"
                size="small"
                onClick={() =>dispatch(closeInPrice({name,type:data.type}))}>
                <DeleteIcon
                    fontSize="inherit"
                />
            </IconButton>
        </div>)}</>)
    }
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
                ref={nodeRef}>
                    <CSSTransition
                        in={beforeElementArray.length > 0}
                        timeout={500}
                        classNames={'CCC_beforeElement'}
                        mountOnEnter
                        unmountOnExit
                        nodeRef={beforeRef}
                    >
                        <div
                            className="calculatorChooseComponent_beforeElement"
                            ref={beforeRef}
                        >
                        <BeforeComponent />

                    </div>
                    </CSSTransition>

                {variable.map((data,index)=> {
                    return <div
                        className={"calculatorChooseComponent_item"}
                        key={index}
                                >
                        <img
                            src={data.img}
                            alt={data.img}
                            className={'calculatorChooseComponent_item__img'}/>
                        <CCCDescription CCCItem={data} name={name}/>
                    </div>
                })}
            </div>
        </CSSTransition>

    );
}

export default CCC;