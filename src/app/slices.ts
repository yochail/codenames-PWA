import { BoardState, GameCardState, StateStore } from "./store";
import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import GameCard from "../GameCard";

const initialBoardState: BoardState = {
    cards: []
};

export const boardSlice = createSlice({
    name: 'board',
    initialState: initialBoardState,
    reducers: {
        initBoard: (state: BoardState, action: PayloadAction<BoardState>) => { return { ...action.payload } }
    },

})

const initialGameCardState: GameCardState = {
    color: "Beige",
    idx: -1,
    isLineThrough: false,
    isUpsideDown: true,
    text: ""
}

export const cardSlice = createSlice({
    name: 'gameCard',
    initialState: initialGameCardState,
    reducers: {
        flipCard: (state: GameCardState, action: PayloadAction) => {
            return {
                ...state,
                isUpsideDown: !state.isUpsideDown
            }
        }
    }
})

const initailAppState:StateStore = {
    board: initialBoardState
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initailAppState,
    reducers: {
        initApp: (state: StateStore, action: PayloadAction<StateStore>) => {
            return {
                ...action.payload
            }
        }
    }
})
