/* eslint-disable react/display-name */
import { useRef } from 'react'
import { useState, useImperativeHandle, forwardRef } from 'react'
const Blog = ({ blog, addLike, userBlogs, removeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility
      }
    })
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  })
  const reference = useRef(blog.id)

  if (userBlogs !== undefined) {

    for (let i = 0; i < userBlogs.length; i++) {
      if (userBlogs[i] === blog.id) {

        return (
          <div className='blogs' style={blogStyle}>

            {blog.title} < br ></br> From {blog.author}

            <Togglable buttonLabel="Show" ref={reference}>
              Likes: {blog.likes} <button onClick={() => addLike(blog.id)}>Like</button> <br></br>
              <a href={blog.url} target="_blank" rel='noreferrer'>Link</a> <br></br>
              <button onClick={() => removeBlog(blog.id)}>Remove</button>
            </Togglable>
          </div>
        )

      }
    }
    return (
      <div className='blogs' style={blogStyle}>

        {blog.title} < br ></br> From {blog.author}

        <Togglable buttonLabel="Show" ref={reference}>
          Likes: {blog.likes} <button onClick={() => addLike(blog.id)}>Like</button> <br></br>
          <a href={blog.url} target="_blank" rel='noreferrer'>Link</a> <br></br>

        </Togglable>
      </div>
    )

  } else {
    return (
      <div className='blogs' style={blogStyle}>

        {blog.title} < br ></br> From {blog.author}

        <Togglable buttonLabel="Show" ref={reference}>
          Likes: {blog.likes} <button onClick={() => addLike(blog.id)}>Like</button> <br></br>
          <a href={blog.url} target="_blank" rel='noreferrer'>Link</a> <br></br>

        </Togglable>
      </div>
    )
  }
}
export default Blog