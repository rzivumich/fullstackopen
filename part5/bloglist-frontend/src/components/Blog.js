import React, { useState } from 'react'



const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [InfoVisible, setInfoVisible] = useState(false)
  
  const hideWhenVisible = { 
    display: InfoVisible ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = { 
    display: InfoVisible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
   }


  const addLike = () => {
    const {id, url, author, title} = blog

    const updatedBlog = {
      author: author,
      title: title,
      url: url,
      user: blog.user?.id || user,
      likes: blog.likes + 1
    }

    updateLikes(id, updatedBlog)
  }

  const deleteBlog = () => {
    const {id} = blog
    removeBlog(id)
  }

  return (
    <div className="Blog">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setInfoVisible(true)}>show</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.title} {blog.author} <button onClick={() => setInfoVisible(false)}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={() => addLike()}>like</button></div>
        <div>{user.name}</div>
        <div><button onClick={() => deleteBlog()}>remove</button></div>
      </div>
    </div>
  )
}

export default Blog
