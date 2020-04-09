import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { StateStore, BoardState, GameCardState, GAME_TYPE_PLAYER, GAME_TYPE_OPERATOR, CodenameChallange } from "./store";
import Words from "./words-he";

// const askCodeName = async (words:string[]) =>{
//     const data = {
//         words,
//         text: this.inputRef.current.value,
//         number: this.sliderRef.current.state.value,
//     };

//     if (data.text) {
//         await this.quaryServer('findcodesfromwords', data);
//     }
// }
//const codenamesHost = "https://codenames-app.azurewebsites.net"
const codenamesHost = " http://127.0.0.1:5000"
//const codenamesHost = " http://127.0.0.1:8080"

const createBoardCodeWord = async (cards: GameCardState[], boardColor: string,codeWordNumber:number) => {
    const positiveWords = cards.filter(c => c.color === boardColor && c.isLineThrough != true).map(ws => ws.text);
    const negativeWords = cards.filter(c => c.color !== boardColor && c.isLineThrough != true).map(ws => ws.text);
    const data = {
        'negative': negativeWords,
        'positive': positiveWords,
        number: codeWordNumber,
    };

    return await quaryServer('findwordsforcodes', data);
}

const quaryServer = async (endpoint: string, data: object) => {
    const url = `${codenamesHost}/${endpoint}`;
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}


const shuffle = (array: any[]) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// First, create the thunk
export const createBoardCodeWordThunk = createAsyncThunk(
    'board/createBoardCodeWord',
    async (state:Partial<BoardState>):Promise<CodenameChallange> => {
        const response = await createBoardCodeWord(state.cards!,state.playingColor!,state.codeNameNumber ?? 3)
        console.log(response)
        return {
            word:response[0],
            number:response[1].length
        }
    }
)

export const Colors = {
    Red : 'Red',
    Blue : 'Blue',
    Beige : 'Beige',
    Black : 'Black',
}

export const getOtherColor = (currentColor:string)=>{
    return currentColor == Colors.Red ? Colors.Blue : Colors.Red;
}


export const InitBoard = (gameType:string):Partial<BoardState> => {
    let colors = Array(8).fill(Colors.Red)
        .concat(Array(9).fill(Colors.Blue))
        .concat(Array(7).fill(Colors.Beige))
        .concat(Array(1).fill(Colors.Black));

    colors = shuffle(colors);
    let words = [];
    words = shuffle(Words);

    const isOperatorGameType = gameType === GAME_TYPE_OPERATOR;
    words = words.slice(0, 25);
    const wordsState = words.map((t, i) => <GameCardState>(
        {
            idx: i,
            text: t,
            color: colors.pop(),
            isLineThrough: false,
            isColorVisible: isOperatorGameType,
        }));

    return {
        cards: wordsState,
        playingColor: Colors.Blue
    }
}