import { BoardState, CodenameChallange } from "./store";
import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { createBoardCodeWordThunk, getOtherColor, Colors, initialBoardState } from "./boardActions";



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
            const turnEnd = !success || state.steps.length + 1 === state.codeNameNumber;
            // TODO for one player
            //const scoreChange = success ? (state.steps.length * 2 + 1) : 0;
            // const blueScore = state.playingColor == Colors.Blue ? state.blueScore+scoreChange : state.blueScore
            // const redScore = state.playingColor == Colors.Red ? state.redScore+scoreChange : state.redScore
            const blueScore = card.color == Colors.Blue ? state.blueScore+1 : state.blueScore
            const redScore = card.color == Colors.Red ? state.redScore+1 : state.redScore
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

