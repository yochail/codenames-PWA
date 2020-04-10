import React, { CSSProperties } from 'react';
import { Card, Typography, Grid } from '@material-ui/core';
import { GameCardState } from './app/store';
interface GameCardProp {
  state:GameCardState,
  onClick: ()=>void
}

const GameCard = ({state,onClick}:GameCardProp) => {
  
  const color = state.isColorVisible ? state.color : 'Beige'
  const cardStile:CSSProperties = {
    width: '18%',
    borderWidth: 'thick',
    //height: '5vw',
    backgroundColor: color,
    padding: '0vw',
    margin: '0.5vw',
    display: 'flex'
  };

  const cardTextStile:CSSProperties = {
    color: color === 'Beige' ? 'Black' : 'White',
    textDecoration: state.isLineThrough ? 'line-through' : 'none',
    margin: 'auto',
    textAlign: 'center'
  };

  return (
      <Card
        className="align-items-center justify-content-center"
        onClick={onClick}
        raised={true}
        style={cardStile}
      >
        <Typography variant={'h6'} style={cardTextStile} >
          {state.text}
        </Typography>
      </Card>
  );
}

export default GameCard;