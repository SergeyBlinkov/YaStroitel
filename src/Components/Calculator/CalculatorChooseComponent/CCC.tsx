import React, {useRef} from 'react';
import {CSSTransition} from "react-transition-group";
import './style/CCC.css'
import './style/CCCTransition.css'
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import {closeInPrice} from "../../../Redux/calculatorChooseComponentSlice";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import CCCDescription from "./CCC_description";
import {deleteFromCalculatorBath} from "../../../Redux/CalculatorBathSlice";


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
// Что бы компонент работал правильно необходимо:
// 1) Добавить в calculatorChooseComponent (Redux) - name , где "name" это название группы,
// 2)Так же поля show:boolean,inPrice:boolean,type:''


function CCC({variable,bool,name,label}:CCCType) {

    const nodeRef = useRef(null)
    const beforeRef = useRef(null)
    const dispatch = useAppDispatch()
    const ChooseComponent = useAppSelector(state=>state.ChooseBathComponent)
    const neededArray = ChooseComponent[name as keyof typeof ChooseComponent]
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
                onClick={() =>{
                    //todo это пока что не работает
                    dispatch(deleteFromCalculatorBath({name}))
                    //
                    dispatch(closeInPrice({name,type:data.type}))
                }}>
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
                <h2 className={'calculatorChooseComponent_h'}>{label}</h2>
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
                    const arrowChecker = neededArray.filter(component =>
                        component.type === data.type &&
                        component.show).length === 0
                    return <div
                        className={"calculatorChooseComponent_item"}
                        key={index}
                                >
                        {arrowChecker && <i className="fa-solid fa-arrow-pointer arrowClick"></i>}
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