/**
 * 组件简单工厂
 */
import React from 'react'
import Decider from './Decider';
import EmptyTool from './EmptyTool';
import TodoList from './TodoList';

function ToolApp(props: {name: string;}): JSX.Element {
    
  function renderApp(): JSX.Element {
    if (props.name === '') return <EmptyTool />;
    switch (props.name) {
        case 'Decider':
            return <Decider />
        case 'TodoList':
            return <TodoList />
        default:
            return <EmptyTool />
    }
  }
  
  return (
    <>
        {renderApp()}
    </>
  )
}

export default ToolApp;