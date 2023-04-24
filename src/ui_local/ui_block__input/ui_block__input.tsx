import React, {useEffect, useRef, useState} from 'react';
import './ui_block__input.css';
import {I_UI_Block__input} from "./ui_block__input-type";

const UiBlockInput = ({label}:I_UI_Block__input) => {
    const [active,setActive] = useState<boolean>(false)
    const refInput = useRef<HTMLInputElement | null>(null)
    const labelRef= useRef<HTMLLabelElement | null>(null)
    const legendRef= useRef<HTMLLegendElement | null>(null)
    const uiBlockRef = useRef<HTMLDivElement | null>(null)
    const handleListenerClick = (e:any) => {
        if(!uiBlockRef.current?.contains(e.target) && refInput.current?.value.length === 0) {
            setActive(false)
            legendRef.current!.style.maxWidth = '0px'
        }
    }
    const handleFocus = () => {
        if(!active) {
            setActive(true)
            if(!legendRef.current) {
                return
            }
            legendRef.current!.style.maxWidth = `${labelRef.current!.clientWidth}px`
        }
    }
    useEffect(() => {
        refInput.current?.addEventListener('focus',handleFocus)
        document.addEventListener('click',handleListenerClick)
        return () => {
            refInput.current?.removeEventListener('focus',handleFocus)
            document.removeEventListener('click',handleListenerClick)
        }
    },[])
    const handleClick = () => {
        refInput.current?.focus()
    }
    return (
        <div className={'UiBlock-input'} ref={uiBlockRef} onClick={handleClick}>
            <label ref={labelRef} className={`UiBlock-input__label ${active && 'UiBlock-input__active'}`}>Это label</label>
            <input ref={refInput} className={`UiBlock-input__input ${!active && 'UiBlock-input__activeInput'}`}/>
            <fieldset aria-hidden={true} className={'fieldset'} onClick={handleClick}>
                <legend ref={legendRef} className={'input_legend'}><span>{label}</span></legend>
            </fieldset>
        </div>
    );
};

export default UiBlockInput;