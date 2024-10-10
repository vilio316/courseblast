import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from './components/Landing'
import { SignIn, SignUp } from './components/SignUpIn'
import { Provider } from 'react-redux'
import { user_store } from './redux/store'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },
  {
    path:'/sign-up',
    element: <SignUp/>
  },
  {
    path: "/sign-in",
    element: <SignIn/>
  }
])

createRoot(document.getElementById('root')!).render(
  <Provider store={user_store}>
  <RouterProvider router={routes} />
  </Provider>
)
