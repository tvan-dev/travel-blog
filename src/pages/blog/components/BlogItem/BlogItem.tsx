import type BlogType from '../../../../types/blog.type'
import { useAppDispatch } from '../../../../hooks'
import { deleteBlog, getBlogById } from '../../blogSlice'
import { useContext } from 'react'
import { BlogContext } from '../../BlogContext'

type BlogItemProps = {
  blogItem: BlogType
}

export default function BlogItem(prop: BlogItemProps) {
  const { blogItem } = prop

  const ctx = useContext(BlogContext)
  if (!ctx) {
    throw new Error('BlogContext not found')
  }
  const { setActiveModal } = ctx

  const dispatch = useAppDispatch()
  function handleDelete() {
    dispatch(deleteBlog(blogItem.id))
  }

  function handleEdit() {
    setActiveModal('update')
    dispatch(getBlogById(blogItem.id))
  }
  return (
    <div className='flex flex-col items-center overflow-hidden rounded-lg border md:flex-row'>
      <div className='group relative block h-48 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48'>
        <img
          src={blogItem.urlImage}
          loading='lazy'
          alt='Mọi công việc thành đạt đều nhờ sự kiên trì và lòng say mê.'
          className='absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110'
        />
      </div>
      <div className='flex flex-col gap-2 p-4 lg:p-6 h-full'>
        <span className='text-sm text-gray-400'>{blogItem.publishedDate}</span>
        <h2 className='text-xl font-bold text-gray-800 flex-none'>{blogItem.title}</h2>
        <p className='text-gray-500 grow'>{blogItem.description}</p>
        <div className='flex-none'>
          <div className='inline-flex rounded-md shadow-sm' role='group'>
            <button
              type='button'
              className='rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              type='button'
              className='rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
