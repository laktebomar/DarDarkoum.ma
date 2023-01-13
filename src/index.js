import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router} from "react-router-dom";
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ContextProvider } from './contexts/ContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
      <App />
    </ContextProvider>
  
);

window.React1 = require('react');


