import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"

import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import OuterClickExample from "./ComponentsExa/OuterClickExample.js"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
   <ToastContainer/>
   <App />
  </Provider>
  </BrowserRouter>
  </React.StrictMode>
);
