import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu, NavigateBefore} from '@mui/icons-material';
import {LinearProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Routes, Route, Navigate} from "react-router-dom";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import {initializeAppTC} from "../features/Login/auth-reducer";


function App() {
    const statusLoading = useSelector<AppRootStateType, RequestStatusType>((state) => {
        return state.app.status
    })
    const error = useSelector<AppRootStateType, string | null>((state) => {
        return state.app.error
    })
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(initializeAppTC())
    })

    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {statusLoading === "loading" && <LinearProgress color="secondary"/>}
            <Container fixed>

                    <Routes>
                        <Route path="/" element={<TodolistsList/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="/404"  element={<PageNotFound/>}/>
                        <Route path="*"  element={<Navigate to={"/404"}/>}/> //если ничего не нашел в имеющихся роутах
                    </Routes>

            </Container>
            {error !== null && <ErrorSnackbar/>}
        </div>
    )
}

export default App
