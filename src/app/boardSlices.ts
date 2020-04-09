import { BoardState, GameCardState, StateStore, GAME_TYPE_PLAYER, CodenameChallange } from "./store";
import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import GameCard from "../GameCard";
import { createBoardCodeWordThunk, getOtherColor, Colors } from "./boardActions";
import { useDispatch } from "react-redux";

export const initialBoardState: BoardState = {
    cards: [],
    playingColor: 'Blue',
    codeNameWord: '',
    steps: [],
    blueScore: 0,
    redScore: 0,
    isTurnEnd:false,
    endGame:false
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
            const turnEnd = !success || state.steps.length + 1 === state.codeNameNumber;
            const blueScore = state.playingColor == Colors.Blue ? state.blueScore+scoreChange : state.blueScore
            const redScore = state.playingColor == Colors.Red ? state.redScore+scoreChange : state.redScore
            return {
                ...state,
                steps: [...state.steps, { success: success, word: card.text }],
                blueScore: blueScore,
                redScore: redScore,
                cards: state.cards.map(c => {
                    return {
                        ...c,
                        isColorVisible: c.idx == action.payload ? !c.isColorVisible : c.isColorVisible,
                        isLineThrough: c.idx == action.payload ? !c.isLineThrough : c.isLineThrough,
                    }
                }),
                isTurnEnd: turnEnd
            }
        },
        nextTurn: (state: BoardState, action: PayloadAction) => {
            const boardColor =getOtherColor(state.playingColor)
            return {
                ...state,
                codeNameWord: "",
                playingColor : boardColor,
                steps: [],
                isTurnEnd: false,
                requestPending: false,
                requestFailed: false,
                requestSuccess: false
            }
        },
        endGame: (state: BoardState, action: PayloadAction<string>) => {
            return {
                ...state,
                endGame:true,
                endGameCause:action.payload
            }
        }
    },

    extraReducers: builder => {
        builder.addCase(createBoardCodeWordThunk.fulfilled, (state, action: PayloadAction<CodenameChallange>) => {
            return {
                ...state,
                codeNameWord: action.payload.word,
                codeNameNumber: action.payload.number,
                requestPending: false,
                requestFailed: false,
                requestSuccess: true
            }

        }).addCase(createBoardCodeWordThunk.pending, (state, action: PayloadAction) => {
            return {
                ...state,
                requestPending: true,
                requestFailed: false,
                requestSuccess: false
            }
        }).addCase(createBoardCodeWordThunk.rejected, (state, action) => {
            console.log(action.error)
            return {
                ...state,
                requestPending: false,
                requestFailed: true,
                requestSuccess: false
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

