import React from 'react'

const BlogForm = ({ onSubmit, title, author, url, handletitlechange, handleauthorchange, handleurlchange}) => {
  return (
    <div className="formDiv">
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          title
            <input
            type="text"
            id="title"
            name="Title"
            label="Title"
            value={title}
            onChange={handletitlechange}
          />
        </div>
        <div>
          author
            <input
            type="text"
            id="author"
            name="Author"
            label="Author"
            value={author}
            onChange={handleauthorchange}
          />
        </div>
        <div>
          url
            <input
            type="text"
            id="URL"
            name="URL"
            label="URL"
            value={url}
            onChange={handleurlchange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm