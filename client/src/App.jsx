import React from 'react'
import Header from './myComponents/Header/Header'
import Footer from './myComponents/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        draggable
        theme="dark" />
    </>
  )
}

export default App