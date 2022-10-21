import React from 'react';
import './MainPageStye.css';
import logoName from '../../MainImage/thatsitRED.svg'
//import MainPageText from "./MainPageText";
import Calculator from "../Calculator/Calculator";
//import {Button,styled} from "@mui/material";



const MainPage = () => {
    // const arrOption = ['','Ванна','Гостинная','Кухня','Корридор']
    // const WhiteButton = styled(Button)({
    //         color: 'white',
    //         '&:hover': {
    //             background: 'gray'
    //         }
    //     }
    // )
    return (
        <div className={'main-page'}>
            <header className={'header'}>
                <div className={'header_logo'}>
                    <img src={logoName} width={'70px'} height={'70px'} alt={'thatIt'}/>
                    <p>ЯStroitel</p>
                </div>
                {/*<ul className={'header_menu'}>*/}
                {/*    <WhiteButton>Главная</WhiteButton>*/}
                {/*    <WhiteButton>Калькулятор</WhiteButton>*/}
                {/*    <WhiteButton>Работы</WhiteButton>*/}

                {/*</ul>*/}
                {/*<div className={'header_profile'}>*/}
                {/*    <WhiteButton>Зарегистрироваться</WhiteButton>*/}
                {/*    <WhiteButton>Войти</WhiteButton>*/}
                {/*</div>*/}
            </header>
            {/*<MainPageText />*/}
            <div className={'calculator-open'}>
                {/*<h1>Выберите комнату в которой вы хотите ремонт:</h1>*/}
                {/*<select>{arrOption.map((data, index)=><option key={index}>{data}</option>)}</select>*/}
                <Calculator />
            </div>

            <footer className={'footer'}>
                <div className={'header_logo'}>
                    <img src={logoName} width={'70px'} height={'70px'} alt={'thatIt'}/>
                    <p>ЯStroitel</p>
                    <p>Номер по которому вы можете позвонить и заказать работу - 8(927)716-68-42</p>
                </div>
            </footer>
        </div>
    );
};

export default MainPage;