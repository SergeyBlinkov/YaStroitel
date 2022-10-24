import React, {createRef} from 'react';
import './WorkList.css'
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import {deletePriceFromCalculatorReducer} from "../../../Redux/CalculatorBathSlice";
import {BathCalcType} from "../CalculatorBath/BathType";
import CutWords from "../../helperComponent/CutWords";
import {CSSTransition, TransitionGroup} from "react-transition-group";





function WorkList() {
    const BathCalc: BathCalcType = useAppSelector(state => state.CalculatorBath)
    const showElement = Object.values(BathCalc).filter((data) => data.price > 0)
    const newArray = showElement.map((data,index) => ({
        ...data, nodeRef:createRef(),id: index
    }))
  

    const dispatch = useAppDispatch()
    return (
        <TransitionGroup className="WorkList">
            {newArray.map((data, index) => (
                 index < 10 && <CSSTransition
                    key={`${data.id}`}
                    timeout={1000}
                    classNames={'MoveToRight'}
                    nodeRef={data.nodeRef}
                >
                    <div className={'WorkList_item'} ref={data.nodeRef}>
                        <CutWords message={data.label}/>
                        <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => {
                                for (const [key, value] of Object.entries(BathCalc)) {
                                    if (value.type === data.type) {
                                        dispatch(deletePriceFromCalculatorReducer({name: key, type: data.type}))
                                    }
                                }
                            }}>
                        <span className={'deleteIcon'}>
                            <DeleteIcon fontSize="inherit"/>
                        </span>
                        </IconButton>
                    </div>
                </CSSTransition>

                ))}

            {showElement.length >= 10 && <span style={{color: "#847C6", fontSize: 25}}>...</span>}
</TransitionGroup>
    );
}

export default WorkList;