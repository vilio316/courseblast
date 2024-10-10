import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from './components/Landing'
import { SignIn, SignUp } from './components/SignUpIn'
import { Provider } from 'react-redux'
import { user_store } from './redux/store'
import { Dashboard } from './components/UserDash'

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
  },
  {
    path: '/user',
    element: <Dashboard/>
  }
])

createRoot(document.getElementById('root')!).render(
  <Provider store={user_store}>
  <RouterProvider router={routes} />
  </Provider>
)
