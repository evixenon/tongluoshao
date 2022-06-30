import React, { useEffect, useState, useRef } from 'react'
import DeciderEntity from './DeciderEntity'
import {v4 as uuid} from 'uuid';

const LOCAL_STORAGE_KEY = 'decider.entities'

function Decider() {
  const [entities, setEntities] = useState<any[]>([]);
  const [result, setResult] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // useEffect(() => {
  //   const storedEntities = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
  //   if (storedEntities) setEntities(storedEntities);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entities));
  // }, [entities]);
  
  // TS 版的组件不能直接返回 Element[], 定义一个常量过度
  const componentArray = entities.map(entity => {
      return <DeciderEntity key={entity.id} entity={entity} setEntities={setEntities}/>
    })
    
  function handleAddEntity() {
    if (inputRef.current) {
      const name = inputRef.current.value;
      if (name === '') return;

      setEntities(prevEntities => {
        return [...prevEntities, {id: uuid(), name: name}];
      })
      console.log(`[Decider] add ${name}.`);
      inputRef.current.value = '';
    } else {
      console.log('[Decider] nothing added.')
    }
  }
  
  function handleClear() {
    setEntities([]);
    setResult('');
  }
  
  function handlePick() {
    const randres = entities[Math.floor(Math.random() * entities.length)];
    setResult(`就决定是你了！${randres.name}！`);
    console.log(`[Decider] result: ${randres.name}`)
  }
  
  return (
    <>
      <p>做决定机 v0.1</p>
      <div className='entities'>{componentArray}</div>
      <label>
        <input ref={inputRef} type='name'></input>
        <button onClick={handleAddEntity}>添加</button>
        <button onClick={handleClear}>清空</button>
      </label>
      <label>
        总计{entities.length}项&nbsp;
        <button onClick={handlePick}>决定！</button>
      </label>
      <p>{result}</p>
    </>
  )
}

export default Decider;