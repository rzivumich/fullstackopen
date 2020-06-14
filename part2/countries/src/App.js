import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Country from './components/country'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const [countries, setNewCountries] = useState([])
  const [entry, setNewEntry] = useState('')
  const [display, setDisplay] = useState('')

  useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setNewCountries(response.data)
    })
  }, [])

  const handleClick = (nation) => {
    setDisplay(nation)
  }


  const displaySearch = () => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(entry.toLowerCase()))
    if(filtered.length === 1){
      return(<Country country={filtered[0]} />)
    }
    if(filtered.length > 10){
      return(<div> Too Many Countries </div>)
    }
    else if (filtered.length > 1) {
      return(
        filtered.map(nation => 
          <div key={nation.name}> 
            {nation.name}
            <Button onClick={() => handleClick(nation)} text="show" />
          </div>
        )
      )
    }
  }

  const displayResult = () => {
    if(display) {
      return(<Country country={display} />)
    }
    return null
  }

  const handleNewEntry = (event) => {
    if(event.target.value.length < entry.length){
      setDisplay('')
    }
    setNewEntry(event.target.value)
  }

  return(
    <div>
      <form>
        <div>find country <input value={entry} onChange={handleNewEntry}/></div>
      </form>
      {displaySearch()}
      {displayResult()}
    </div>
  )


}


export default App;
