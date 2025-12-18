# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

````js
export default defineConfig([
  # Travel Blog 🧳

  **Travel Blog** là một ứng dụng demo xây dựng bằng **React + TypeScript + Vite** kết hợp **Redux Toolkit** cho quản lý state, cùng **Tailwind CSS** cho styling. Mục tiêu của dự án: demo CRUD cho bài viết (blog), rich-text editor và luồng dữ liệu đơn giản.

  ---

  ## 🚀 Tính năng chính

  - Danh sách bài blog (fetch từ API)
  - Thêm, sửa, xóa bài blog (CRUD)
  - Trình soạn thảo nội dung (rich-text)
  - Quản lý trạng thái bằng Redux Toolkit

  ---

  ## ⚙️ Công nghệ

  - React
  - TypeScript
  - Vite
  - Redux Toolkit
  - React-Quill / Quill (rich text)
  - Tailwind CSS
  - Axios (HTTP client)

  ---

  ## 🔩 Cài đặt & chạy dự án

  Yêu cầu: Node.js (>=16) và npm hoặc pnpm/yarn.

  1. Cài dependencies:

  ```bash
  npm install
  # hoặc
  # pnpm install
  # yarn
````

2. Chạy môi trường phát triển:

```bash
npm run dev
```

3. Build để deploy:

```bash
npm run build
```

4. Xem bản build local preview:

```bash
npm run preview
```

### Scripts chính (trong `package.json`)

- `dev` - chạy Vite dev server
- `build` - build ứng dụng (kèm tsc project references)
- `preview` - preview bản build
- `lint` / `lint:fix` - eslint
- `prettier` / `prettier:fix` - kiểm tra/format code bằng Prettier

---

## 🗂️ Cấu trúc thư mục chính

- `src/` - mã nguồn frontend
  - `pages/blog/` - logic và components liên quan đến blog (ví dụ: `Blog.tsx`, `blogSlice.ts`)
  - `utils/http.ts` - instance axios (base URL và interceptors)
  - `store.ts` - cấu hình Redux store
- `public/` - static

---

## 🧪 API / Mock server

Dự án có thể dùng một mock JSON server nếu cần (không kèm sẵn). Nếu bạn muốn chạy server mock:

```bash
# cài json-server nếu chưa có
npm i -g json-server
# chạy mock server (giả sử bạn có file server/db.json)
json-server --watch server/db.json --port 3001
```

Lưu ý: kiểm tra `utils/http.ts` để đảm bảo base URL trỏ đúng API.

---

## ✅ Một vài lưu ý phát triển

- `src/pages/blog/blogSlice.ts` chứa các async thunks (fetch/add/update/delete). Bạn có thể mở rộng state để chứa `isLoading` và `error` để UI hiển thị trạng thái tải/loi.
- Nếu muốn bài mới hiển thị lên đầu danh sách, thay `.push()` thành `.unshift()` trong `addBlog.fulfilled`.
- Dọn comment/dead code nếu không dùng để giữ repo gọn.

---

## 🤝 Contribute

Rất hoan nghênh PR và issues. Vui lòng đảm bảo lint & format trước khi gửi PR.

---


