import React from 'react';
import ReactDOM from 'react-dom';

const Total = ({ parts }) => {
  const total = parts.reduce( (s, p) => {
    console.log('what is happening', s, p)
    return s + p.exercises
  }, 0)
  return(
    <p>Number of exercises {total}</p>
  ) 
}

const Content = ({ part }) => {
  return (
    <li>{part.name} {part.exercises}</li>
  )
}

const Course = ({ course }) => {
  console.log(course.name)
  return (
    <div>
      <h1>{course.name} </h1>
      <ul>
        {course.parts.map((part) =>
          <Content key={part.id} part={part} />
        )}
      </ul>
      <Total parts={course.parts} />
    </div>
  )
}

export default Course