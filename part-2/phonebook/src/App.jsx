import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Anjeet Keshari', phone: '12345678', id: 0 },
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchKey, setSearchKey] = useState('')

  const addPerson = (e) => {
    e.preventDefault()

    const isAvailable = persons.some(
      person => person.name === newName
    )

    if (isAvailable) {
      alert(`${newName} already exists`)
      return
    }

    const personObject = {
      name: newName,
      phone: newPhone,
      id: persons.length
    }

    setPersons(persons.concat(personObject))

    setNewName('')
    setNewPhone('')
  }

  const filteredPersons = persons.filter(person =>
    person.name
      .toLowerCase()
      .includes(searchKey.toLowerCase())
  )

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter
        searchKey={searchKey}
        handleSearch={(e) => setSearchKey(e.target.value)}
      />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newPhone={newPhone}
        handlePhoneChange={(e) => setNewPhone(e.target.value)}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} />

    </div>
  )
}

export default App