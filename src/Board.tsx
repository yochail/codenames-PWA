import React, { CSSProperties, Attributes, ReactPropTypes, SyntheticEvent } from 'react';
import { Container, Grid, Typography, Card, LinearProgress, PropTypes, CircularProgress, FormControl, OutlinedInput, InputLabel, Box, Stepper, Step, StepLabel, Button, Backdrop, Badge, Snackbar, DialogContentText, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { StateStore, BoardState, GAME_TYPE_PLAYER, GAME_TYPE_OPERATOR, AppConfig, EndGameCause } from './app/store';
import { connect, useSelector, useDispatch } from 'react-redux';
import GameCard from './GameCard';
import { boardSlice } from './app/boardSlices';
import { createBoardCodeWordThunk, Colors, InitBoard, getOtherColor } from './app/boardActions';
import { makeStyles } from '@material-ui/core/styles';
import StarsIcon from '@material-ui/icons/Stars';



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
  config?: AppConfig,
  openSnackBar?: boolean,
  setSnackBarOpen?: (open: boolean) => void
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

const ScoreHeader = ({ state }: boardHeaderProps) => {

  return (
    <Grid container style={{
      background: Colors.Blue,
      height: '4vh'
    }}>
      <Grid item xs={2}>
        <Badge
          badgeContent={state.blueScore} color="primary"
          anchorOrigin={
            {
              horizontal: 'left',
              vertical: 'bottom'
            }}
          showZero={true}>
          <StarsIcon />
        </Badge>
      </Grid>
      <Grid item xs={8} style={{ background: Colors.Beige }}>
        <Typography variant="h5" style={{ color: Colors.Black }}>
          {'שם קוד'}
        </Typography>
      </Grid>
      <Grid item xs={2} style={{ background: Colors.Red }}>
        <Badge
          badgeContent={state.redScore}
          color={"error"}
          anchorOrigin={
            {
              horizontal: 'right',
              vertical: 'bottom'
            }}
          showZero={true}>
          <StarsIcon />
        </Badge>
      </Grid >
    </Grid>)

}

const PlayerHeader = ({ state }: boardHeaderProps) => {
  const dispatch = useDispatch();
  if (state.requestPending) {
    return (
      <Box>
        <LinearProgress />
      </Box>)
  } else {
    return (
      <Grid container justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={3}>
          <Typography variant="h4">
            {`${state.codeNameWord} ${state.codeNameNumber}`}

          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color={"primary"}
            onClick={() => { dispatch(boardSlice.actions.nextTurn()) }}
          >
            {'העבר תור'}
          </Button>
        </Grid>
      </Grid >)
  }
}

const StepStepper = ({ state }: boardHeaderProps) => {
    return (
    <Grid container justify={'center'}>
      <Grid item xs={12}>
        <Stepper 
            activeStep={state.steps.length ?? 0}>
            {Array.from(Array(state.codeNameNumber).keys()).map(i => {
              const stepLable = i >= state.steps.length ? '' : state.steps[i].word
              const stepError = i < state.steps.length && !state.steps[i].success
              return (
              <Step key={i}>
                <StepLabel error={stepError}>
                  {stepLable}
                </StepLabel>
              </Step>)
            })}
          </Stepper>
      </Grid>
    </Grid>)
}



const ErrorHeader = ({ state }: boardHeaderProps) => {
  const dispatch = useDispatch();
  return (
    <Card style={{
      backgroundColor: '#d07777',
      color: 'white'
    }}>
      <Button
        variant="contained"
        color={"secondary"}
        onClick={() => { dispatch(createBoardCodeWordThunk(state!)) }}>
        {'שגיאת שרת. אנא נסה שנית'}
      </Button>
    </Card>)
}

const TurnEnd = ({ state }: boardHeaderProps) => {
  const dispatch = useDispatch()
  const successSteps = state.steps.filter(s => s.success).length
  return (
    <Grid container justify="center"
      alignItems="center"
      spacing={2}
      style={{
        backgroundColor: Colors.Beige,
        color: 'Black',
      }}>
      <Grid item>
        <Typography variant="h4">
          {` ${state.codeNameWord} ${successSteps}/${state.codeNameNumber} `}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => { dispatch(boardSlice.actions.nextTurn()) }}
        >
          {` המשך `}
        </Button>
      </Grid>
    </Grid>)
}

