/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import NotificationConfirm from './components/NotificationConfirm'
import NotificationError from './components/NotificationError'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import RegisterForm from './components/RegisterForm'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [registerVisible, setRegisterVisible] = useState(false)
  const [blogformVisible, setBlogFormVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirmMessage, setConfirmMessage] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [name, setName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')

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
    }
  }, [])
  const registerNewUser = async (event) => {
    event.preventDefault()
    if (newUsername !== '' && newPassword !== '' && name !== '') {
      try {
        const user = await loginService.register({
          'username': newUsername, 'password': newPassword, 'name': name
        })
        setConfirmMessage(`User ${name} created succesfully!`)
        setTimeout(() => {
          setConfirmMessage(null)
        }, 4000)
      } catch (exception) {
        setErrorMessage(exception)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      }
    } else {
      setErrorMessage('Check register form, invalid username, password or display name!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }


  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }


    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handlelogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  const registerForm = () => {
    const hideWhenVisible = { display: registerVisible ? 'none' : '' }
    const showWhenVisible = { display: registerVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setRegisterVisible(true)}>Register</button>
        </div>
        <div style={showWhenVisible}>
          < RegisterForm
            registerNewUser={registerNewUser}
            setNewUsername={({ target }) => setNewUsername(target.value)}
            setNewPassword={({ target }) => setNewPassword(target.value)}
            setName={({ target }) => setName(target.value)}
            newUsername={newUsername}
            newPassword={newPassword}
            name={name}
          />
          <button onClick={() => setRegisterVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  const addLike = async (id) => {
    try {
      const likedBlog = blogs.find(blog => id === blog.id)

      blogService.addLikes(likedBlog)
      setConfirmMessage(`You Liked the blog: ${likedBlog.title} by ${likedBlog.author}`)
      setTimeout(() => {
        setConfirmMessage(null)
      }, 4000)

    } catch (exception) {
      setErrorMessage('Couldn\'t add likes to set blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }
  const removeBlog = async (id) => {
    const selectedBlog = blogs.find(blog => id === blog.id)

    if (window.confirm(`Are you sure you want to delete blog ${selectedBlog.title} by ${selectedBlog.author}?`)) {
      try {
        const token = user.token
        blogService.deleteBlog(selectedBlog.id, token).then(() => {
          blogService.getAll().then(blogs =>
            setBlogs(blogs)

          )
        })

      } catch (exception) {
        setErrorMessage(exception)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      }
    } else {
      return
    }
  }
  const createBlog = async (event) => {
    event.preventDefault()

    try {
      const token = user.token
      const blog = { author: blogAuthor, url: blogUrl, title: blogTitle, likes: 0 }
      if (blog.author !== '' && blog.url !== '' && blog.title !== '') {
        blogService.newBlog(blog, token)

      } else {
        setErrorMessage('Invalid blog information, Check form!')
        return setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      }
      setConfirmMessage(`Added ${blog.title} from ${blog.author}`)
      setBlogFormVisible(false)

      setTimeout(() => {
        setConfirmMessage(null)
      }, 4000)


    } catch (exception) {
      setErrorMessage('Invalid token or backend error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }

    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }
  const blogForm = () => {
    const hideWhenVisible = { display: blogformVisible ? 'none' : '' }
    const showWhenVisible = { display: blogformVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>Create blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            blogauthor={blogAuthor}
            blogtitle={blogTitle}
            blogurl={blogUrl}
            setblogtitle={({ target }) => setBlogTitle(target.value)}
            setblogauthor={({ target }) => setBlogAuthor(target.value)}
            setblogurl={({ target }) => setBlogUrl(target.value)}
            createblog={createBlog}
          />
          <button onClick={() => setBlogFormVisible(false)}>Cancel</button>

        </div>
      </div>
    )

  }




  return (
    <div>
      <NotificationError message={errorMessage} />
      <NotificationConfirm message={confirmMessage} />
      {user === null ? loginForm() : <div>
        <p>{user.name} logged in </p><button onClick={() => {
          setUser(null)
          setUsername('')
          setPassword('')
          window.localStorage.setItem(
            'loggedNoteappUser', null
          )
        }} >Logout</button>
        <br></br>

        {blogForm()}
      </div>

      }
      {user === null ? registerForm() : <div></div>}

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} userBlogs={user === null ? undefined : user.blogs} />
      )}
    </div>
  )
}

export default App