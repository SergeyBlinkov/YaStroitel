import React, {useRef, useState} from 'react';
import {Button, Tooltip} from "@mui/material";
import {CSSTransition} from "react-transition-group";
import './style/CCCMoreInfo.css'
import CCCBigPicture from "./CCCBigPicture";

type Init = {
    name:string,
    description:string,
    img?:string[]
}

function CCCMoreInfo(init:Init) {
    const [show,setShow] = useState<boolean>(false)
    const [bigPicture,setBigPicture] = useState({show:false,img:''})
    const description = useRef(null)

    const ImgComponent = () => {
        return <div className={'CCCMoreInfo_img'}>
            {init.img && init.img.map((data,index)=>{

                return <div key={data} className={'CCCMoreInfo_img__item'}>
                    <img
                        src={data}
                        alt={`pic${index}`}
                        onClick={()=>setBigPicture({...bigPicture,show:true,img:data})}/>
                </div>})}
        </div>
    }

    return <>{!show && <Tooltip title={'Больше информации'}>
        <i className="fa-brands fa-audible" onClick={()=>setShow(true)}></i>
    </Tooltip>}
        <CSSTransition
            in={show}
            timeout={500}
            classNames={'CCC_description'}
            unmountOnExit
            mountOnEnter
            nodeRef={description}
        >
            <div className={'CCCMoreInfo '} ref={description}>
                <p className={'CCCMoreInfo_name'}>{init.name}</p>
                <p className={'CCCMoreInfo_description'}>{init.description}</p>
                <ImgComponent />
                <CCCBigPicture
                    bigPicture={bigPicture}
                    setBigPicture={setBigPicture}/>
                <Button color={'inherit'} onClick={()=>setShow(false)} className={'CCCMoreInfo_buttonBack'}>Назад</Button>
            </div>
        </CSSTransition>
        </>

}

export default CCCMoreInfo;