import {useState, useEffect} from 'react'
import NoteList from './Components/NotesList/NoteList.jsx'
import Filters from './Components/Filters/Filters.jsx'
import './App.css'

const showActiveButton = document.getElementById("showActive")

const App = () => {

  const [input, setInput] = useState({
    description: '',
    active: false,
    archived: false
  })

  const [noteList, setNoteList] = useState([])

  useEffect(()=>{
    getAllNotes()
  }, [])

  const getAllNotes = () => {
    try{
      const response = fetch('http://localhost:8080/')
      .then(res => res.json())
      .then(res=> {
        setNoteList(res)
      })

    }catch(err){
      console.log(err)
    }
  }

  const handleInputChange = evt => {
    setInput(prev => ({...prev, [evt.target.name]: evt.target.value}))
  }

  const handleCheckboxChange = evt => {
    setInput(prev => ({...prev, [evt.target.name]: evt.target.checked}))
  }

  const handleSubmit = async(evt) => {
    evt.preventDefault()

    setInput({...input, archived: false})

    try {
      await fetch('http://localhost:8080/', {
        method: 'post',
        body: JSON.stringify(input),
        headers: {
          'Content-type': 'application/json'
        }
      })
      getAllNotes()
    }catch(err){ console.log(err) }
  }

  const showActive = (evt) => {
    (evt.target.checked == true) ? setNoteList(noteList.filter((item) => item.active == true)) : getAllNotes()
  }

  const showArchived = (evt) => {
    (evt.target.checked == true) ? setNoteList(noteList.filter((item) => item.archived === true)) : getAllNotes()
  }

  return (
    <>
    <h1>Notes</h1>
    <hr/>
    <h4>Filters</h4>
    <Filters showActive={(evt)=>showActive(evt)} showArchived={(evt)=>showArchived(evt)}/>
    <div className="noteList">
      <NoteList list = {noteList} actions={getAllNotes}/>
    </div>
    <hr />
      <h4>Add new notes</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descriptions:</label>
          <input type="text" name="description" value={input.description} onChange={(evt) => handleInputChange(evt)} />
          <label>Active:</label>
          <input type="checkbox" name="active" value={input.active} onChange={(evt) => handleCheckboxChange(evt)} />
          <input type="submit" value="Add new note"/>
        </div>
      </form>
    </>
  )
}

export default App
