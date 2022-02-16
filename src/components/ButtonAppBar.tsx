import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import React from "react";

export const ButtonAppBar = () => {
    return (
        <AppBar position="static">
            <Toolbar style={{justifyContent: "space-between"}}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    Todolists
                </Typography>
                <Button color="inherit" variant="outlined">Login</Button>

            </Toolbar>

        </AppBar>
    )

}


