import Blog from './pages/blog/Blog';
function App() {
  return (
    <>
      <header className='flex items-center h-20 bg-linear-to-br from-teal-300 to-lime-300' >
        <img src="https://png.pngtree.com/png-vector/20240124/ourmid/pngtree-palm-tree-farming-outline-agriculture-plant-gardening-farming-organic-food-png-image_11478607.png" alt="" className="w-20"/>
        <p className =' font-medium text-center'>Travel Blog</p>
      </header>
      <main>
        <Blog />
      </main>
    </>
  )
}

export default App
