import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('BlogForm Tests', () => {
    test('creating a new blog via forms', () => {

        const createBlog = jest.fn()
        const TitleChange = jest.fn()
        const AuthorChange = jest.fn()
        const URLchange = jest.fn()

        const blog = {
            title: "Test Blog",
            author: "Test Author",
            url: "testurl.com",
        }

        const component = render(
            <BlogForm onSubmit={createBlog} title={blog.title}
                author={blog.author} url={blog.url}
                handletitlechange={TitleChange} handleauthorchange={AuthorChange}
                handleurlchange={URLchange}
            />
        )

        const inputTitle = component.container.querySelector('#title')
        const inputAuthor = component.container.querySelector('#author')
        const inputURL = component.container.querySelector('#URL')
        
        const form = component.container.querySelector('form')

        
        fireEvent.change(inputTitle, {
            target: { value: 'Blog Title' },
          })
        fireEvent.change(inputAuthor, {
            target: { value: blog.author }
        })
        fireEvent.change(inputURL, {
            target: { value: blog.url }
        })
        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
    })
})