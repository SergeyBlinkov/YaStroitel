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

    return (
                <div
                    className="WorkList"
                >
                    {showElement.map((data,index) => {

                        return <div
                            id={`lastChild${index}`}
                            className={'WorkList_item'}
                            key={data.label}
                        >
                            <p><CutWords message={data.label}/></p>
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
                        <span className={'deleteIcon'}><DeleteIcon
                            fontSize="inherit"
                        /></span>
                            </IconButton>
                        </div>
                    })}

                </div>



    );
}

export default WorkList;