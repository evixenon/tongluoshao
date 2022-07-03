import React from 'react'

export default function Todo(props:any) {
  function toggleTodo() {
    props.toggleTodo(props.todo.id);
  }
  
  return (
    <div>
        <label>
        <input type='checkbox' checked={props.todo.complete} onChange={toggleTodo}></input>
        {props.todo.name}
        </label>
    </div>
  )
}

