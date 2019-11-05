import "./index.css";

import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './utils/theme';
import { HashRouter as Router } from "react-router-dom";
import { App } from './App';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
            <App />
        </Router>
    </ThemeProvider>,
    document.querySelector('#root'),
);