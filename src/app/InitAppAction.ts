import { createAction } from "@reduxjs/toolkit";
import { StateStore, BoardState, GameCardState } from "./store";
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

// const createCode = async () =>{
//     const { wordsState } = this.state;

//     const positiveWords = wordsState.filter(ws => ws.color === color).map(ws => ws.text);
//     const negativeWords = wordsState.filter(ws => !positiveWords.includes(ws.text)).map(ws => ws.text);
//     const data = {
//         'negative': negativeWords,
//         'positive': positiveWords,
//         number: this.sliderRef.current.state.value,
//     };

//     if (data.text) {
//         await this.quaryServer('findwordsforcodes', data);
//     }
// }

// const quaryServer = async (endpoint:string,data:object) =>{
//     const url = `https://codenames-app.azurewebsites.net/${endpoint}`;
//     // const url = `http://127.0.0.1:5000/${endpoint}`;
//     const response = await fetch(url, {
//         method: 'POST',
//         mode: 'cors', // no-cors, *cors, same-origin
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: { 'Content-Type': 'application/json' },
//         referrerPolicy: 'no-referrer', // no-referrer, *client
//         body: JSON.stringify(data),
//     });
//     const selectedWords = await response.json();
//     this.setState({ selectedWords: selectedWords, isLoading: false });
// }

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


export const InitBoard = () => {
    let colors = Array(8).fill('Red')
        .concat(Array(9).fill('Blue'))
        .concat(Array(7).fill('Beige'))
        .concat(Array(1).fill('Black'));

    colors = shuffle(colors);
    let words = [];
    words = shuffle(Words);


    words = words.slice(0, 25);
    const wordsState = words.map((t, i) => <GameCardState>(
        {
            idx: i,
            text: t,
            color: colors.pop(),
            isLineThrough: false,
            isUpsideDown: false,
            isColorVisable: false
        }));

    return {
        cards:wordsState
    }
}


// init app script
export const InitApp = () => <StateStore>{
    board: InitBoard()
}
