const App = () => {
  const course = "Half Stack application deveopment"

  const part1 = {
    name: "Fundamental of React",
    exercises: 10
  }
  const part2 = {
    name: "Using props to pass data",
    exercises: 7
  }
  const part3 = {
    name: "State of a component",
    exercises: 14
  } 

  return (
    <div>
    <Header course = {course} />
    <Content part = {part1} />
    <Content part = {part2}/>
    <Content part = {part3}/>
    <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
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
  console.log("In content:", props)
  return (
    <div>
      <Part name={props.part.name} exercises={props.part.exercises} />
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