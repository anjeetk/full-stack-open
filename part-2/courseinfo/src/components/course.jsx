function Header({name}){
  console.log("In Header : ", name)
  return (<h1>{name}</h1>)
}

const Part = ({name, exercises}) => {
  return (<>
    <p>{name} {exercises}</p>
  </>)
}

const Content = ({parts}) => {
  console.log("In content", parts)
  return( 
      <>
      {parts.map(part => <Part name = {part.name} exercises =  {part.exercises}></Part>)}
      </>
      )
}

const Total = ({total}) => <p><b>Total of {total} exercises</b></p>

export default function Course({course}) {
  console.log("In course", course);
  return (
    <>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
      <Total total = {course.parts.reduce((sum, part) => sum + part.exercises, 0)}/>
    </>
  )
}
