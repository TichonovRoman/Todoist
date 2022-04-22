import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {CircularProgress, LinearProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Routes, Route, Navigate} from "react-router-dom";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import {initializeAppTC, logoutTC} from "../features/Login/auth-reducer";


function App() {
    const statusLoading = useSelector<AppRootStateType, RequestStatusType>((state) => {
        return state.app.status
    })
    const error = useSelector<AppRootStateType, string | null>((state) => {
        return state.app.error
    })
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => {
        return state.app.isInitialized
    })

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => {
        return state.auth.isLoggedIn
    })


    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(initializeAppTC())
    }, [])

    if(!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    const logoutHandler = () => {
        dispatch(logoutTC())
    };

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
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
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
