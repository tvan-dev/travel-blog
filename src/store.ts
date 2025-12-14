import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './pages/blog/blogSlice'

export const store = configureStore({
  reducer: {
    blog: blogReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
//store.getState trả về các state toàn cục. typeof store.getState lấy type của hàm getState
//ReturnType<> lấy kiểu trả về của hàm đó
// dùng RootState để định nghĩa kiểu cho state trong useSelector. ex: useSelector((state: RootState) => state.blog.blogList)

export type AppDispatch = typeof store.dispatch
// 👉 AppDispatch = dispatch có đầy đủ type
// dispatch không chỉ nhận:

// action thường

// mà còn nhận thunk, async action, v.v. (tạo hook useAppDispatch ở file src/hooks.ts để sử dụng AppDispatch)
