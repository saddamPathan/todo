import "./TodoMain.css"
import React, { memo, useMemo, useState } from "react";
import { useCount } from "./useCount";
import { ADD_LABEL, TODO_LABEL } from '../Utils/constants';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { ColDef, ColGroupDef, GetRowIdFunc, RowClassParams, RowStyle } from "ag-grid-community";
import { useDispatch, useSelector } from "react-redux";
import { addTodoType, TodoItem, todoState } from "../Store/actions";

const TodoMain = () => {
    const todoRedux = useSelector<todoState, todoState["todoList"]>((state) => { return state.todoList })
    const dispatch = useDispatch();

    const { incrementCount, getCount } = useCount();
    const [inputValue, setInputValue] = useState<string>('');

    const SimpleButton = (p: { rowIndex: number; node: { data: TodoItem } }) => {
        const onComplete = () => {
            dispatch({ type: "UPDATE_TODO", payload: { ...p.node.data, isComplete: !p.node.data.isComplete } });
        };
        return (
            <button className="complete-button" onClick={onComplete}>{p.node.data.isComplete ? 'Completed' : 'Pending'}</button>
        );
    };

    const columnDefs: (ColDef<TodoItem> | ColGroupDef<object>)[] = [
        { field: 'id', headerName: 'Sr. No.', sortable: false, filter: false },
        { field: 'value', headerName: 'Task To-do', tooltipField: 'value', flex: 3 },
        { field: 'isComplete', headerName: 'Action', cellRenderer: memo(SimpleButton) }
    ];

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        filter: true,
        flex: 1
    }), []);

    const addTodo = () => {
        if (inputValue) {
            incrementCount();
            dispatch(addTodoType({ value: inputValue, id: getCount(), isComplete: false }))
            setInputValue("");
        } else {
            alert('Please enter input text.')
        }
    }

    const getRowStyle: (params: RowClassParams) => RowStyle | undefined = (param: { data: TodoItem }) => {
        if (param.data.isComplete) {
            return {
                background: '#a6e194',
            };
        }
    };

    const getRowId: (GetRowIdFunc) = (param: { data: TodoItem }) => {
        // used to get unique id of each row
        return param.data.value + param.data.id;
    };

    return (
        <div className="todo-main">
            <div className="title">{TODO_LABEL}</div>
            <div className="add-todo">
                <input value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} className="input-field" type="text" placeholder="Add Your Task ToDo" />
                <button className="add-button" onClick={addTodo}>{ADD_LABEL}</button>
            </div>
            <div className="ag-theme-alpine" style={{ width: '100%', height: '100%' }}>
                <AgGridReact getRowId={getRowId} getRowStyle={getRowStyle} rowData={todoRedux} columnDefs={columnDefs} defaultColDef={defaultColDef}
                    rowSelection="multiple" animateRows={true} pagination={true} paginationPageSize={10}
                ></AgGridReact>
            </div>
        </div>
    )
};

export default TodoMain;