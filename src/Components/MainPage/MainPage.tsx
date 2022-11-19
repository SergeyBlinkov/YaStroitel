import React from 'react';
import './MainPageStye.css';
import logoName from '../../MainImage/thatsitRED.svg'
//import MainPageText from "./MainPageText";
import Calculator from "../Calculator/Calculator";
import ModalList from "../Calculator/ModalResultWindow/ModalList";
//import {Button,styled} from "@mui/material";

const LogoComponent = () => {
   return <div className={'logoComponent'} >
       <a href={'/'}><img src={logoName} width={'70px'} height={'70px'} alt={'thatIt'}/></a>
        <p>Ваш строительный помощник</p>
    </div>
}

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
                <div className={'header-block'}>
                        <LogoComponent />
                        <ModalList />
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
                <div className={'footer-block'}>
                    <LogoComponent />
                    <p className={'footer_text'}>Номер по которому вы можете позвонить и заказать работу - <br/><span style={{fontSize:'15px',paddingTop:'5px'}}>8(927)716-68-42</span></p>
                </div>
            </footer>
        </div>
    );
};

export default MainPage;