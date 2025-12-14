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
      state.blogList.push({ ...action.payload, id })
    }
  }
})

export const { addBlog } = blogSlice.actions
export default blogSlice.reducer

// Other code such as selectors can use the imported `RootState` type?
// export const selectCount = (state: RootState) => state.blog.value
