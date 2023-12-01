export interface TodoItem {
    id: number;
    value: string;
    isComplete: boolean;
}

export interface todoState {
    todoList: Array<TodoItem>
}

export type Action = { type: string, payload: TodoItem }

export const addTodoType = (todo: TodoItem): Action => ({
    type: "SET_TODO",
    payload: todo
})
