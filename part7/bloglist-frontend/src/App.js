import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const NewBlogNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="newBlog">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogMessage, setBlogMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    localStorage.clear();
    setUser(null)
    blogService.setToken(user.token)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setUsername('')
        setAuthor('')
        setURL('')
        setBlogMessage(
          `a new blog ${blogObject.title} by ${blogObject.author} was added`
        )
        setTimeout(() => {
          setBlogMessage(null)
        }, 5000)
      })

  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm
        onSubmit={addBlog}
        title={title}
        author={author}
        url={url}
        handletitlechange={({target}) => setTitle(target.value)} 
        handleauthorchange={({target}) => setAuthor(target.value)}
        handleurlchange={({target}) => setURL(target.value)}
      />
    </Togglable>
  )

  const addLikes = async (id, blogObject) => {
    try{
      await blogService.update(id, blogObject)

      const updatedBlog = {
        ...blogObject,
        id
      }
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try{
      const blog = blogs.filter((blog) => blog.id === id)

      if (window.confirm(`Remove ${blog[0].title} by ${blog[0].author}`)) {

        await blogService.remove(id)

        setBlogs(blogs.filter((blog) => blog.id !== id))
      }
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user == null) {
    return (
      <div>
        <h2>Log in to Application</h2>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <NewBlogNotification message={blogMessage} />
      <form onSubmit={handleLogOut}>
        <div>
          {user.name} is logged in <button type="submit">logout</button>
        </div>
      </form>

      {blogForm()}
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={addLikes} removeBlog={deleteBlog} user={user} />
      )}
    </div >
  )
}

export default App
