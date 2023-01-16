import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import LinearProgress from '@mui/material/LinearProgress';

function App() {
    return (
        <div className="App">
            <ButtonAppBar/>
            <LinearProgress color="info" />
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App;
