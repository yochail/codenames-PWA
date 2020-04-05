import React from 'react';
import logo from './logo.svg';
import './App.css';
import { StateStore } from './app/store';
import { connect } from 'react-redux';
import Board from './Board';
import { Grid, Paper, Box, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const App = () => {
  return (

    <Box className="App">
      <header>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              { <MenuIcon /> }
            </IconButton>
            <Typography variant="h6">
              Codenames
          </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </header >
      <Paper elevation={3} style={{paddingTop:'10%',paddingBottom:'10%'}}>
        <Grid container alignItems='center'>
          <Board></Board>
        </Grid>
      </Paper>
    </Box>
  );
}


export default App;