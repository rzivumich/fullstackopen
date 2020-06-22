import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/personService'
import './index.css'

axios
    .get('http://localhost:3001/api/persons')
    .then(response => {
        const persons = response.data
        console.log(persons)
    })


const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'notes')

    const addName = (event) => {
        event.preventDefault()
        const NameObject = {
            name: newName,
            number: newNumber
        }
        if (persons.some(el =>
            el.name === NameObject.name && el.number === NameObject.number)) {
            window.alert(NameObject.name + " is already added to Phonebook")
        }

        else if (persons.some(el =>
            el.name === NameObject.name)) {
            var r = window.confirm(NameObject.name + " is already added to Phonebook, replace old number with a new one?")
            if (r === true) {
                const person = persons.find(p => p.name === NameObject.name)
                personService
                    .update(person.id, NameObject)
                    .catch(error => {
                        setErrorMessage(
                            `Information of '${NameObject.name}' has already been removed from server`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
                    .then(response => {
                        console.log(response)
                        setNewName('')
                        setNewNumber('')
                    })
            }
        }

        else {
            setPersons(persons.concat(NameObject))
            personService
                .create(NameObject)
                .then(response => {
                    console.log(response)
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    if(NameObject.name.length < 3){
                        setErrorMessage(
                            `Person Validation Failed: Name '${NameObject.name}' is shorter than the minimum allowed length (3)` 
                        )
                    }
                    else{
                        setErrorMessage(
                            `Person Validation Failed: Number '${NameObject.number}' is shorter than the minimum allowed length (8)` 
                        )
                    }
                    console.log(error.response.data)
                })
        }
    }

    const deleteName = ({ person }) => {
        console.log(person)
        var r = window.confirm("Delete " + person.name + "?")
        if (r === true) {
            personService
                .deletePerson(person.id)
                .then(response => {
                    console.log(response)
                })
        }
        
    }


    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} />
            <form>
                <div> filter shown with <input value={newFilter} onChange={handleFilterChange} /></div>
            </form>
            <h2> add a new</h2>
            <form onSubmit={addName}>
                <div>name: <input value={newName} onChange={handleNameChange}/></div>
                <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <form onSubmit={deleteName}>
                <ul>
                    <div>
                        {persons.map((person, i) => (
                            <div key={i}>
                                <Persons key={person.number} person={person} filter={newFilter} />
                                <button onClick={() => deleteName({ person})}>delete</button>
                            </div>
                        ))}
                    </div>
                </ul>
            </form>
    </div>
    )
}

export default App