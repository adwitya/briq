import React, {Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params'
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './core/components/BRIQAuthorization/BRIQAuth';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Fragment>
    <App />
  </Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
