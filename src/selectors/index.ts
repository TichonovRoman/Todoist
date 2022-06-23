import {AppRootStateType} from "app/store";
import {initialAppStateType} from "app/app-reducer";

export const contentSelectors = {
    getTodoListsData: (state: AppRootStateType) => state.todolists,
    getTasksData: (state: AppRootStateType) => state.tasks,
    getIsLoggedInData: (state: AppRootStateType) => state.auth.isLoggedIn,
}

export const appSelectors = {
    getAppData: (state: AppRootStateType): initialAppStateType => state.app
}
