import {NullableNull} from "../components/ErrorSnackbar/ErrorSnackbar";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as NullableNull<string>,
    isInitialized: false,
}
type InitialStateType = typeof initialState
export const appReducer = (state: InitialStateType = initialState, action:
    AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}


        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: NullableNull<string>) =>({type: 'APP/SET-ERROR', error} as const)
export const setAppIsInitializedAC = (isInitialized: boolean) =>({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

export type SetAppErrorTypes = ReturnType<typeof setAppErrorAC>
export type SetAppActionsTypes = ReturnType<typeof setAppStatusAC>
export type SetAppIsInitializedTypes = ReturnType<typeof setAppIsInitializedAC>
export type AppActionsType = SetAppActionsTypes | SetAppErrorTypes | SetAppIsInitializedTypes