const App = () => {
  const course = {
    name : "Half Stack application deveopment",
    parts : [{
        name: "Fundamental of React",
        exercises: 10
      },{
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      } 
    ]
  };

  return (
    <div>
    <Header course = {course.name} />
    <Content parts = {course.parts} />
    <Total exercises={course.parts.map(part => part.exercises)} />
    </div>
  );
}

function Header(props){
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  console.log("In content:",props)
  return (
    <div>
     { props.parts.map((part) => <Part name={part.name} exercises={part.exercises} />)}
    </div>
  )
}


function Total(props){
  console.log("Total :" , props)
  const total = props.exercises.reduce((sum, current) => sum + current, 0)
  return (
    <>
      <p>Number of exercises = {total}</p>
    </>
  )
}
export default App