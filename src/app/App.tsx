import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import Container from '@mui/material/Container';
import {CircularProgress, LinearProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Routes, Route, Navigate} from "react-router-dom";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import {initializeAppTC} from "../features/Login/auth-reducer";
import AppBarHeader from "./AppBarHeader";


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
            {statusLoading === "loading" && <LinearProgress color="secondary"/>}
            <Container fixed>

                    <Routes>
                        <Route path="/" element={<TodolistsList/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="/404"  element={<PageNotFound/>}/>
                        <Route path="*"  element={<Navigate to={"/404"}/>}/> {/*если ничего не нашел в имеющихся роутах*/}
                    </Routes>

            </Container>
            {error !== null && <ErrorSnackbar/>}
        </div>
    )
}

export default App
