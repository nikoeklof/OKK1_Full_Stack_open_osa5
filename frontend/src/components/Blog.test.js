import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Testing-library',
    likes: 0,
    url: 'google.com'
  }


  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blogs')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

})
test('Does not display', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Testing-library',
    likes: 0,
    url: 'google.com'
  }
  render(<Blog blog={blog} />)

  expect(screen.getByText('Likes: 0')).not.toBeVisible()
  expect(screen.getByText('Link')).not.toBeVisible()
})

test('<blogform /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  render(<BlogForm createblog={createBlog} />)
  const inputTitle = screen.getByPlaceholderText('Blog Title...')
  const inputAuthor = screen.getByPlaceholderText('Blog Author...')
  const inputUrl = screen.getByPlaceholderText('Blog Url...')
  const sendButton = screen.getByText('Post Blog')
  userEvent.type(inputTitle, 'testing a form...')
  userEvent.type(inputAuthor, 'testing a form...')
  userEvent.type(inputUrl, 'testing a form...')
  userEvent.click(sendButton)


  expect(createBlog.mock.calls[0][0].content).toBe('testing a form...')
  expect(createBlog.mock.calls[0][1].content).toBe('testing a form...')
  expect(createBlog.mock.calls[0][2].content).toBe('testing a form...')
})



