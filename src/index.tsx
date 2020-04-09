import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { InitBoard, createBoardCodeWordThunk } from './app/boardActions';
import {boardSlice } from './app/boardSlices';
//import { GAME_TYPE_PLAYER } from './app/store';
import { configSlice } from './app/appSlices';
import { GetInitAppState as GetAppConfig } from './app/appActions';

const reducer = combineReducers({
  board: boardSlice.reducer,
  config: configSlice.reducer,
})

export const store = configureStore({
  reducer:reducer
})

ReactDOM.render(
  
  <Provider store={store}>
    <App />
  </Provider>,
  
  document.getElementById('root')
);

const appConfig = GetAppConfig()
store.dispatch(configSlice.actions.setConfig(appConfig));
const board = InitBoard(appConfig.gameType)
store.dispatch(boardSlice.actions.initBoard(board));
//store.dispatch(createBoardCodeWordThunk(board));
//store.dispatch(createBoardCodeWordThunk(board));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
