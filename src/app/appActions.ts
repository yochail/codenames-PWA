import { StateStore, AppConfig, GAME_TYPE_PLAYER, GAME_TYPE_OPERATOR } from "./store";
import { InitBoard } from "./boardActions";

export const GetInitAppState = ():AppConfig=>{
        return {
            gameType :GAME_TYPE_PLAYER
        }
    }
