import React from 'react'

function DeciderEntity(props: any) {
  function duplicateEntity() {
    props.duplicateEntity(props.entity.id);
  }
  
  function deleteEntity() {
    props.deleteEntity(props.entity.id);
  }

  return (
    <div>
    <label>
        {props.entity.name} &nbsp;
        <button onClick={duplicateEntity}>+</button>
        <button onClick={deleteEntity}> - </button>
        &nbsp;
    </label>
    </div>
  )
}

export default DeciderEntity;
