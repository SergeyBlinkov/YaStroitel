import React from 'react';
import './WorkList.css'
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import {deletePriceFromCalculatorReducer} from "../../../Redux/CalculatorBathSlice";
import {BathCalcType} from "../CalculatorBath/BathType";
import CutWords from "../../helperComponent/CutWords";


function WorkList() {
    const BathCalc:BathCalcType = useAppSelector(state=>state.CalculatorBath)
    const dispatch = useAppDispatch()
    const showElement = Object.values(BathCalc).filter(data => data.price > 0)


    return (<div className="WorkList">
                    {showElement.map((data,index) => {

                        return index < 10 && <div
                            className={'WorkList_item'}
                            key={data.label}
                        >
                            <p><CutWords message={data.label}/></p>
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => {
                                    for(const[key ,value] of Object.entries(BathCalc)) {
                                        if(value.type === data.type) {
                                            dispatch(deletePriceFromCalculatorReducer({name:key,type:data.type}))
                                        }
                                    }
                                }}>
                        <span className={'deleteIcon'}><DeleteIcon
                            fontSize="inherit"
                        /></span>
                            </IconButton>
                        </div>

                    })}
            {showElement.length >= 10 &&<span style={{color:"#847C6",fontSize:25}}>...</span>}
                </div>
    );
}

export default WorkList;