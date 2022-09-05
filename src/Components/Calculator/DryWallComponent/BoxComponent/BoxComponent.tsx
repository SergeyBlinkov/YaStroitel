import React, {useRef} from 'react';
import {CSSTransition} from "react-transition-group";

function BoxComponent({name,type} : {name:string,type:string}) {
    const nodeRef = useRef(null)
    return (
        <CSSTransition
            in={true}
            timeout={500}
            nodeRef={nodeRef}
            classNames={'boxComponent'}
            unmountOnExit
            mountOnEnter
        >
        <div ref={nodeRef}
            className={'calculatorChooseComponent_item__openedComponent'}>
            BOX
        </div>
        </CSSTransition>
    );
}

export default BoxComponent;