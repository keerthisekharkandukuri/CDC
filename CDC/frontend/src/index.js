import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import Register from './Student/Register';
import RegData from './Faculty/RegData';
import Home from "./Home";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   {/* <App /> */}
   {/* <Register />
  <RegData /> */}
  <Home />
  {/* <Lab2 /> */}
  </BrowserRouter>
   
);


