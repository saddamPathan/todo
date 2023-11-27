import "./TodoMain.css"
import React, { useMemo, useRef, useState } from "react";
import { useCount } from "./useCount";
import { ADD_LABEL, TODO_LABEL } from './constants';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { ColDef, ColGroupDef } from "ag-grid-community";

const TodoMain = () => {
    const { incrementCount, getCount } = useCount();
    const [todoArr, setTodo] = useState<Array<object>>([]);
    const inputRef: any = useRef<HTMLInputElement | null>(null);

    const SimpleButton = (p: any) => {
        const onComplete = () => {
            todoArr.splice(p.rowIndex, 1, { ...p.node.data, isComplete: !p.node.data.isComplete });
            setTodo([...todoArr]);
        };
        return (
            <button className="complete-button" onClick={onComplete}>{p.node.data.isComplete ? 'Completed' : 'Pending'}</button>
        );
    };

    const columnDefs: (ColDef<any> | ColGroupDef<object>)[] = [
        { field: 'id', headerName: 'Sr. No.', sortable: false, filter: false },
        { field: 'value', headerName: 'Task To-do', flex: 3 },
        { field: 'Complete', headerName: 'Action', cellRenderer: SimpleButton }
    ];

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
        filter: true,
        flex: 1
    }), []);

    const addTodo = () => {
        if (inputRef.current.value) {
            incrementCount();
            setTodo([...todoArr, { value: inputRef.current.value, id: getCount(), isComplete: false }]);
            inputRef.current.value = "";
        } else {
            alert('Please enter input text.')
        }
    }

    const getRowStyle = (params: any) => {
        if (params.node.data.isComplete) {
            return {
                background: '#a6e194',
            };
        }
    };

    return (
        <div className="todo-main">
            <div className="title">{TODO_LABEL}</div>
            <div className="add-todo">
                <input ref={inputRef} className="input-field" type="text" placeholder="Add Your Task ToDo" />
                <button className="add-button" onClick={addTodo}>{ADD_LABEL}</button>
            </div>
            <div className="ag-theme-alpine" style={{ width: '100%', height: '100%' }}>
                <AgGridReact getRowStyle={getRowStyle} rowData={todoArr} columnDefs={columnDefs} defaultColDef={defaultColDef}></AgGridReact>
            </div>
        </div>
    )
};

export default TodoMain;