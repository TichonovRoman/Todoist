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
        let promise = instance.get('todo-lists')
        return promise
    },
    createTodo(title: string) {
        return instance.post('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
      return  instance.put(`todo-lists/${todolistId}`, {title})
    }
}