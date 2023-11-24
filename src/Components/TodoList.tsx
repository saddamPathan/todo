import "./TodoList.css"
import { useCount } from "./useCount";
import { NO_TODO_LABEL, TOTAL_NUMBER_TODO_LABEL } from './constants';

const TodoList = (props: any) => {
    const { getCount } = useCount();
    return (
        <div>
            <div className="todo-text">{TOTAL_NUMBER_TODO_LABEL}{getCount()}</div>
            {props.todoArr.length ? props.todoArr.map((todo: any, index: any) => (
                <div className="todo-text" key={todo.value+index}>{index + 1}. {todo.value}</div>
            )) : <div className="todo-text" >{NO_TODO_LABEL}</div>}
        </div>
    );

};

export default TodoList;
