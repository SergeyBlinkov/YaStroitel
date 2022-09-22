import React, {Dispatch,SetStateAction, useRef} from 'react';
import {Button} from "@mui/material";
import {CSSTransition} from "react-transition-group";


type Props = {
    bigPicture:{show:boolean,img:string},
    setBigPicture:Dispatch<SetStateAction<{show:boolean,img:string}>>
}

function CCCBigPicture({bigPicture,setBigPicture}:Props) {
    const bigPictureRef = useRef(null)
    return (
        <CSSTransition
            in={bigPicture.show}
            timeout={500}
            classNames={'CCCMoreInfo_BigPicture'}
            nodeRef={bigPictureRef}
            mountOnEnter
            unmountOnExit
        >
            <div
                ref={bigPictureRef}
                className={'darkBackground'}>
                <div className={'CCCBigPicture'}>
                    <img src={bigPicture.img} alt={`bigPicture`}/>
                    <Button
                        variant="outlined"
                        onClick={() => setBigPicture((prevState) =>
                                ({...prevState,show:false}))}>
                        скрыть
                    </Button>
                </div>
            </div>
        </CSSTransition>
    );
}

export default CCCBigPicture;