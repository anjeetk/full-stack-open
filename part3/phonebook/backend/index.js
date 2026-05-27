const express = require("express")
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(cors())

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    JSON.stringify(req.body),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

const requestLogger = (req, res, next) => {
    console.log('Method :', req.method)
    console.log('Body :', req.body)
    console.log('Path :', req.path)
    console.log('----')
    next();
}

app.use(requestLogger)

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

app.get('/', (req, res) => {
    res.send("<h1>Welcome to phonebook app</h1>")
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res)=>{
    const id = req.params.id
    const note = persons.find(person => person.id === id)
    if(note){
        res.status(200).send(note)
    }else{
        res.status(404).send("<p>data not found</p>")
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phonebook has information of ${persons.length} peoples</p>
            <p>${date}</p>`)
})

app.post('/api/persons', (req, res) => {
    let name = req.body?.name
    let number = req.body?.number

    if(!name || !number){
        res.status(400).send("Name or number is missing")
    }

    let isExist = persons.find(person => person.name === name)

    if(isExist)
        res.status(400).json({'error' : "name must be unique"})

    newPerson = { id : parseInt(Math.random() * 100), name, number}
    console.log(newPerson)
    persons = persons.concat(newPerson)
    console.log(persons)
    res.status(200).send('Data inserted successfully')
})
const PORT = 3001

app.listen(PORT, () => console.log(`Backend is running on ${PORT}`))