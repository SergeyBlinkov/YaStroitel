import React from 'react';
import CCC from "../CalculatorChooseComponent/CCC";
import WALL from './img/Wall.jpg'
import BOX from './img/box.jpg'
import BOX_BATH from './img/boxBath.jpg'
import BathComponent from "./BathComponent/BathComponent";
import WallComponent from "./WallComponent/WallComponent";
import BoxComponent from "./BoxComponent/BoxComponent";

const data = [{
        type:'wall',
        img:WALL,
        description:'Необходима целая стена?',
        label:'Установка стены из гипсокартона',
        component:<WallComponent name={'dryWall'} type={'wall'} />
}
,{
        type:'box',
        img:BOX,
        description: 'Закрыть коробом трубы?',
        label:'Закрыть коробом трубы',
        component: <BoxComponent name={'dryWall'} type={'box'} />
},{
        type:'bath',
        img:BOX_BATH,
        description: 'Экран из гипсокартона под ванной?',
        label:'Экран под ванной',
        component: <BathComponent name={'dryWall'} type={'bath'}/>
}]


function DryWall({dryWall} : {dryWall:boolean}) {

    return (
        <div className="dryWall">
            <CCC variable={data} bool={dryWall} name={'dryWall'}/>
        </div>

    );
}

export default DryWall;