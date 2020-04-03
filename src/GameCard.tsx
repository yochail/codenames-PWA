import React from 'react';
import { Card, Typography, Grid } from '@material-ui/core';
import { GameCardState, StateStore } from './app/store';
import { useSelector } from 'react-redux';
import { boardSlice, cardSlice } from './app/slices';

interface GameCardProp {
  idx:number
}


const mapStateToProps = (state:StateStore,idx:number):GameCardState => {
  return state.board.cards[idx];
}

const GameCard = ({idx}:GameCardProp) => {
  const state = useSelector((state:StateStore) => mapStateToProps(state,idx));

  const cardStile = {
    width: '17vw',
    borderWidth: 'thick',
    height: '7vw',
    padding: '0vw',
    margin: '0.5vw',
    backgroundColor: state.color,
    fontSize: '1vw',
    color: state.color === 'Beige' ? 'Black' : 'White',
    textDecoration: state.isLineThrough ? 'line-through' : 'none',
  };
  return (
    <Grid item>
      <Card
        className="align-items-center justify-content-center"
        onClick={() => cardSlice.actions.flipCard()}
        raised={true}
        style={cardStile}
      >
        <Typography variant="h5" component="h2">
          {state.text}
        </Typography>
      </Card>
    </Grid>
  );
}

export default GameCard;