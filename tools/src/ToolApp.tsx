/**
 * 组件简单工厂
 */
import React from 'react'
import Decider from './Decider';
import EmptyTool from './EmptyTool';

function ToolApp(props: {name: string;}): JSX.Element {
    
  function renderApp(): JSX.Element {
    if (props.name === '') return <EmptyTool />;
    switch (props.name) {
        case 'decider':
            return <Decider />
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