import React, {useRef} from 'react';
import {useAppSelector} from "../../../../Redux/ReduxConfigStore";
import {CSSTransition} from "react-transition-group";

function WallComponent({name,type}: {name:string,type:string}) {
    const bathSelector = useAppSelector(state=>state.ChooseBathComponent)
    const nodeRef = useRef(null)
    const transitionBoolean =
        bathSelector.dryWall.filter((data) => data.type === type)[0].show
    return (
        <CSSTransition
            in={transitionBoolean}
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