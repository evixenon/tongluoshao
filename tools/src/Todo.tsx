import React from 'react'

export default function Todo(props:any) {
  function toggleTodo() {
    props.toggleTodo(props.todo.id);
  }
  
  function deleteTodo() {
    props.deleteTodo(props.todo.id);
  }
  
  return (
    <div>
        <label>
        <input type='checkbox' checked={props.todo.complete} onChange={toggleTodo}></input>
        {props.todo.name} &nbsp;
        <button onClick={deleteTodo}> - </button>
        </label>
    </div>
  )
}

