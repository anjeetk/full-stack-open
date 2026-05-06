import {useState} from 'react'

function Header(props){
  return (
    <h1>{props.name}</h1>
  )
}

function StatisticsLine(props){
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )
}

function Stats(props){
  console.log("In stats", props)

  const updatedGood = props.good
  const updatedBad = props.bad
  const updatedNeutral = props.neutral

  if(updatedGood === 0 && updatedBad === 0 && updatedNeutral === 0){
    return <p>No feedback given.</p>
  }

  const updatedTotal = updatedBad + updatedGood + updatedNeutral
  const updatedAverage = (updatedGood - updatedBad)/updatedTotal
  const updatedPositive = 1.0 * updatedGood / updatedTotal * 100

  return (
  <>
    <h2>{props.title}</h2>
    <table>
      <tbody>
        <StatisticsLine text = "Good" value = {props.good}></StatisticsLine>
        <StatisticsLine text = "Bad" value = {props.bad}></StatisticsLine>
        <StatisticsLine text = "Neutral" value = {props.neutral}></StatisticsLine>
        <StatisticsLine text = "Total" value = {updatedTotal}></StatisticsLine>
        <StatisticsLine text = "Average" value = {updatedAverage}></StatisticsLine>
        <StatisticsLine text = "Positive" value = {updatedPositive + "%"}></StatisticsLine>
      </tbody>
    </table>
  </>
  )
}

function Button(props){
  console.log("In Button ", props)
  return <button onClick = {props.handleClick}>{props.value}</button>
}

export default function App(){

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => setGood(good + 1)
  const updateNeutral = () => setNeutral(neutral + 1)
  const updateBad = () => setBad(bad + 1)

  return (
    <>
      <Header name = {"give feedback"} />

      <Button value = 'good' handleClick = {updateGood}></Button>
      <Button value = 'neutral' handleClick = {updateNeutral}></Button>
      <Button value = 'bad' handleClick = {updateBad}></Button>

      <Stats title = "Statistics" good = {good} bad = {bad} neutral = {neutral}></Stats>
    </>
  )
}