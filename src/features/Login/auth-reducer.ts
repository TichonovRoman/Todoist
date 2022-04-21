import {Dispatch} from 'redux'
import {AppActionsType, setAppErrorAC, setAppStatusAC} from
        '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState
export const authReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
                dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error"))
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error.message)
        })
        .finally(() => dispatch(setAppStatusAC('succeeded')))
}
// types

type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType