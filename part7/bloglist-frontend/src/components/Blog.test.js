import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



describe('Tests Blogs', () => {
    const blog = {
        title: "Test Blog",
        author: "Test Author",
        url: "testurl.com",
        likes: 5
    }

    const user = {
        username: 'test_user',
        name: 'Test User'
    }

    const mockHandlerLike = jest.fn()
    const mockHandlerRemove = jest.fn()
    
    let component

    beforeEach(() => {
        component = render(
            <Blog blog={blog} user={user} updateLikes={mockHandlerLike} removeBlog={mockHandlerRemove} />
    )})

    test('Renders Title and Author', () =>{
        expect(component.container).toHaveTextContent(
            `${blog.title} ${blog.author}`
        )

        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('show')
        fireEvent.click(button)
    
        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
      })

    test('double clicking like button', () => {
        const button = component.getByText('show')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandlerLike.mock.calls).toHaveLength(2)
    })
})