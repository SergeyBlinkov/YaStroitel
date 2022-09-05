import React, {useRef} from 'react';
import {CSSTransition} from "react-transition-group";

function WallComponent({name,type}: {name:string,type:string}) {
    const nodeRef = useRef(null)

    return (
        <CSSTransition
            in={true}
            timeout={500}
            classNames={'wallComponent'}
            unmountOnExit
            mountOnEnter
            nodeRef={nodeRef}
        >
        <div ref={nodeRef} className={'calculatorChooseComponent_item__openedComponent'}>
            WALL COMpoentn
        </div>
        </CSSTransition>
    );
}

export default WallComponent;