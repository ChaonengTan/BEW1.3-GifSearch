import { useState, useRef, useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import SearchGif from './queries/searchGif'
import './App.css';

function App() {
  const [term, setInput] = useState('')
  const [searchGif, { data }] = useLazyQuery(SearchGif, {
    variables: { term }
  })
  const dataRef = useRef(data)
  const [gifs, setGifs] = useState('')
  useEffect(() => {
    if (data !== dataRef.current) {
      const display = data.searchGif.map(obj => {
        return(
          <img src={obj}></img>
        )
      })
      setGifs(display)
    }
  }, [data, dataRef])

  return (
    <div className="App">
      <form onSubmit={e => {
        e.preventDefault()
        searchGif()
      }}>
        <input onChange={e => {
          setInput(e.target.value)
        }}></input>
        <button type='submit'>Submit</button>
      </form>
      <div>{gifs}</div>
    </div>
  );
}

export default App;
