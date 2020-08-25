import React, { useState } from 'react'

const ToggleBlogs = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = {
        display: visible ? '' : 'none',
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    console.log(props.children.props.blog)
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                {props.children.props.blog.title} <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children} <button onClick={toggleVisibility}>hide</button>
            </div>
        </div>
    )
}

export default ToggleBlogs