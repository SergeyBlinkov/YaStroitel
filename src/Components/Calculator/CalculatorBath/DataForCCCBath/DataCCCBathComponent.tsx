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
import ToiletInstallation from "../CalculatorBathComponents/ToiletInstallation/ToiletInstallation";
import AntiWaterComponent from "../CalculatorBathComponents/AntiWaterComponent/AntiWaterComponent";
import antiWaterFloor from './imgStorage/antiwaterFloor.jpg'
import ShowerStraight from './imgStorage/ShowerStraight.jpeg'
import ShowerSquare from './imgStorage/ShowerSquare1.jpg';
import ShowerCircle from './imgStorage/ShowerCircle1.jpg';
import ShowerWithCab from './imgStorage/ShowerWithCab.jpg';
import ShowerWithoutBorder from './imgStorage/ShowerWithoutBorder.jpg';
import ShowerComponent from "../CalculatorBathComponents/ShowerComponent/ShowerComponent";
import angle45 from './imgStorage/angle45.jpg';
import holeInTile from './imgStorage/holeInTile.jpg';
import linearMetres from './imgStorage/linearMetres.jpg';
import AngleComponent from "../CalculatorBathComponents/AdditionalTileItem/AngleComponent";
import HoleComponent from "../CalculatorBathComponents/AdditionalTileItem/HoleComponent";
import LinearMetresComponent from "../CalculatorBathComponents/AdditionalTileItem/LinearMetresComponent";
import BathRoomSink from "../CalculatorBathComponents/BathRoomSink/BathRoomSink";
import BathRoomSinkPic from './imgStorage/BathRoomSinkPic.jpg';
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
    component:<WallComponent />
}
    ,{
        type:'box',
        img:BOX,
        description: 'Стены из гипсокартона также имеют плюсы и минусы в отношении универсальности и практичности. Создавая из этого материала по каркасной технологии конструкцию,' +
            ' в ней можно без особого труда идеально скрыть элементы коммуникации.' +
            ' Трубы, проводка, вентиляционные каналы. Но опять-таки, при возникновении угрозы подтопления лучше использовать ГКЛВ листы.' +
            ' Они имеют отличительный признак – картон зеленого цвета.',
        label:'Закрыть коробом трубы',
        component: <BoxComponent />
    },{
        type:'bath',
        img:BOX_BATH,
        description: 'Экран из гипсокартона под ванной позволяет поверх него выложить плитку и тогда ваша ванна будет выглядеть как будто' +
            '"утоплена" в плитке, так же будет гармонично смотреться со стенами и полами вашей ванной комнаты.',
        label:'Экран под ванной',
        component: <BathComponent />
    }]

//TOILET DATA
export const CCCToiletData = [{
    type:'toilet',
    img:ToiletImg1,
    description: 'Напольный туалет ставится напол и представляет собой обычный туалет с бачком.',
    label: 'Напольный туалет',
    component: <ToiletInstallation type={'toilet'} />
},
    {
        type:'installation',
        img: installation1,
        description: 'Инсталяция - туалет в который отделение с бачком прячется за гипсокартоновым коробом, на видимой стороне ' +
            'остается только сама туалетная "чаша", вместо бачка будет кнопка разделенная на два, для мелкого слива и крупного',
        label: 'Инсталяция',
        component: <ToiletInstallation type={'installation'} />
    }
]
//Anti-Water
export const CCCAntiWaterData = [{
    type:'antiWater',
    img:antiWaterFloor,
    description:'Гидроизоляция полов необходима для того , что бы в случае протечки и затопления ванной комнаты' +
        ',вода, которая заполнила ванную комнату не уходила ниже по этажам и не затопила ваших соседей ниже',
    label:'Гидроизоляция помещения',
    component: <AntiWaterComponent/>
}
    ]
//Shower
export const CCCShowerData = [
    {
        type:'straight',
        img:ShowerStraight,
        description: 'Прямоугольный душевой поддон является моделью,' +
            ' которая позволяет создать в ванной простой, классический стиль',
        label: 'Прямой душ поддон',
        component: <ShowerComponent type={'straight'}/>
    },
    {
        type:'circle',
        img: ShowerCircle,
        description: 'Полукруглый душ поддон выглядит более необычно и возможно именно вам, понравится ' +
            'этот вариант больше классического, такой вариант зачастую занимает чуть меньше места в узких пространствах',
        label:'Полукруглый душ поддон',
        component: <ShowerComponent type={'circle'}/>
    },
    {
        type:'square',
        img: ShowerSquare,
        description: 'Квадртный душ поддон , наверное самый популярный вариант, достаточное место внутри душевой, так' +
            'же занимает мало места в ванной комнате и комфортен в эксплуатации',
        label: 'Квадратный душ поддон',
        component: <ShowerComponent type={'square'}/>
    },
    {
        type: 'withCab',
        img: ShowerWithCab,
        description: 'Покупная душевая кабина в основном обойдется вам дороже , но и хлопот с ней куда меньше',
        label: 'Душ кабина покупная(в основном акриловая)',
        component: <ShowerComponent type={'withCab'}/>
    },
    {
        type:'withoutBorder',
        img: ShowerWithoutBorder,
        description: 'Душевой поддон без бордюра, выглядит очень классно и наверное самый симпатичный вариант' +
            'на данный момент, но учтите слив должен быть ниже пола, а это значит уровень пола будет сильно завышен',
        label:'Душевая без бортов',
        component: <ShowerComponent type={'withoutBorder'}/>
    }
]

export const CCCAdditionalTileItemsData = [
    {
        type:'angle',
        img:angle45,
        description:'В вашей ванной(душевой) комнате скорее всего будут внешние углы, выберите ' +
            'какими вы хотите их видеть',
        label: 'Обработка внешних углов',
        component: <AngleComponent />
    },
    {
        type: 'hole',
        img: holeInTile,
        description: 'Отверстия в плитке неизбежны, эта работа занимает время у рабочего на вырезание' +
            'отверстий под необходимые сантехнические и электрические отверстия',
        label: 'Отверстия в плитке',
        component: <HoleComponent />
    },
    {
        type: 'linearMetres',
        img: linearMetres,
        description: 'В вашей ванной комнате возможно есть узкие участки стены(менее 30см)' +
            'на подрезку таких мест и выкладку уходит больше времени,пэтому данные участки считаются ' +
            'погонными метрами. Часто такие места есть в полках у душа, либо у двери вместо наличника',
        label:'Маленькие участки с плиткой(откосы)',
        component: <LinearMetresComponent />
    }
]

export const CCCBathRoomSinkData = [
    {
        type:'BathRoomSink',
        img:BathRoomSinkPic,
        description:'Установить раковину в вашей ванной(душевой) комнате',
        label:'Установка раковины',
        component:<BathRoomSink />
    }
]