import React from 'react'

function DeciderEntity(props: any) {

  return (
    <label>
        <span className='entity'>&nbsp;|{props.entity.name}|&nbsp;</span>
        &nbsp;
    </label>
  )
}

export default DeciderEntity;
