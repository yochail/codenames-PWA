import React, { CSSProperties, Attributes, ReactPropTypes } from 'react';
import { Container, Grid, Typography, Card, LinearProgress, PropTypes, CircularProgress, FormControl, OutlinedInput, InputLabel, Box, Stepper, Step, StepLabel } from '@material-ui/core';
import { StateStore, BoardState, GAME_TYPE_PLAYER, GAME_TYPE_OPERATOR, AppConfig } from './app/store';
import { connect, useSelector, useDispatch } from 'react-redux';
import GameCard from './GameCard';
import { boardSlice } from './app/boardSlices';

function chunk(arr: any[], len: number) {
  var chunks = [],
    i = 0,
    n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}

const boardStyle: CSSProperties = {
  direction: 'rtl'
};


interface boardHeaderProps {
  state: BoardState,
  config?: AppConfig
}

const OperatorHeader = ({ state }: boardHeaderProps) => {
  const titleStyle: CSSProperties = {
    backgroundColor: state.playingColor,
    color: 'white'
  };
  return (<Card style={titleStyle}>
    <FormControl variant="outlined">
      <InputLabel htmlFor="component-outlined">Name</InputLabel>
      <OutlinedInput id="component-outlined"
        value={'ddd'}
        //onChange={handleChange}
        label="Name" />
    </FormControl>
  </Card>)
}

const PlayerHeader = ({ state }: boardHeaderProps) => {
  if (state.requestPending) {
    return (
      <Box>
        <LinearProgress />
      </Box>)
  } else {
    return (
      <Box>
        <Typography variant="h5"> 
          {` ${'שם קוד: '}${state.codeNameWord} ${state.codeNameNumber} `}
        </Typography>
        <Stepper activeStep={state.steps.length ?? 0}>
          {Array.from(Array(state.codeNameNumber).keys()).map(i => {
            const stepLable = i >= state.steps.length ? '' : state.steps[i].word
            const stepError = i < state.steps.length && !state.steps[i].success
            return <Step>
              <StepLabel error={stepError}>
                {stepLable}
              </StepLabel>
            </Step>

          })}
        </Stepper>
      </Box >)
  }
}


const ErrorHeader = () => {
  return (
    <Card style={{
      backgroundColor: 'Red',
      color: 'white'
    }}>

      {'שגיאת שרת. אנא נסה שנית'}
    </Card>)
}

const Header = ({ state, config }: boardHeaderProps) => {
  if (state.requestFailed) {
    return <ErrorHeader />
  } else if (config?.gameType == GAME_TYPE_OPERATOR) {
    return <OperatorHeader state={state} />
  } else {
    return (<PlayerHeader state={state} />)
  }
}

const Board = () => {
  const state = useSelector((s: StateStore) => s.board)
  const config = useSelector((s: StateStore) => s.config)
  const dispatch = useDispatch()
  const titleStyle: CSSProperties = {
    backgroundColor: state?.playingColor ?? 'Beige',
    color: 'white'
  };

  if (state) {
    return (
      <Container style={boardStyle}>
        <Card style={titleStyle}>
          <Header state={state} config={config} />
        </Card>
        {chunk(state.cards, 5).map((row, i) =>
          <Grid container direction='row' justify='space-evenly' wrap='nowrap' key={i}>
            {row.map((c, j) => {
              {
                const idx = i * 5 + j
                return <GameCard
                  key={idx}
                  state={c}
                  onClick={() =>
                    dispatch(boardSlice.actions.flipCard(idx))
                  }
                />
              }
            })}
          </Grid>
        )}
      </Container>

    );
  } else {
    return <CircularProgress />
  }
}

export default Board;

