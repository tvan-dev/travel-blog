import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../../blogSlice'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

type BlogFormProps = {
  onClose: () => void
  activeModal: 'create' | 'update' | null
}

export default function CreateBlog({ onClose, activeModal }: BlogFormProps) {
  const [title, setTitle] = useState('')
  const [urlImage, setUrlImage] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [publishedDate, setPublishedDate] = useState('')
  const [published, setPublished] = useState(false)
  const dispatch = useDispatch()
console.log(content);
  const payload = {
    title,
    urlImage,
    description,
    content,
    publishedDate,
    published
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    dispatch(addBlog(payload))
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className='modal-root fixed inset-0 z-50 flex items-center justify-center'>
      <div className='overlay absolute inset-0 bg-black/80 backdrop-blur-sm' onClick={onClose}>
        
      </div>
      <form className='modal-form relative z-100 w-[92%] rounded-2xl bg-white p-6 shadow-xl mx-auto mt-10'>
          <div className='mb-6'>
            <label
              htmlFor='title'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-500'
            >
              Title
            </label>
            <input
              type='text'
              id='title'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
              placeholder='Title'
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='featuredImage'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-500'
            >
              Featured Image
            </label>
            <input
              type='text'
              id='featuredImage'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
              placeholder='Url image'
              required
              value={urlImage}
              onChange={(e) => setUrlImage(e.target.value)}
            />
          </div>

          <div className='mb-6'>
            <div>
              <label
                htmlFor='description'
                className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-500'
              >
                Description
              </label>
              <textarea
                id='description'
                rows={3}
                className='block w-full rounded-lg border border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                placeholder='Your description...'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className='mb-6'>
            <div>
              <label
                htmlFor='content'
                className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-500'
              >
                Main content
              </label>
              <ReactQuill
                theme='snow'
                id='content'
                className='block w-full rounded-lg border border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                value={content}
                onChange={setContent}
                placeholder='Write your content...'
              ></ReactQuill>
            </div>
          </div>

          <div className='mb-6'>
            <label
              htmlFor='publishDate'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-500'
            >
              Publish Date
            </label>
            <input
              type='datetime-local'
              id='publishDate'
              className='block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
              placeholder='Title'
              required
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
            />
          </div>
          <div className='mb-6 flex items-center'>
            <input
              id='publish'
              type='checkbox'
              className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
              checked={published}
              onChange={() => setPublished((pre) => !pre)}
            />
            <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
              Publish
            </label>
          </div>

          <div>
            <button
              className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
              type='submit'
              onClick={handleSubmit}
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Create
              </span>
            </button>

            {activeModal === 'update' && (
              <button
                type='submit'
                className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800'
              >
                <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                  Update
                </span>
              </button>
            )}

            <button
              type='reset'
              className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
            >
              <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                Cancel
              </span>
            </button>
          </div>
        </form>
    </div>
  )
}
