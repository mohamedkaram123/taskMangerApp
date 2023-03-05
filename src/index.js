import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "line-awesome/dist/font-awesome-line-awesome/css/all.css";
import "line-awesome/dist/line-awesome/css/line-awesome.css";
import "./assets/scss/style.scss";
import './assets/css/index.css';
import './assets/css/bootstrap.css';

import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import Loader from "./layouts/admin/loader/Loader";
import Admin from "./MainComponentRouter/Admin";
import { store } from "./redux/app/store";
import { Provider } from 'react-redux';
import App from "./MainComponentRouter/App";


ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <HashRouter>
    <Provider store={store}>
      <Admin />
      <App />
      
    </Provider>
    </HashRouter> 
  </Suspense>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
