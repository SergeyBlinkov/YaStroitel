import React from 'react';
import CCC from "../CalculatorChooseComponent/CCC";
import WALL from './img/Wall.jpg'
import BOX from './img/box.jpg'
import BOX_BATH from './img/boxBath.jpg'
import {useAppSelector} from "../../../Redux/ReduxConfigStore";
import BathComponent from "./BathComponent/BathComponent";

const data = [{
        type:'wall',
        img:WALL,
        description:'Необходима целая стена?',
        label:'Установка стены из гипсокартона'
}
,{
        type:'box',
        img:BOX,
        description: 'Закрыть коробом трубы?',
        label:'Закрыть коробом трубы'
},{
        type:'bath',
        img:BOX_BATH,
        description: 'Экран из гипсокартона под ванной?',
        label:'Экран под ванной'
}]

function DryWall({dryWall} : {dryWall:boolean}) {
    const ChooseComponent = useAppSelector(state=>state.ChooseBathComponent)

    const filtered = ChooseComponent.dryWall.filter(data => data.show)[0]||[]
    const FilteredArray = () => {
        if(filtered.type === 'bath') {
            return <BathComponent name={'dryWall'} type={'bath'}/>
        }
    }

    return (
        <div className="dryWall">
            <CCC variable={data} bool={dryWall} name={'dryWall'}/>
            {filtered.show && FilteredArray()}
        </div>

    );
}

export default DryWall;