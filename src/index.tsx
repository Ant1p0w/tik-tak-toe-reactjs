import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {TicTacToe} from './components/TicTacToe';

ReactDOM.render(
    <React.StrictMode>
        <TicTacToe/>
    </React.StrictMode>,
    document.getElementById('root')
);
