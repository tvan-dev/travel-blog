import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import initialBlogList from './data/initialBlogList'
import type BlogType from '../../types/blog.type'

interface BlogState {
  blogList: BlogType[]
  editingBlog: BlogType | null
}

const initialState: BlogState = {
  blogList: initialBlogList,
  editingBlog: null
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<Omit<BlogType, 'id'>>) => {
      const id = crypto.randomUUID()
      state.blogList.unshift({ ...action.payload, id })
    },
    deleteBlog: (state,action: PayloadAction<string>) => {
      state.blogList = state.blogList.filter(blog => blog.id !== action.payload)
    },
    startEditing: (state, action: PayloadAction<string>) => {
      const foundBlog = state.blogList.find(blog => blog.id === action.payload)
      if (foundBlog) {
        state.editingBlog = foundBlog
      }
    },
    finishEditing: (state,action: PayloadAction<BlogType>) => {
      const foundIndex = state.blogList.findIndex(blog => blog.id === action.payload.id)
      if (foundIndex !== -1) {
        state.blogList[foundIndex] = action.payload
      }
      state.editingBlog = null
    },
    cancelEditing: (state) => {
      state.editingBlog = null
    }

  }
})

export const { addBlog,deleteBlog, startEditing, finishEditing, cancelEditing } = blogSlice.actions
export default blogSlice.reducer

// Other code such as selectors can use the imported `RootState` type?
// export const selectCount = (state: RootState) => state.blog.value
