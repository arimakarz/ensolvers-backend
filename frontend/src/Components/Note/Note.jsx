import React from 'react'
import { useState } from 'react'
import './Note.css'

const Note = ({ data, actions }) => {

  const [oneNote, setOneNote] = useState(data)
  const [text, setText] = useState((oneNote.archived) ? "Unarchive" : "Archive")

  const handlerActiveStatus = (evt) => {
    setOneNote(prev => ({...prev, active: evt.target.checked}))
  }

  const handlerDescriptionUpdate = (evt) => {
    setOneNote(prev => ({...prev, description: evt.target.value}))
  }

  const updateNote = async() => {
    try {
      await fetch(`http://localhost:8080/${oneNote._id}`, {
        method: 'put',
        body: JSON.stringify(oneNote),
        headers: {
          'Content-type': 'application/json'
        }
      })
      actions()
    }catch(err){ console.log(err) }
  }

  const archiveNote = async() => {
    const status = (oneNote.archived == false) ? true : false 
    const updatedNote = {...oneNote, archived: status}

    try {
      await fetch(`http://localhost:8080/${oneNote._id}`, {
        method: 'put',
        body: JSON.stringify(updatedNote),
        headers: {
          'Content-type': 'application/json'
        }
      })
        setText((status == false) ? "Archive" : "Unarchive")
      }catch(err){ console.log(err) }

  }

  const deleteNote = async(id) => {
    try {
      await fetch(`http://localhost:8080/${id}`, {
        method: 'delete',
        headers: {
          'Content-type': 'application/json'
        }
      })
      actions()
    }catch(err){ console.log(err) }
  }

  return (
    <div>
        <input type="text" value={ oneNote.description } onChange={(evt) => handlerDescriptionUpdate(evt)}/>
        <input name="checkedNote" type="checkbox" checked={ oneNote.active } onChange={(evt) => handlerActiveStatus(evt)}/>
        <label htmlFor="checkedNote">Active</label>
        <button className="button" name="archive_button" onClick={() => archiveNote()}>{text}</button>
        <button className="button" name="update_button" onClick={() => updateNote()}>Update</button>
        <button className="button" name="delete_button" onClick={() => deleteNote(data._id)}>Delete</button>
    </div>
  )
}

export default Note
