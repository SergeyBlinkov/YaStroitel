import React, {useState} from 'react';

interface ButtonComponentType {
    id:string,
    name:string,
    classNames:string,
    icon?:string
}
const ButtonComponentId = ({id,name,classNames,icon}:ButtonComponentType) => {
    const [animateClass,setAnimateClass] = useState('')
    const makeAnimation = () => {
        setAnimateClass('animateClass')
        setTimeout(() =>{
            setAnimateClass('')
        },2000)
    }
    return (
        <div className={`${animateClass} ${classNames}`}>
            <i className={icon}></i>
            <a href={id} onClick={makeAnimation}>{name}</a>
        </div>
    );
};

export default ButtonComponentId;