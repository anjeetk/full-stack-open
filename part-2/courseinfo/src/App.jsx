function Header(props) {
  console.log("In Header", props)
  return <h1>{props.name}</h1>
}

function Content(props) {
  console.log("In Content : ", props)

  return (
    <>
      <Parts parts={props.parts} />
      <Total exercises={props.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

function Parts({ parts }) {
  return (
    <>
      {parts.map(part => (
        <Part
          key={part.id}
          name={part.name}
          exercises={part.exercises}
        />
      ))}
      
    </>
  )
}

function Course(props) {
  console.log(props)

  return (
    <>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
    </>
  )
}

const Total =({exercises}) => {
  return (
    <>
      <b>Total number of exercises : {exercises}</b>
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App