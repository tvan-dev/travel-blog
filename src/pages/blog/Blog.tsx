import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { useState } from 'react'
import { BlogContext } from './BlogContext'



export default function Blog() {
  const [activeModal, setActiveModal] = useState<'create' | 'update' | null>(null)

  return (
    <BlogContext.Provider value={{ activeModal, setActiveModal }}>
      <div className='p-5'>
        <button
          className='p-2 rounded-lg bg-linear-to-br from-purple-500 to-blue-400  text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500'
          onClick={() => setActiveModal('create')}
        >
          Create Blog
        </button>

        {activeModal && <BlogForm onClose={() => setActiveModal(null)} activeModal={activeModal} />}

        <BlogList />
      </div>
    </BlogContext.Provider>
  )
}
