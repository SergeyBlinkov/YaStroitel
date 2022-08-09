import castIron1 from "../CalculatorBathComponents/BathInstallation/img/castironBath1.jpg";
import BathInstallation from "../CalculatorBathComponents/BathInstallation/BathInstallation";
import acrylic1 from "../CalculatorBathComponents/BathInstallation/img/acrilic1.jpg";
import steelBath from "../CalculatorBathComponents/BathInstallation/img/steelBath.jpg";
import React from "react";
import WALL from "../../DryWallComponent/img/Wall.jpg";
import WallComponent from "../../DryWallComponent/WallComponent/WallComponent";
import BOX from "../../DryWallComponent/img/box.jpg";
import BoxComponent from "../../DryWallComponent/BoxComponent/BoxComponent";
import BOX_BATH from "../../DryWallComponent/img/boxBath.jpg";
import BathComponent from "../../DryWallComponent/BathComponent/BathComponent";
import ToiletImg1 from '../CalculatorBathComponents/ToiletInstallation/img/toiletImg.jpg'
import installation1 from '../CalculatorBathComponents/ToiletInstallation/img/installation.jpg'

//BATH DATA
export const CCCBathData = [{
    type:'cast-iron',
    img:castIron1,
    description:'Чугунная ванна представляет собой чаще всего прямоугольную или овальную чашу' +
        ' для наполнения водой с выпускным и переливным отверстиями,' +
        ' край ванны имеет борта различной ширины в зависимости от модели.' +
        ' Внутренняя поверхность чугунной ванны покрыта стекловидной силикатной эмалью стойкой' +
        ' к щелочам и истиранию.',
    label:'Чугунная ванна',
    component: <BathInstallation type={'cast-iron'} />
},
{
    type:'acrylic',
        img:acrylic1,
    description:'Акриловая ванна изготавливается из акрилового листа толщиной от 4 до 8 мм и' +
' армирующего слоя, предназначенного для усиления прочности изделия.' +
' Толщина акриловой ванны составляет 7-10 мм.' +
'На ванны эконом сегмента, используется акриловый лист толщиной 3-4 мм, на другие ванны 5-6 мм.',
    label:'Акриловая ванна',
    component: <BathInstallation type={'acrylic'}/>
},
{
    type:'steel',
        img:steelBath,
    description:'Стальная ванна с ножками изготовлена из листовой стали,' +
' покрытой белой эмалью. Для отвода воды предусмотрены переливное и 50-миллиметровое' +
' сливное отверстия.' +
' Подходят для любых ванных комнат, в том числе малогабаритных.' +
' Высота двух комплектных ножек в районе 15 см.',
    label:'Стальная ванна',
    component: <BathInstallation type={'steel'}/>
}]

//DRY WALL DATA
export const CCCDryWallData = [{
    type:'wall',
    img:WALL,
    description:'Гипсокартон – недорогой стройматериал, применяющийся для обшивки стен и потолка.' +
        ' Это удобный вариант для создания межкомнатных перегородок. Методика в популярна и главное – проста.' +
        ' Гипсокартон создаёт между собой "пустую прослойку" , которую можно забить звуко(тепло)изоляцией',
    label:'Установка стены из гипсокартона',
    component:<WallComponent name={'dryWall'} type={'wall'} />
}
    ,{
        type:'box',
        img:BOX,
        description: 'Стены из гипсокартона также имеют плюсы и минусы в отношении универсальности и практичности. Создавая из этого материала по каркасной технологии конструкцию,' +
            ' в ней можно без особого труда идеально скрыть элементы коммуникации.' +
            ' Трубы, проводка, вентиляционные каналы. Но опять-таки, при возникновении угрозы подтопления лучше использовать ГКЛВ листы.' +
            ' Они имеют отличительный признак – картон зеленого цвета.',
        label:'Закрыть коробом трубы',
        component: <BoxComponent name={'dryWall'} type={'box'} />
    },{
        type:'bath',
        img:BOX_BATH,
        description: 'Экран из гипсокартона под ванной позволяет поверх него выложить плитку и тогда ваша ванна будет выглядеть как будто' +
            '"утоплена" в плитке, так же будет гармонично смотреться со стенами и полами вашей ванной комнаты.',
        label:'Экран под ванной',
        component: <BathComponent name={'dryWall'} type={'bath'}/>
    }]

//TOILET DATA
export const CCCToiletData = [{
    type:'toilet',
    img:ToiletImg1,
    description: '',
    label: 'Напольный туалет',
    component: ''
},
    {
        type:'installation',
        img: installation1,
        description: '',
        label: 'Инсталяция',
        component: ''
    }
]