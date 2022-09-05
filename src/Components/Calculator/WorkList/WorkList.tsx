import React, {useRef} from 'react';
import './WorkList.css'
import {CSSTransition} from "react-transition-group";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import {deletePriceFromCalculatorReducer} from "../../../Redux/CalculatorBathSlice";
import {BathCalcType} from "../CalculatorBath/BathType";




function WorkList() {
        const BathCalc:BathCalcType = useAppSelector(state=>state.CalculatorBath)
    const WorkListRef = useRef(null)
    const dispatch = useAppDispatch()
    const showElement = Object.values(BathCalc).filter(data => data.price > 0)
    return (
        <CSSTransition
            in={showElement.length > 0}
            timeout={500}
            classNames={'CCC_beforeElement'}
            mountOnEnter
            unmountOnExit
            nodeRef={WorkListRef}
        >
            <div
                className="WorkList"
                ref={WorkListRef}
            >
                {showElement.map((data) => <div
                    className={'WorkList_item'}
                    key={data.type}
                >
                    <p>{data.label}</p>
                    <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                            for (const [key, value] of Object.entries(BathCalc)) {
                               if(value.label === data.label)
                                   if(data.type === 'dryWall') {
                                       if(data.bath.price > 0)
                                           dispatch(deletePriceFromCalculatorReducer({name:key,type:data.bath.type}))
                                       if(data.box.price > 0)
                                           dispatch(deletePriceFromCalculatorReducer({name:key,type:data.box.type}))
                                       if(data.wall.price > 0)
                                           dispatch(deletePriceFromCalculatorReducer({name:key,type:data.wall.price}))
                                   }
                                   else dispatch(deletePriceFromCalculatorReducer({name:key,type:data.type}))
                            }
                        }}>
                        <DeleteIcon
                            fontSize="inherit"
                        />
                    </IconButton>
                </div>)}

            </div>
        </CSSTransition>
    );
}

export default WorkList;