import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App';
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";
import "jquery/dist/jquery.min.js"
import '../src/style/main.css';
import {  HashRouter } from 'react-router-dom';
import './i18n';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
     <App />
  </HashRouter>
);

