import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from "../hooks/hooks";

type AppPropsType = {
    demo?: boolean
}
const App: React.FC<AppPropsType> = ({demo = false}) => {
    const status = useAppSelector(state => state.app.status)

    return (
        <div className="App">
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress color="info"/>}
            <CustomizedSnackbars/>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    )
}

export default App;
