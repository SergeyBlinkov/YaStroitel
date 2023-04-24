import React, { useRef } from 'react';
import { CustomButton } from '../../../ui_local/materialUi_Theme/mui_local_theme';
import './style/CCCTransition.css'
import './style/CCCNewButton.css'
import {toast} from "react-toastify";
type CCCNewButtonType = {
    bool?:boolean,
    label:string,
    click:() => {payload:any;type:string} | void
}

function CCCNewButton({label,click}:CCCNewButtonType) {
     const NewButtonRef = useRef(null)
    const handleClick = () => {
        click()
         return toast.success('Елемент добавлен в смету',)
    }
    return (
            <CustomButton onClick={handleClick} ref={NewButtonRef} className={'ButtonAddNewItem'}>{label}</CustomButton>
    );
}

export default CCCNewButton;