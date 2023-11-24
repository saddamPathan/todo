import TodoList from "./TodoList";
import "./TodoMain.css"
import React, { useEffect, useRef, useState } from "react";
import { useCount } from "./useCount";
import { ADD_LABEL, TODO_LABEL } from './constants';

const TodoMain = () => {
    const { incrementCount } = useCount();
    const [todoArr, setTodo] = useState<Array<object>>([]);
    const inputRef: any = useRef(null);

    const addTodo = () => {
        if (inputRef.current.value) {
            incrementCount();
            setTodo([...todoArr, { value: inputRef.current.value }]);
            inputRef.current.value = "";
        } else {
            alert('Please enter input text.')
        }
    }
    
    // useEffect(() => {
    //     console.log(todoArr, 'useeffect')
    // }, [todoArr])
    
    return (
        <div className="todo-main">
            <div className="title">{TODO_LABEL}</div>
            <div className="add-todo">
                <input ref={inputRef} className="input-field" type="text" placeholder="Add Your Task ToDo" />
                <button className="add-button" onClick={addTodo}>{ADD_LABEL}</button>
            </div>
            <div className="todo-list">
                <TodoList todoArr={todoArr} />
            </div>
        </div>
    )
};

export default TodoMain;