import React, {useRef} from 'react';
import {useAppSelector} from "../../../../Redux/ReduxConfigStore";
import {CSSTransition} from "react-transition-group";

function BoxComponent({name,type} : {name:string,type:string}) {
    const bathSelector = useAppSelector(state=>state.ChooseBathComponent)
    const nodeRef = useRef(null)
    const transitionBoolean =
        bathSelector.dryWall.filter((data) => data.type === type)[0].show
    return (
        <CSSTransition
            in={transitionBoolean}
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