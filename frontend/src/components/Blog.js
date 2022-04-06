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
      <div id='blogDiv'>
        <div style={hideWhenVisible}>
          <button id='showBlog' onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible} className="togglableContent">
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

            <a> {blog.title} < br ></br> From {blog.author}</a>
            <div className='hiddenByDefault'>
              <Togglable buttonLabel="Show" ref={reference}>
                <p role="blogLikes"> Likes: {blog.likes}</p><button onClick={() => addLike(blog.id)}>Like</button><br></br>
                <a href={blog.url} target="_blank" rel='noreferrer' role="blogUrl">Link</a> <br></br>

                <button id='removeBlog' onClick={() => removeBlog(blog.id)}>Remove</button>
              </Togglable>
            </div>
          </div>
        )

      }
    }
    return (
      <div className='blogs' style={blogStyle}>

        <a> {blog.title} < br ></br> From {blog.author}</a>
        <div className='hiddenByDefault'>
          <Togglable buttonLabel="Show" ref={reference}>
            <p role="blogLikes"> Likes: {blog.likes}</p><button onClick={() => addLike(blog.id)}>Like</button><br></br>
            <a href={blog.url} target="_blank" rel='noreferrer' role="blogUrl">Link</a> <br></br>


          </Togglable>
        </div>
      </div>
    )

  } else {
    return (
      <div className='blogs' style={blogStyle}>

        <a> {blog.title} < br ></br> From {blog.author}</a>
        <div className='hiddenByDefault'>
          <Togglable buttonLabel="Show" ref={reference}>
            <p role="blogLikes"> Likes: {blog.likes}</p><button onClick={() => addLike(blog.id)}>Like</button><br></br>
            <a href={blog.url} target="_blank" rel='noreferrer' role="blogUrl">Link</a> <br></br>


          </Togglable>
        </div>
      </div>
    )
  }
}
export default Blog