import axios from "axios";


let instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    headers: {
        'API-KEY': 'cdcf9189-0a6c-4ea6-a766-22c26d9d1d3e'
    },
    withCredentials: true

})


export const todolistApi = {
    getTodos() {
        let promise = instance.get<TodoType[]>('todo-lists')
        return promise
    },
    createTodo(title: string) {
        return instance.post<any,
            BaseResponseType<{ item: TodoType }>, // типизируем то, что приходит
            { title: string }> // типизируем то, что передаем в payload
            ('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title})
    }
}


type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type BaseResponseType<T = {}> = { // по умолчанию если ничего не педеавать, то по умолачнию вместо T будет проставлятся {}. в <T={}> можно вставлять много агрументов
    resultCode: number,
    messages: string[],
    fieldErrors: string[],
    data: T
}