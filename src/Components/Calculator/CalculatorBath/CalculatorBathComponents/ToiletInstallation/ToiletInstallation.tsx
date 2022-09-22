import React from 'react';
import CCCNewButton from "../../../CalculatorChooseComponent/CCCNewButton";
import {useAppDispatch} from "../../../../../Redux/ReduxConfigStore";
import {toiletInstallation} from "../../../../../Redux/CalculatorBathSlice";
import {ListOfBenefitAndLimit} from "../../../../helperComponent/helperComponent";


type TypeProps = {
    type:string
}
const toiletData = {
    benefits : ['Легок в обслуживании','Более доступная цена','Может выдерживать более высокие нагрузки(кг)'],
    limitations: ['Виден бачок унитаза','Иногда может занять чуть больше места']
}
const installationData = {
    benefits: ['Отсутствие бачка для слива(он спрятан за стеной)','Отличный внешний вид, ничего лишнего',
        'Удобные кнопки для слива','Занимает меньше эффективного места'],
    limitations: ['Более дорогой вариант','Более тяжелый в обслуживании',
        'Если некуда спрятать бачок и саму инсталяцию в стену, может занимать больше места чем напольный']
}
function ToiletInstallation({type}:TypeProps) {
    const dispatch = useAppDispatch()
    const handleChange = () => dispatch(toiletInstallation(type))
    const ToiletDiv = () => {
        return (<div className={'ToiletInstallation'}>
            <ListOfBenefitAndLimit benefits={toiletData.benefits} limitations={toiletData.limitations}/>
        </div>)
    }
    const InstallationDiv = () => {
        return (<div className={'Installation'}>
            <ListOfBenefitAndLimit benefits={installationData.benefits} limitations={installationData.limitations}/>
        </div>)
    }
    return (
    type === 'toilet' ? <>
        <ToiletDiv />
        <CCCNewButton label={'Добавить туалет в смету'} click={handleChange} />
    </> : <>
        <InstallationDiv />
        <CCCNewButton label={'Добавить инсталяцию в смету'} click={handleChange} />
    </>
    );
}

export default ToiletInstallation;