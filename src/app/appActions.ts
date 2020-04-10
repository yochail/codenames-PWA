import {  AppConfig, GAME_TYPE_PLAYER } from "./store";

export const GetInitAppState = ():AppConfig=>{
        return {
            gameType :GAME_TYPE_PLAYER
        }
    }
