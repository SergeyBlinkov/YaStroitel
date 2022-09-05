import React from 'react';
import './CalculatorStyle.css'
import CalculatorBath from "./CalculatorBath/CalculatorBath";
import WorkList from "./WorkList/WorkList";



const Calculator = () => {
    return (
        <div className={'calculator'}>
            <WorkList />
            <CalculatorBath />
            <div className={'calculator_result'}>

            </div>
        </div>
    );
};

export default Calculator;