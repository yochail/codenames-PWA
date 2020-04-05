import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { boardSlice } from './boardSlices';

export interface GameCardState {
  idx?: number;
  color?: string,
  text: string,
  isColorVisible?: boolean
  isLineThrough?: boolean
}
export interface PlayerStep{
  word: string,
  success: boolean
}

export interface BoardState {
  playingColor: string,
  cards: GameCardState[],
  codeNameWord: string,
  codeNameNumber: number,
  requestPending?: boolean,
  requestFailed?: boolean,
  steps: PlayerStep[],
  score:number
}

export const GAME_TYPE_PLAYER = 'PLAYER';
export const GAME_TYPE_OPERATOR = 'OPERATOR';
export interface AppConfig{
  gameType:string
}

export interface StateStore{
  board?:BoardState
  config:AppConfig
}

export interface CodenameChallange{
  word:string,
  number:number
}