import React, { useState, useEffect } from 'react'
import Note from '../Note/Note.jsx'

const NoteList = ({ list, actions }) => {

  const [noteList, setNoteList] = useState(list)

  useEffect(() => {
    setNoteList(list)
  }, [list])

    return (
        <div>
            <div>
            {noteList
            ? <div>
                {
                    noteList.map((oneItem)=>{
                        return(
                            <Note key={oneItem._id} data={oneItem} actions={actions}></Note>
                        )
                    })
                }
                </div>
                : <p>Notes not available...</p>}
            </div>
        </div>
    )
}

export default NoteList
