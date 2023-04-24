import React from 'react';
import './CalculatorBathStyle.css'
import CeramicSizeBlock from "./CalculatorBathComponents/CeramicSizeBlock/CeramicSizeBlock";
import CalculatorMetres from "./CalculatorBathComponents/CalculatorMetres";
// import {useAppSelector} from "../../../Redux/ReduxConfigStore";
// import {BathCalcType} from "./BathType";
import СCCBathStorage from "./DataForCCCBath/СССBathStorage";
import {ThemeProvider} from "@mui/material";
import {theme} from "../../../ui_local/materialUi_Theme/mui_local_theme";
//import ChooseStage1 from './CalculatorBathComponents/imgStore/chooseStage1.jpg'
//import ChooseStage2 from './CalculatorBathComponents/imgStore/chooseStage2.jpg'
// import NavigateBathComponent from "./NavigateBathComponent/NavigateBathComponent";
//  import {useAppSelector} from "../../../Redux/ReduxConfigStore";
//  import {BathCalcType} from "./BathType";

// const init = {
//     firstStage: {type: 'firstStage', show: false},
//     secondStage: {type: 'secondStage', show: false},
//     show:false
// }
// const stageStore = [
//     {
//         type: 'firstStage',
//         img: ChooseStage1,
//         description: 'В этом случае вам необходимы будут дополнительные работы в виде:' +
//             'Проводки электрики в помещении, Разводка сантехники, оштукатуривание поверхностей и' +
//             'финишная подготовка под плитку'
//     },{
//         type: 'secondStage',
//         img: ChooseStage2,
//         description:'В этом случае вы можете приступать к выбору плитки и установки сантехнического' +
//             'оборудования'
//
//     }
//     ]
const CalculatorBath = () => {

       // const BathCalc: BathCalcType = useAppSelector(state => state.CalculatorBath)
       // console.log(BathCalc)
    //const [stage, setStage] = useState(init)
    // const handleClickStage = (name:string) => {
    //
    //     if(name === 'firstStage') console.log('temporary didnt work')
    //         // setStage({...stage,show:true,firstStage: {
    //         // ...stage.firstStage,
    //         //     show:!stage.firstStage.show
    //         // }})
    //     else setStage({...stage,secondStage: {
    //         ...stage.secondStage,
    //             show:true
    //         }})
    // }
    return (
        <div className={'calculatorBath'}>
            <ThemeProvider theme={theme}>
                <CalculatorMetres/>
                {/*{!stage.secondStage.show && <div className={'ChooseStageComponent'}>*/}
                {/*    <h2 className={'ChooseStageComponent__head'}>Как выглядит ваша ванная комната?</h2>*/}
                {/*    {stageStore.map((data) => (*/}
                {/*        <div key={data.type} className={'ChooseStageComponent_item'} onClick={()=>handleClickStage(data.type)}>*/}
                {/*            <h2>{data.type === 'firstStage' ?*/}
                {/*                'Голые стены без штукатурки и проводки труб'*/}
                {/*                :*/}
                {/*                'Стены оштукатурены и проведена электрика, сантехника'}*/}
                {/*            </h2>*/}
                {/*            <p>{data.description}</p>*/}
                {/*            <img  src={data.img} alt={`pic${data.type}`}/>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>}*/}
                {/*{(stage.secondStage.show) &&*/}
                <CeramicSizeBlock/>
                <СCCBathStorage/>
            </ThemeProvider>


        </div>
    );
};

export default CalculatorBath;