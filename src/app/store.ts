import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { boardSlice, appSlice, cardSlice } from './slices';

export interface GameCardState {
  idx: number;
  color: string,
  text: string,
  isUpsideDown: boolean
  isLineThrough: boolean
}

export interface BoardState {
  cards: GameCardState[]
}

export interface StateStore{
  board:BoardState
}

const reducer = combineReducers({
  board: boardSlice.reducer,
  app: appSlice.reducer,
  card: cardSlice.reducer
})

export const store = configureStore({
  reducer:reducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
