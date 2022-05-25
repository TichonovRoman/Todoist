import React from 'react';
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {logoutTC} from "../features/Login/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

const AppBarHeader = () => {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => {
        return state.auth.isLoggedIn
    })

    const logoutHandler = () => {
        dispatch(logoutTC())
    };
    return (
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
    );
};

export default AppBarHeader;