import "./TodoList.css"
const TodoList = (props: any) => {
    return (
        <div>
            {props.todoArr.length ? props.todoArr.map((todo: any, index: any) => (
                <div className="todo-text" key={todo.value}>{index + 1}. {todo.value}</div>
            )) : <div className="todo-text" >No todos to display.</div>}
            {/* {props.todoArr.map((todo: any, index: any) => (
                <div className="todo-text" key={todo.value}>{index + 1}. {todo.value}</div>
            ))} */}
        </div>
    );

};

export default TodoList;