const Header = ({ state, config }: boardHeaderProps) => {
  if (state.requestFailed) {
    return <ErrorHeader state={state} />
  } else if (state.isTurnEnd) {
    return <TurnEnd state={state} />
  } else if (config?.gameType == GAME_TYPE_OPERATOR) {
    return <OperatorHeader state={state} />
  } else {
    return (<PlayerHeader state={state} />)
  }
}

const SuccessSnackBar = ({ state, openSnackBar, setSnackBarOpen }: boardHeaderProps) => {

  const lastStepSuccess = state.steps.length > 0 ? state.steps[state.steps.length - 1]?.success : undefined;
  if (lastStepSuccess == undefined) {
    return <Box />
  } else {
    return (
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',

        }}


        open={openSnackBar}
        onClose={() => setSnackBarOpen!(false)}
      >
        <Card
          style={{
            backgroundColor: lastStepSuccess ? 'Green' : 'Red',
            opacity: 0.8
          }}
        >
          <Typography variant={"h5"}
            style={{
              margin: '0.5rem'
            }}>
            {lastStepSuccess ? 'מעולה!' : 'לא לזה התכוונתי..'}
          </Typography>
        </Card>
      </Snackbar>
    )
  }
}

const PossibleEndDialog = ({ state, config }: boardHeaderProps) => {
  const dispatch = useDispatch();
  if (!state.endGame) {
    return <Box></Box>
  } else {
    const winner = state.endGameCause === "BlackCard" ? getOtherColor(state.playingColor) : state.playingColor;
    return (
      <Dialog
        open={true}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"סוף המשחק"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {winner === Colors.Red ? 'אדום' : 'כחול'} {' והמנצח הוא '}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              const newBoard = InitBoard(config!.gameType);
              dispatch(boardSlice.actions.initBoard(newBoard)
              )
            }}
            color="primary" autoFocus >
            {`משחק חדש`}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

}

const checkGameEnd = (state: BoardState,dispatch:any)=>{
  const cardsEnd = state.cards.length > 0 && state.cards.filter(c=>c.color === state.playingColor && !c.isLineThrough).length == 0
  if(cardsEnd){
    dispatch(boardSlice.actions.endGame(EndGameCause.AllCardsTurned));
  }

  if(state.cards.filter(c=>c.color === Colors.Black && c.isLineThrough).length > 0){
      dispatch(boardSlice.actions.endGame(EndGameCause.BlackCard));
  }
}

const Board = () => {
  const state = useSelector((s: StateStore) => s.board)
  const config = useSelector((s: StateStore) => s.config)
  const dispatch = useDispatch()
  const [openSnackBar, setSnackBarOpen] = React.useState(true);
  const titleStyle: CSSProperties = {
    backgroundColor: state?.playingColor ?? Colors.Beige,
    color: 'white'
  };

  if (state) {
    if (state.cards.length > 0 && state.codeNameWord === "" && !state.requestFailed && !state.requestPending && !state.requestSuccess) {
      dispatch(createBoardCodeWordThunk(state!));
    }

    checkGameEnd(state,dispatch);
    
    return (
      <Container style={boardStyle}>
        <PossibleEndDialog state={state} config={config!} />
        <Card style={titleStyle}>
          <ScoreHeader state={state} />
          <Header state={state} config={config} />
        </Card>
        <SuccessSnackBar
          state={state}
          openSnackBar={openSnackBar}
          setSnackBarOpen={setSnackBarOpen} />
        {chunk(state.cards, 5).map((row, i) =>
          <Grid container direction='row' justify='space-evenly' wrap='nowrap' key={i}>
            {row.map((c, j) => {
              {
                const idx = i * 5 + j
                return <GameCard
                  key={idx}
                  state={c}
                  onClick={() => {
                    if (!state.isTurnEnd && state.requestSuccess) {
                        setSnackBarOpen(true)
                        dispatch(boardSlice.actions.flipCard(idx));
                    }
                  }
                  }
                />
              }
            })}
          </Grid>
        )}
        <StepStepper state={state} />
      </Container>
    );
  } else {
    return <CircularProgress />
  }
}

export default Board;

