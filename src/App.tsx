import React from 'react';
import MainPage from "./Components/MainPage/MainPage";
import './style.css'
import './App.css'
import './MediaStyle.css'
import MenuComponent from "./Components/MenuComponent/MenuComponent";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
<div>

    <MenuComponent />
    <MainPage />
  <ToastContainer />
</div>
  );
}

export default App;
