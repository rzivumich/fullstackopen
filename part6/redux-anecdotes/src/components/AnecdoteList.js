import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationVoted, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdote, filter}) => {
      console.log(anecdote)
      if ( filter === '' ) {
        return anecdote
      }
      else{
        return anecdote
        .filter((anecdotes) =>
          anecdotes.content.toLowerCase().includes(filter.toLowerCase())
        )
        //.sort((a,b) => b.votes - a.votes)
    }
  })

    const vote = async (anecdote) => {
      console.log(anecdote)
      
      dispatch(addVote(anecdote))
      dispatch(notificationVoted(anecdote.content))
      setTimeout(function(){dispatch(removeNotification())}, 5000)
      
    }

    return (
        <div>
        {anecdotes
            .sort((a,b) => b.votes - a.votes)
            .map(anecdote =>
              <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>has {anecdote.votes}
                  <button onClick={() =>vote(anecdote)
                  }>vote</button>
                </div>
              </div>
        )}   
        </div>    
    )
}

export default Anecdotes