import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Content from './components/Content'
import Notification from './components/Notification'
import personService from './services/persons'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [allPersons, setAllPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setAllPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = allPersons.filter((person) =>
      person.name === newName
    )

    const personToAdd = person[0]
    const updatedPerson = { ...personToAdd, number: newNumber }

    if (person.length !== 0) {
      if (window.confirm(`${personToAdd.name} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setAllPersons(allPersons.map(personItem =>
              personItem.id !== personToAdd.id ? personItem : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            setMessage(`${updatedPerson.name} was successfully updated`)
            setTimeout(() => { setMessage(null) }, 5000)
          })
          .catch(() => {
            setAllPersons(allPersons.filter(p => p.id !== updatedPerson.id))
            setNewName('')
            setNewNumber('')
            setMessage(`[ERROR] ${updatedPerson.name} was already deleted from server`)
            setTimeout(() => { setMessage(null) }, 5000)
          })
      }
    } else {
      const personToCreate = { name: newName, number: newNumber }
      personService
        .create(personToCreate)
        .then(returnedPerson => {
          setAllPersons(allPersons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`${newName} was successfully added`)
          setTimeout(() => { setMessage(null) }, 5000)
        })
        .catch(error => {
          const errMsg = error.response?.data?.error || 'Unknown error'
          setMessage(`[ERROR] ${errMsg}`)
          setTimeout(() => { setMessage(null) }, 5000)
        })
    }
  }

  const deletePerson = (id) => {
    const filteredPerson = allPersons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    if (window.confirm(`Delete ${personName}?`)) {
      personService.remove(id)
      setAllPersons(allPersons.filter(person => person.id !== id))
      setMessage(`${personName} was successfully deleted`)
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const regex = new RegExp(event.target.value, 'i')
    setPersons(allPersons.filter(person => person.name.match(regex)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Add new person</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Content persons={persons} allPersons={allPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
