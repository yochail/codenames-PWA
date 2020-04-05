import { BoardState, GameCardState, StateStore, GAME_TYPE_PLAYER, CodenameChallange } from "./store";
import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import GameCard from "../GameCard";
import { createBoardCodeWordThunk } from "./boardActions";

export const initialBoardState: BoardState = {
    cards: [],
    playingColor: 'Blue',
    codeNameNumber: 0,
    codeNameWord:'',
    steps: [],
    score:0
};

export const boardSlice = createSlice({
    name: 'board',
    initialState: initialBoardState,
    reducers: {
        initBoard: (state: BoardState, action: PayloadAction<Partial<BoardState>>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        flipCard: (state: BoardState, action: PayloadAction<number>) => {
            const card = state.cards[action.payload];
            const success = card.color === state.playingColor
            const scoreChange = success ? (state.steps.length * 2 + 1) : 0;
            return {
                ...state,
                score: state.score + scoreChange,
                steps: [...state.steps, { success: success, word: card.text }],
                cards: state.cards.map(c => {
                    return {
                        ...c,
                        isColorVisible: c.idx == action.payload ? !c.isColorVisible : c.isColorVisible,
                        isLineThrough: c.idx == action.payload ? !c.isLineThrough : c.isLineThrough,
                    }
                })
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(createBoardCodeWordThunk.fulfilled, (state, action: PayloadAction<CodenameChallange>) => {
            return {
                ...state,
                codeNameWord: action.payload.word,
                codeNameNumber: action.payload.number,
                requestPending: false,
                requestFailed: false
            }

        }).addCase(createBoardCodeWordThunk.pending, (state, action: PayloadAction) => {
            return {
                ...state,
                requestPending: true,
                requestFailed: false
            }
        }).addCase(createBoardCodeWordThunk.rejected, (state, action) => {
            console.log(action.error)
            return {
                ...state,
                requestPending: false,
                requestFailed: true
            }
        })
    }

})

// const initialGameCardState: GameCardState = {}

// export const cardSlice = createSlice({
//     name: 'gameCard',
//     initialState: initialGameCardState,
//     reducers: {

//     }
// })

