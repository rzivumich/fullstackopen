import anecdoteService from '../services/anecdotes'

const anecdotereducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'New_Anecdote':
      return [...state, action.data]
    case 'Init_Anecdote':
      return action.data
    case 'Vote':
      const id = action.data.id
      const AnecdoteToChange = state.find(n => n.id === id)
      const ChangedAnecdote = {
        ...AnecdoteToChange,
        votes: AnecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : ChangedAnecdote)
    
    default:
      return state
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'New_Anecdote',
      newAnecdote
    })
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const newAnec = {
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
    const newAnecdote = await anecdoteService.update(anecdote.id, newAnec)
    dispatch({
      type: 'Vote',
      data: { id: anecdote.id }
    })
  }
}

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch({
      type: 'Init_Anecdote',
      data: anecdote,
    })
  }
}

export default anecdotereducer