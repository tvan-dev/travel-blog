import CreateBlog from "./components/CreateBlog"  
import BlogList from "./components/BlogList"

export default function Blog() {
  return <div className='p-5'>
    <CreateBlog />
    <BlogList />
  </div>
}
