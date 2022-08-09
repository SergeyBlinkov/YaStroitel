import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../../Redux/ReduxConfigStore";
import {bathInstallation} from "../../../../../Redux/CalculatorBathSlice";
import './BathInstallation.css'
import CCCNewButton from "../../../CalculatorChooseComponent/CCCNewButton";
import {inPriceReducer} from "../../../../../Redux/calculatorChooseComponentSlice";

type BathInstallationType = {
    type:string
}

const BathData = [{
    type:'cast-iron',
    'benefits' : [
        'долго сохраняет воду теплой из-за большой толщины чугунной стенки',
        'прочность отливки и стойкость эмали к ударам, так как чугун не подвержен деформации',
        'легко очищается от загрязнений',
        'высокий срок службы',
        'низкий уровень шума при наполнении водой'],
    'limitations' : [
        'довольно тяжелая(от 65 до 170 кг)',
        'отсутствие разнообразия форм ввиду непластичности чугуна',
        'зачастую не имеет гидромассажа'
    ]
},
    {
        type:'acrylic',
        'benefits' : [
            'малый вес',
            'очень легкая в уходе, потому что акрил имеет водоотталкивающую поверхность,' +
            'а следовательно низкая пористость и грязь легко смывается обычной губкой и мылом',
            'низкий уровень шума при наполнении водой',
            'хорошая термоустойчивость',
            'хорошим сопротивлением к химическим воздействиям',
            'имеют множество форм и размеров, что подойдет в любой интерьер ванной комнаты',
            'есть возможность практически на любую акриловую ванну поставить дополнительные опции' +
            ' в виде гидро и аэромассажа, подсветки или хромотерапии, смесителя на борт ванны,' +
            ' подголовники и другой функционал.'
        ],
        'limitations' : [
            'боится очень высокой температуры',
            'на поверхности акриловой ванны появляются царапины',
            'на поверхности может появится грибок'
        ]
    },
    {
        type:'steel',
        'benefits' : [
            'Малый вес',
            'Устойчивость к перепадам температур',
            'Гигиеничность покрытия. В эмалевом покрытии практически отсутствуют поры, в которых может ' +
            'скапливаться грибок',
            'Долгий срок службы',
            'Невысокая цена'
        ],
        'limitations' : [
            'Низкая теплоизоляция означает, что в ваннах этого типа очень быстро' +
        ' остывает вода, так как у такого материала, как сталь, высокая теплопроводность',
        'Шум при наливании воды',
        'Чувствительное к коррозии покрытие',
        'Недостаточно толстые стенки могут деформироваться из-за большого веса человека. ' +
        'Подбирайте ванну правильно. Необходимо обращать особое внимание на толщину стальной ванны,' +
        ' а именно ее стенок, которые не должны прогибаться под вашим весом.',
        'Совет. Если хотите качественную ванну из стали, выбирайте вариант' +
        ' с толщиной стенок не менее 2,5-3,5 мм.']
    }]


function BathInstallation({type}:BathInstallationType) {
    const dispatch = useAppDispatch()
    const ChooseComponent = useAppSelector(state=>state.ChooseBathComponent)
    const ButtonChecker = ChooseComponent['bathType'].filter(data=>data.type === type && data.show).length === 0
    const handleChange = () => {
        dispatch(inPriceReducer({name:'bathType',type}))
        return dispatch(bathInstallation(type))
    }
    const descriptionBathItem = () => BathData.filter(data => data.type === type)

    return  <div className={'BathInstallation'}>
        {descriptionBathItem().map(data => (
            <div className={'ListOfItem'} key={data.type}>
                <ul className={'ListOfItem_benefits'}>
                    <p>Плюсы</p>
                    {data.benefits.map((benefits,index) => (
                        <div className={'ListOfItem_benefits__item'} key={index}>
                            <i className="fa-solid fa-angles-right"></i>
                            <li>{benefits}</li>
                    </div>
                        ))}
                </ul>
                <ul className={'ListOfItem_limitations'}>
                    <p>Минусы</p>
                    {data.limitations.map((limitations,index) => (
                        <div className={'ListOfItem_limitations__item'} key={index}>
                        <i className="fa-solid fa-angles-right"></i>
                        <li>{limitations}</li>
                    </div>))}
                </ul>
            </div>
        ))}
        <CCCNewButton bool={ButtonChecker} label={'Установить эту ванну'} click={handleChange}/>
    </div>
}

export default BathInstallation;