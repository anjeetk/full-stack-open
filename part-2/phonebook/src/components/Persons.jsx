const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.phone}
    </p>
  )
}

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(person => (
        <Person
          key={person.id}
          person={person}
        />
      ))}
    </>
  )
}

export default Persons