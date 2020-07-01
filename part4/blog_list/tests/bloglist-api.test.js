const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of helper.exampleList) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have unique identifier', async () =>{
    const blogsAtStart = await helper.blogsInDb()

    const blogInView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogInView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
    expect(blogInView.id).toBeDefined()    
    expect(resultBlog.body).toEqual(blogInView)
})

describe('adding new blogs', () =>{

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .then((res) => {
        return (token = res.body.token)
      })

    return token

  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      _id: "5a422a851b54a275034d17f9",
      title: "New Blog",
      author: "Roy Ziv",
      url: "https://royblogs.com/",
      likes: 4,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.exampleList.length + 1)

    const authors = blogsAtEnd.map(n => n.author)
    expect(authors).toContain(
      'Roy Ziv'
    )
  })

  test('new blogs default to 0 likes', async () => {
    const newBlog = {
      title: "New Blog",
      author: "Roy Ziv",
      url: "https://royblogs.com/",
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.exampleList.length + 1)

    for (var i = 0; i < blogsAtEnd.length; ++i) {
      if (blogsAtEnd[i].author == "Roy Ziv") {
        expect(blogsAtEnd[i].likes).toEqual(0)
      }
    }
  })

  test('a blog without a title or url cannot be posted', async () => {
    const badBlog1 = {
      author: "Roy Ziv",
      url: "https://royblogs.com/",
      likes: 4
    }

    const badBlog2 = {
      title: "New Blog",
      author: "Roy Ziv",
      likes: 8
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(badBlog1)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(badBlog2)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.exampleList.length)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'alsosekret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})