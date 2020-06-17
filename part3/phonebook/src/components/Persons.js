import React from 'react'

const Persons = ({ person, filter}) => {
  if(filter === '' || person.name.toLowerCase().includes(filter.toLowerCase()) === true){
    return (
        <li>{person.name} {person.number}</li>
    )
  }
  else{ 
    return ''
  }
}

export default Persons