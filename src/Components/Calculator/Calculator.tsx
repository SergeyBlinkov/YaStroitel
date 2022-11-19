import React from 'react';
import './CalculatorStyle.css'
import CalculatorBath from "./CalculatorBath/CalculatorBath";



const Calculator = () => {
    return (
        <div className={'calculator'}>
            <CalculatorBath />
            <div className={'calculator_result'}>
            </div>
        </div>
    );
};

export default Calculator;