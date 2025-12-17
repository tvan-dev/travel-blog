import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { addBlog, updateBlog, cancelEditing } from '../../blogSlice'
import type { RootState } from '../../../../store'
import type BlogType from '../../../../types/blog.type'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

type BlogFormProps = {
  onClose: () => void
  activeModal: 'create' | 'update' | null
}

const initialForm: Omit<BlogType, 'id'> = {
  title: '',
  urlImage: '',
  description: '',
  content: '',
  publishedDate: '',
  published: false
}

export default function CreateBlog({ onClose, activeModal }: BlogFormProps) {
  const [formData, setFormData] = useState<Omit<BlogType, 'id'>>(initialForm)
  const editingBlog = useAppSelector((state: RootState) => state.blog.editingBlog)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setFormData(editingBlog || initialForm)
  }, [editingBlog])

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (editingBlog) {
      dispatch(
        updateBlog({
          id: editingBlog.id,
          body: formData
        })
      )
    } else {
      dispatch(addBlog(formData))
    }
    dispatch(cancelEditing())
    setFormData(initialForm)
    onClose()
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        dispatch(cancelEditing())
        setFormData(initialForm)
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, dispatch])

  function handleCancel() {
    dispatch(cancelEditing())
    setFormData(initialForm)
    onClose()
  }
  function handleOverlayClick() {
    dispatch(cancelEditing())
    setFormData(initialForm)
    onClose()
  }

  return (
    <div className='modal-root fixed inset-0 z-50 px-4 overflow-auto'>
      <div
        className='overlay absolute inset-0 bg-black/80 backdrop-blur-sm z-40'
        onClick={handleOverlayClick}
      ></div>
      <div className='overflow-auto max-h-screen py-10 flex items-start justify-center'>
        <form className='modal-form relative z-50 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-4 shadow-xl mx-auto'>
          <div className='mb-2'>
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
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className='mb-2'>
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
              value={formData.urlImage}
              onChange={(e) => setFormData((prev) => ({ ...prev, urlImage: e.target.value }))}
            />
          </div>

          <div className='mb-2'>
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
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              ></textarea>
            </div>
          </div>

          <div className='mb-2'>
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
                className='blog-quill ql-editor block w-full rounded-lg border border-gray-500 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
                value={formData.content}
                onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
                placeholder='Write your content...'
              ></ReactQuill>
            </div>
          </div>

          <div className='mb-2'>
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
              value={formData.publishedDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, publishedDate: e.target.value }))}
            />
          </div>
          <div className='mb-2 flex items-center'>
            <input
              id='publish'
              type='checkbox'
              className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
              checked={formData.published}
              onChange={() => setFormData((prev) => ({ ...prev, published: !prev.published }))}
            />
            <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
              Publish
            </label>
          </div>
          <div>
            {activeModal === 'create' && (
              <button
                className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-gray-300  dark:hover:text-yellow-500'
                type='submit'
                onClick={handleSubmit}
              >
                <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                  Create
                </span>
              </button>
            )}

            {activeModal === 'update' && (
              <>
                <button
                  type='submit'
                  className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-yellow-500  dark:focus:ring-gray-300'
                  onClick={handleSubmit}
                >
                  <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                    Update
                  </span>
                </button>
                <button
                  type='reset'
                  className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-red-500  dark:focus:ring-gray-300'
                  onClick={handleCancel}
                >
                  <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                    Cancel
                  </span>
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
