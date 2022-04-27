import {NullableNull} from "../components/ErrorSnackbar/ErrorSnackbar";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as NullableNull<string>,
    isInitialized: false,
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC: (state, action: PayloadAction<{status: RequestStatusType}> ) => {
            state.status = action.payload.status
        },
        setAppErrorAC: (state, action: PayloadAction<{error: NullableNull<string>}> ) => {
            state.error = action.payload.error
        },
        setAppIsInitializedAC: (state, action: PayloadAction<{isInitialized: boolean}> ) => {
            state.isInitialized = action.payload.isInitialized
        },
    }
})

export const appReducer = slice.reducer


//
// type InitialStateType = typeof initialState
// export const appReducer = (state: InitialStateType = initialState, action:
//     AppActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case "APP/SET-ERROR":
//             return {...state, error: action.error}
//         case "APP/SET-IS-INITIALIZED":
//             return {...state, isInitialized: action.isInitialized}
//
//
//         default:
//             return state
//     }
// }

export const {setAppStatusAC, setAppErrorAC, setAppIsInitializedAC} = slice.actions

//(status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
// export const setAppErrorAC = slice.actions.setAppErrorAC // (error: NullableNull<string>) =>({type: 'APP/SET-ERROR', error} as const)
// export const setAppIsInitializedAC = slice.actions.setAppIsInitializedAC // (isInitialized: boolean) =>({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

export type SetAppErrorTypes = ReturnType<typeof setAppErrorAC>
export type SetAppActionsTypes = ReturnType<typeof setAppStatusAC>
export type SetAppIsInitializedTypes = ReturnType<typeof setAppIsInitializedAC>
export type AppActionsType = SetAppActionsTypes | SetAppErrorTypes | SetAppIsInitializedTypes