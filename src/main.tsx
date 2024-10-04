import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from './components/Landing'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={routes} />
)
