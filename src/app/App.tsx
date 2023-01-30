import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Login} from "../features/Login/Login";
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import ButtonAppBar from "../components/ButtonAppBar/ButtonAppBar";
import {Navigate, Route, Routes} from "react-router-dom";
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import {initializeAppTC} from "./reducer/app-reducer";

type AppPropsType = {
    demo?: boolean
}
const App: React.FC<AppPropsType> = ({demo = false}) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div style={{width: "100%", position: 'fixed', top: "30%", textAlign: 'center'}}>
            <CircularProgress size={80}/>
        </div>
    }

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
