import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { NextUIProvider } from "@nextui-org/react";
import Welcome from './Pages/Welcome/Welcome.jsx'
import Home from './Pages/Home/Home.jsx'
import Auth from './Pages/Auth/Auth.jsx'
import { Provider } from 'react-redux'
import store from './store/storeConfig/storeConfig.js'
import Error404 from './Pages/Error404/Error404.jsx'
import RedirectToMainUrl from './Pages/RedirectToMainUrl/RedirectToMainUrl.jsx'
import Profile from './Pages/Profile/Profile.jsx'




const router = createBrowserRouter([
  {
    path: "/", element: <App />,
    children: [
      { path: "/", element: <Welcome /> },
      { path: "/auth", element: <Auth /> },
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/u/:shorten_url", element: <RedirectToMainUrl /> },
      { path: "*", element: <Error404 /> }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </NextUIProvider>
  </StrictMode>,
)
