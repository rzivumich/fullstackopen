import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notificationCreated, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(notificationCreated(content))
        setTimeout(function(){dispatch(removeNotification())}, 5000)
    }

    return (
        <form onSubmit={createAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    )
}

export default AnecdoteForm