import {NullableNull} from "../components/ErrorSnackbar/ErrorSnackbar";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as NullableNull<string>
}
type InitialStateType = typeof initialState
export const appReducer = (state: InitialStateType = initialState, action:
    AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: NullableNull<string>) =>({type: 'APP/SET-ERROR', error} as const)

export type SetAppErrorTypes = ReturnType<typeof setAppErrorAC>
export type SetAppActionsTypes = ReturnType<typeof setAppStatusAC>
type AppActionsType = SetAppActionsTypes | SetAppErrorTypes