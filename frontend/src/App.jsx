import { useState } from "react";

const App = () => {

  const [input, setInput] = useState({
          description: '',
          active: false
      })
    const handleInputChange = evt => {
        setInput(prev => ({...prev, [evt.target.name]: evt.target.value}))
    }

    const handleSubmit = evt => {
        evt.preventDefault()

    }

    return (
        <>
            <h4>New note</h4>
            <form onSubmit={handleSubmit}>
                <label>Description</label>
                <input type="text" name="description" value={input.description} onChange={handleInputChange}/>
                <label>Active</label>
                <input type="checkbox" name="active" value={input.active} onChange={handleInputChange}/>
                <input type="submit">Add</input>
            </form>
        </>
    )
}
