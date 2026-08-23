import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AdminDashboard } from './pages/AdminDashboard'
import { NewProductForm } from './components/NewProductForm'
import { useState ,useEffect } from 'react'
import './pages/AdminDashboard.css'
import './pages/index.css'
import './components/BookMartAdmin.css'
import './components/ProductForm.css'

function App() {
  useEffect(()=>{
      if(!localStorage.getItem('products')){
          localStorage.setItem('products',JSON.stringify([]));
      }
  },[]);
  let [products , setProducts] = useState(JSON.parse(localStorage.getItem('products')));
  console.log(products)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AdminDashboard products={products} setProducts={setProducts}/>,
    },
    {
      path: '/NewProductForm',
      element: <NewProductForm setProducts={setProducts}/>,
    },
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App
