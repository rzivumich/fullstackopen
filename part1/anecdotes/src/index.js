import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const AnecdoteOfDay = (props) => {
  console.log(props.vote)
  var maxIndex = 0
  var maxVote = props.vote[0]
  console.log(maxIndex)
  console.log(maxVote)
  console.log(props.vote.length)
  for (let i=1; i < props.vote.length; i+=1){
    if ( props.vote[i] > maxVote ) {
      maxVote = props.vote[i]
      maxIndex = i
    }
  }
  return(
    <div>
      <h1> Anecdote with most votes </h1>
      <p> {props.anecdote[maxIndex]} </p>
      <p> has {maxVote} votes </p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setvote] = useState([0, 0, 0, 0, 0, 0])
  const [max, setmax] = useState(0)

  const handleRandomClick = () => {
    setSelected(Math.round(Math.random() * 5))
  }

  const handleVoteClick = () => {
    const copy = { ...vote}
    copy[selected] += 1
    setvote(copy)
    if (copy[selected] > copy[max]) {
      setmax(selected)
    }
  }

  return (
    <div>
      <h1> Anecdote of the Day </h1>
      <p> {props.anecdotes[selected]} </p>
      <p> has {vote[selected]} votes </p>
      <Button onClick={handleVoteClick} text="vote" />
      <Button onClick={handleRandomClick} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[max]}  
      <p> with {vote[max]} votes </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)