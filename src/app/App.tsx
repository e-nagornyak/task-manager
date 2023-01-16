import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import LinearProgress from '@mui/material/LinearProgress';

function App() {
    return (
        <div className="App">
            <ButtonAppBar/>
            <LinearProgress color="info" />
            <CustomizedSnackbars/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App;
