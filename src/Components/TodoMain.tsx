import TodoList from "./TodoList";
import "./TodoMain.css"
import React, { useEffect, useRef, useState } from "react";
const TodoMain = () => {
    const [todoArr, setTodo]: any = useState([]);
    const inputRef: any = useRef(null);
    const addTodo = () => {
        if (inputRef.current.value) {
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
            <div className="title">To-Do List</div>
            <div className="add-todo">
                <input ref={inputRef} className="input-field" type="text" placeholder="Add Your Task ToDo" />
                <button className="add-button" onClick={addTodo}>ADD</button>
            </div>
            <div className="todo-list">
                <TodoList todoArr={todoArr} />
            </div>
        </div>
    )
};

export default TodoMain;