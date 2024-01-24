import {useState} from 'react'

const Filters = ({ showActive, showArchived }) => {
  return(
    <div>
      <input type="checkbox" id="showActive" onChange={(evt)=>showActive(evt)}/>
      <label htmlFor="showActive">Show only active</label>

      <input type="checkbox" id="showArchived" onChange={(evt)=>showArchived(evt)}/>
      <label htmlFor="showArchived">Show archived</label>
    </div>
  )
}

export default Filters
