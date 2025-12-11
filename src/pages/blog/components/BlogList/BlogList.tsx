import BlogItem from "../BlogItem"
export default function BlogList() {
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-7xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>
            New Blogs
          </h2>
          <p className='mx-auto max-w-3xl text-center text-gray-500 md:text-lg'>
            "Mỗi chuyến đi là một câu chuyện."
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>

        <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
        </div>
      </div>
      
    </div>
  )
}
