import React, { useRef} from 'react';
import './CalculatorStyle.css'
import CalculatorBath from "./CalculatorBath/CalculatorBath";
import FigureBehind from "../../ui_local/background/backgroundFigureBehind/figureBehind";



const Calculator = () => {
    const calculatorWindowRef = useRef<HTMLDivElement | null>(null)
    return (
        <div className={'calculator'} ref={calculatorWindowRef} id={'id'}>
            <FigureBehind windowRef={calculatorWindowRef} amount={210}/>
            <CalculatorBath />
            <div className={'calculator_result'}>
            </div>
        </div>
    );
};

export default Calculator;