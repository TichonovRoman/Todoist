import {Dispatch} from 'redux'
import {setAppErrorAC, setAppIsInitializedAC, setAppStatusAC} from
        'app/app-reducer'
import {authAPI, LoginParamsType} from "api/todolists-api";
import {handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

//не нужны AC и их типизация, экшеныи их типизация. Не нужна типизация initialState
// setIsLoggedInAC он же редьюсер он же как и АС.
// не нужно писать case, default case

const slice = createSlice({
    name: "auth", //исходя из имени будет генерировать case самостоятельно
    initialState: initialState,
    reducers: { //как обьект
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
            // нужно передавать занчения через payload и затипизровать соответствующе, чтобы работало
            // благодаря библиотеке immer.js можеи менять все с виду мутабельно, все происходит под капотом
            // а не иммутабельно как того требует Redux [...state]
            // каждый case это маленький подредьюсер
        }
    }
})

export const authReducer = slice.reducer //наш редьюсер

const {setIsLoggedInAC} = slice.actions //наши экшены

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
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
        .finally(() => {
            dispatch(setAppIsInitializedAC({isInitialized: true}))
        })

}