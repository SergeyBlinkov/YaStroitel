import React, {useRef} from 'react';
import {Alert} from "@mui/material";
import {CSSTransition} from "react-transition-group";
import '../Calculator/CalculatorChooseComponent/style/CCCTransition.css'

type AlertMessageHCType = {
    inBool: boolean,
    label:string,
}

const AlertMessageHc = ({inBool,label}:AlertMessageHCType) => {
    const nodeRef = useRef(null)
    return (
        <CSSTransition
        in={inBool}
        timeout={500}
        mountOnEnter
        unmountOnExit
        classNames={'AlertMessageHC'}
        nodeRef={nodeRef}>
            <Alert className={'AlertMessageHC'} severity="error" ref={nodeRef}>{label}</Alert>
        </CSSTransition>

    );
};

export default AlertMessageHc;