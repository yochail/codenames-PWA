import {  GAME_TYPE_PLAYER, AppConfig } from "./store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initailAppState: AppConfig = {
        gameType:GAME_TYPE_PLAYER
}

export const configSlice = createSlice({
    name: 'app',
    initialState: initailAppState,
    reducers: {
        setConfig: (state: AppConfig, action: PayloadAction<AppConfig>) => {
            return {
                ...action.payload
            }
        }
    }
})