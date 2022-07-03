import React, { useRef, useEffect, useState } from 'react'
import Todo from './Todo';
import {v4 as uuid} from 'uuid';

const LOCAL_STORAGE_KEY = 'todolist_todos';
const version = '0.2';

export default function TodoList() {
  const [todos, setTodos] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // load
  useEffect(
    () => {
      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
      if (stored) setTodos(stored);
    },
    []
  );

  // save
  useEffect(
    () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    },
    [todos]
  );
  
  function handleAddTodo() {
    if (inputRef.current && inputRef.current.value !== '') {
      const name = inputRef.current.value;  
      const id = uuid();
      setTodos((prev) => {
        return [...prev, {id: id, name: name, complete: false}];
      });
      
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }
  
  function handleKeyUp(event: any) {
    if (event.keyCode === 13 /* Enter */) {
        handleAddTodo();
    }
  }
  
  function toggleTodo(id: string) {
    const todo = todos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos([...todos]);
  }
  
  function deleteTodo(id: string) {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }
  
  function handleClearAll() {
    setTodos([]);
  }
  
  function handleClearCompleted() {
    setTodos(todos.filter(todo => !todo.complete));
  }
  
  // render component list
  const componentArray = todos.map((todo) => {
    return <Todo todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>;
  });
  
  return (
    <>
    <div><p>Todo List v{version}</p></div>
    <div className='entities'>{componentArray}</div>
    <label>
        <input type='text' ref={inputRef} onKeyUp={handleKeyUp} autoFocus></input>
        <button onClick={handleAddTodo} >添加</button>
        <button onClick={handleClearAll}>清空</button>
        <button onClick={handleClearCompleted}>清空已完成</button>
    </label>
    <label>
        总计{todos.length}项，{todos.filter(todo => todo.complete).length}项已完成
    </label>
    </>
  )
}



