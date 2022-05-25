import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setAppStatusAC} from "../../app/app-reducer";

const PageNotFound = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAppStatusAC({status: "succeeded"}))
    }, [dispatch])
    return (
        <h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>
    );
};

export default PageNotFound;