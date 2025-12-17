import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type BlogType from '../../types/blog.type'
import http from '../../../utils/http'

export const fetchBlogList = createAsyncThunk('blog/fetchBlogList', async () => {
  const response = await http.get<BlogType[]>('/blogs')
  return response.data
})

export const addBlog = createAsyncThunk('blog/addBog', async (body: Omit<BlogType, 'id'>) => {
  const response = await http.post<BlogType>('/blogs', body)
  return response.data
})

export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (id: string) => {
  await http.delete(`/blogs/${id}`)
  return id
})
export const getBlogById = createAsyncThunk('blog/getBlogById', async (id: string) => {
  const response = await http.get<BlogType>(`/blogs/${id}`)
  return response.data
})
export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ id, body }: { id: string; body: Omit<BlogType, 'id'> }) => {
    const response = await http.put<BlogType>(`/blogs/${id}`, body)
    return response.data
  }
)
interface BlogState {
  blogList: BlogType[]
  editingBlog: BlogType | null
}

const initialState: BlogState = {
  blogList: [],
  editingBlog: null
}

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // addBlog: (state, action: PayloadAction<Omit<BlogType, 'id'>>) => {
    //   const id = crypto.randomUUID()
    //   state.blogList.unshift({ ...action.payload, id })
    // },
    // deleteBlog: (state,action: PayloadAction<string>) => {
    //   state.blogList = state.blogList.filter(blog => blog.id !== action.payload)
    // },
    // startEditing: (state, action: PayloadAction<string>) => {
    //   const foundBlog = state.blogList.find(blog => blog.id === action.payload)
    //   if (foundBlog) {
    //     state.editingBlog = foundBlog
    //   }
    // },
    // finishEditing: (state,action: PayloadAction<BlogType>) => {
    //   const foundIndex = state.blogList.findIndex(blog => blog.id === action.payload.id)
    //   if (foundIndex !== -1) {
    //     state.blogList[foundIndex] = action.payload
    //   }
    //   state.editingBlog = null
    // },
    cancelEditing: (state) => {
      state.editingBlog = null
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogList.fulfilled, (state, action) => {
        state.blogList = action.payload
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogList.push(action.payload)
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogList = state.blogList.filter((blog) => blog.id !== action.payload)
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.editingBlog = action.payload
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const foundIndex = state.blogList.findIndex((blog) => blog.id === action.payload.id)
        if (foundIndex !== -1) {
          state.blogList[foundIndex] = action.payload
        }
        state.editingBlog = null
      })
  }
})

export const { cancelEditing } = blogSlice.actions
export default blogSlice.reducer

// Other code such as selectors can use the imported `RootState` type?
// export const selectCount = (state: RootState) => state.blog.value
