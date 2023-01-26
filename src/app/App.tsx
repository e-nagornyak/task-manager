import React from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from "../hooks/hooks";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";

type AppPropsType = {
    demo?: boolean
}
const App: React.FC<AppPropsType> = ({demo = false}) => {
    const status = useAppSelector(state => state.app.status)

    return (
        <div className="App">
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress color="info"/>}
            <ErrorSnackbars/>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to='/404'/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App;
