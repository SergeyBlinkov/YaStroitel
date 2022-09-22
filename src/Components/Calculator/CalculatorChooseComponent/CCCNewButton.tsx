import React, {useEffect, useRef, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import './style/CCCTransition.css'

type CCCNewButtonType = {
    bool?:boolean,
    label:string,
    click:() => {payload:any;type:string}
}

function CCCNewButton({label,click}:CCCNewButtonType) {
     const [s,setS] = useState(false)
    useEffect(() => setS(true),[])
     const NewButtonRef = useRef(null)
    return (
        <CSSTransition
            in={s}
            classNames={'CCCNewButton'}
            timeout={1000}
            nodeRef={NewButtonRef}
            mountOnEnter
            unmountOnExit
        >
            <button onClick={click} ref={NewButtonRef}>{label}</button>
        </CSSTransition>
    );
}

export default CCCNewButton;