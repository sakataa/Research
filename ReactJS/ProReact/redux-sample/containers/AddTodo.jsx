import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let input;

const submit = (e, dispatch) => {
    e.preventDefault();
    if (!input.value.trim()) {
        return;
    }
    dispatch(addTodo(input.value));
    input.value = "";
}

let AddTodo = ({ dispatch }) => {
    return (
        <div>
            <form onSubmit={e => submit(e, dispatch)}>
                <input ref={node => input = node} />
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>
    )
}

AddTodo = connect()(AddTodo);

export default AddTodo;