import { Action, todoState } from './actions'

const initialState = {
    todoList: []
};

export const todoReducer = (state: todoState = initialState, action: Action) => {
    switch (action.type) {
        case 'GET_TODO':
            return state;

        case 'SET_TODO':
            return { ...state, todoList: [...state.todoList, action.payload] }

        case 'UPDATE_TODO':
            const updatedTodoList = state.todoList.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, isComplete: !todo.isComplete };
                }
                return todo;
            });
            return { ...state, todoList: updatedTodoList };

        default:
            return state;
    }
}