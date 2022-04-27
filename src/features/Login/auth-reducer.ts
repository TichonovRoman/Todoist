import {Dispatch} from 'redux'
import {setAppErrorAC, setAppIsInitializedAC, setAppStatusAC} from
        '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}


const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}> ) {
                      state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer

const {setIsLoggedInAC} = slice.actions

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
            } else {
                dispatch(setAppErrorAC({error: res.data.messages.length ? res.data.messages[0] : "Some error"}))
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(() => dispatch(setAppStatusAC({status: 'succeeded'})))
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
            } else {
                dispatch(setAppErrorAC({error: res.data.messages.length ? res.data.messages[0] : "Some error"}))
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(() => dispatch(setAppStatusAC({status: 'succeeded'})))
}

export const initializeAppTC = () => (dispatch: Dispatch) => {

    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
            dispatch(setAppErrorAC({error: res.data.messages.length ? res.data.messages[0] : "Some error"}))
        }
    })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(()=> {
            dispatch(setAppIsInitializedAC({isInitialized: true}))
        })

}