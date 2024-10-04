import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from './components/Landing'
import { SignUp } from './components/SignUpIn'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },
  {
    path:'/sign-up',
    element: <SignUp/>
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={routes} />
)
