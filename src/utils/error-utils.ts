import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";

export const handleServerNetworkError = (dispatch: Dispatch<AppActionsType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC("failed"))
}

export const handleServerAppError = () => {

}