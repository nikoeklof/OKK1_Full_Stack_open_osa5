import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author:'Testing-library',
    likes: 0,
    url:'google.com'
  }


  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blogs')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})