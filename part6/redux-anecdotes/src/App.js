import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'
import VisibilityFilter from './components/VisibilityFilter'
import anecdoteService from './services/anecdotes'
import { initializeAnecdote } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdote()) 
  },[dispatch]) 
  
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <VisibilityFilter />
      <Anecdotes />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App