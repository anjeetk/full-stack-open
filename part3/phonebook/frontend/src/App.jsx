import { useState, useEffect } from 'react'

import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'
import Notification from './components/Notiffication'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [persons])

  const addPerson = (event) => {
    event.preventDefault()

    const exists = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (exists) {

      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (!confirmUpdate) return

      const updatedPerson = {
        ...exists,
        number: newNumber
      }

      personServices
        .update(exists.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(
            persons.map(person =>
              person.id !== exists.id
                ? person
                : returnedPerson
            )
          )
        })

      setNewName('')
      setNewNumber('')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personServices
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))

        setNotification(
          `${returnedPerson.name} Added in phonebook`
        )
        setNotificationType('success')

        setTimeout(() => {
          setNotification(null)
        }, 5000)
            setNewName('')
            setNewNumber('')
      })
  }

  const deletePerson = (id) => {

    const person = persons.find(p => p.id === id)

    const confirmDelete = window.confirm(
      `Delete ${person.name}?`
    )

    if (!confirmDelete) return

    personServices
      .remove(id)
      .then(() => {
        setPersons(
          persons.filter(person => person.id !== id)
        )
        setMessage('Successfully deleted.')
        setTimeout(() => setMessage(''), 2000)
      })
      
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1>Welcome in Our Application!!</h1>

      <h2>Phonebook</h2>

      <Notification
        message={notification}
        type={notificationType}
      />

      <Filter
        search={search}
        handleSearch={handleSearch}
      />

      <h2>Add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        persons={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App