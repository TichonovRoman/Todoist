import React, {useEffect} from 'react'
import {Routes, Route, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import './App.css'

import Container from '@mui/material/Container';
import {CircularProgress, LinearProgress} from "@mui/material";

import {AppRootStateType} from "./store";
import {initialAppStateType} from "./app-reducer";

import PageNotFound from "components/PageNotFound/PageNotFound";

import {Login} from "features/Login/Login";
import {initializeAppTC} from "features/Login/auth-reducer";
import {TodolistsList} from 'features/TodolistsList/TodolistsList'

import AppBarHeader from "./AppBarHeader";
import {appSelectors} from "selectors";
import {ErrorSnackbar} from "components/ErrorSnackbar/ErrorSnackbar";


function App() {
    const {status, error, isInitialized} = useSelector<AppRootStateType, initialAppStateType>(appSelectors.getAppData)

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(initializeAppTC())
    }, [dispatch])

    if(!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (

        <div className="App">
            <AppBarHeader/>
            {status === "loading" && <LinearProgress color="secondary"/>}
            <Container fixed>

                    <Routes>
                        <Route path="/" element={<TodolistsList/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="/404"  element={<PageNotFound/>}/>
                        <Route path="*"  element={<Navigate to={"/404"}/>}/>
                    </Routes>

            </Container>
            {error !== null && <ErrorSnackbar/>}
        </div>
    )
}

export default App
