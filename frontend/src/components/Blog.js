import React from 'react'
const Blog = ({blog}) => (
  <div className='blogs'>
    {blog.title} <br></br> From {blog.author} 
    <br></br>
    Likes: {blog.likes} <br></br>
    <a href={blog.url} target="_blank" rel='noreferrer'>Link</a>
  </div>  
)

export default Blog