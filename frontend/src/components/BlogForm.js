
const BlogForm = ({
  createblog,
  blogauthor,
  blogtitle,
  blogurl,
  setblogauthor,
  setblogtitle,
  setblogurl
}) => {
  return (
    <div>
      <h2>Post a blog</h2>
      <form onSubmit={createblog}>
        <input id="blog-title" type="text" name='title' value={blogtitle} onChange={setblogtitle} placeholder="Blog Title..."></input><br></br>
        <input id="blog-author" type="text" name='author' value={blogauthor} onChange={setblogauthor} placeholder="Blog Author..."></input><br></br>
        <input id="blog-url" type="text" name='url' value={blogurl} onChange={setblogurl} placeholder="Blog Url..."></input><br></br>
        <button id="postBlog" type="submit">Post Blog</button>
      </form>
    </div>
  )
}

export default BlogForm