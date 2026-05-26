const express = require("express")
const morgan = require('morgan')

app = express()

app.use(express.json())

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

const logger = morgan(
  ':method :url :status :response-time ms - body: :body'
);

app.use(logger);

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => res.send('Hello world'))

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/info', (req, res) => {
    const people = persons.length
    const currDate = new Date()

    res.status(200).send(`phonebook has info of ${people} peoples\n\n`+currDate)
})

app.get('/info/:id', (req, res) => {
    const people = persons.length
    const id = req.params.id;
    if(id > people) res.status(404).send('Invalid id')
    res.status(200).json(persons[id - 1])
})

app.delete('/info/:id', (req, res) => {
    const id = req.params.id;

    const personExists = persons.some(person => person.id === id);

    if (!personExists) {
        return res.status(404).send('Invalid id');
    }

    persons = persons.filter(person => person.id !== id);

    console.log(persons);

    res.status(200).send('Successfully deleted');
});

app.post('/api/persons', (req, res) => {
  let obj = req.body;

  if(!obj.name || !obj.number){
    return res.status(400).send('name or number is missing.')
  }

  const exist = persons.some(person => person.name === obj.name)

  if(exist){
    return res.status(400).json({ error: 'name must be unique' })
  }
  obj = {'id' : parseInt(Math.random() * (persons.length , persons.length + 5) + persons.length), ...obj}
  persons.push(obj)

  console.log(persons)
  res.status(201).send(obj.name+ ' added in database')
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
