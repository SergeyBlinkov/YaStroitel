import React from 'react';
import './CalculatorStyle.css'
import CalculatorBath from "./CalculatorBath/CalculatorBath";
import WorkList from "./WorkList/WorkList";
import ModalList from "./ModalResultWindow/ModalList";



const Calculator = () => {
    return (
        <div className={'calculator'}>
            <WorkList />
            <CalculatorBath />
            <div className={'calculator_result'}>
                <ModalList />
            </div>
        </div>
    );
};

export default Calculator;