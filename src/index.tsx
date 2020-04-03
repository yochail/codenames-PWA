import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store, StateStore } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createAction } from '@reduxjs/toolkit';
import { InitApp, InitBoard } from './app/InitAppAction';
import { appSlice, boardSlice } from './app/slices';

const state = InitBoard();

ReactDOM.render(
  
  <Provider store={store}>
    <App />
  </Provider>,
  
  document.getElementById('root')
);

store.dispatch(boardSlice.actions.initBoard(state));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
