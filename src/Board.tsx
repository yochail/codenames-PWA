import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { FLIP_CARD } from './app/actions';
import { StateStore, BoardState } from './app/store';
import { connect, useSelector } from 'react-redux';
import GameCard from './GameCard';



const mapStateToProps = (state:StateStore):BoardState => {
  return state.board;
}

function chunk (arr:any[], len:number) {

  var chunks = [],
      i = 0,
      n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}

const Board = () => {
  const state = useSelector((state:StateStore) => state.board)
  return (
    <Container style={{minHeight:'100%'}}>
      {chunk(state.cards,5).map((row,i)=>
        <Grid container direction='row' alignContent='center' alignItems='center'>
          {row.map((ws,j) => <GameCard idx={i*5+j}/>)}
        </Grid>
      )}
    </Container>
  
  );
}

export default Board;


// <InputGroup
// style={{ display: player ? 'flex' : 'none'}}
// >
// <InputGroup.Prepend>
//   <InputGroup.Text>{numVal}</InputGroup.Text>
// </InputGroup.Prepend>
// <FormControl
//   placeholder="מילת קוד"
//   ref={this.inputRef}
//   onChange={v => this.setState({ codeVal: v.target.value })}
// />

// <Button
//   variant="outline-secondary"
//   onClick={!isLoading ? this.askCodeName : null}
//   disabled={isLoading}
// >
//   <Spinner
//     size="sm"
//     as="span"
//     animation="border"
//     role="status"
//     aria-hidden="true"
//     style={{ display: isLoading ? 'inline-flex' : 'none' }}
// />
// <span>{buttonText }</span>
// </Button>
// <Button
// onClick={()=>this.setState({player:!player})}
// variant="outline-secondary"
// >
// Change Player mode
// </Button>
// </InputGroup>
// <InputGroup
// style={{ display: player ? 'none' : 'flex' }}
// >
// <InputGroup.Prepend>
//   <InputGroup.Text>{numVal}</InputGroup.Text>
// </InputGroup.Prepend>
// <Button
//   variant="outline-secondary"
//   onClick={!isLoading ? ()=> this.createCode('Red') : null}
//   disabled={isLoading}
//   style={{background: 'red' }}
// >
//   <Spinner
//     size="sm"
//     as="span"
//     animation="border"
//     role="status"
//     aria-hidden="true"
//     style={{ display: isLoading ? 'inline-flex' : 'none' }}
//   />
// <span>{buttonText }</span>
// </Button>
// <Button
//   variant="outline-secondary"
//   onClick={!isLoading ? ()=> this.createCode('Blue') : null}
//   disabled={isLoading}
//   style={{ background: 'blue' }}
// >
//   <Spinner
//     size="sm"
//     as="span"
//     animation="border"
//     role="status"
//     aria-hidden="true"
//     style={{ display: isLoading ? 'flex' : 'none' }}
// />
// <span>{buttonText }</span>
// </Button>
// <Button
// onClick={()=>this.setState({player:!player})}
// variant="outline-secondary"
// >
// Change Player mode
// </Button>
// </InputGroup>

// <Slider
// min={1}
// max={6}
// defaultValue={numVal}
// step={1}
// ref={this.sliderRef}
// onChange={v => this.setState({ numVal: v })}
// trackStyle={{ height: '3vw' }}
// railStyle={{ height: '3vw' }}
// handleStyle={{
//   // borderColor: 'blue',
//   height: '3vw',
//   width: '3vw',
// }}
// />