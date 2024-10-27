import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from './components/Landing'
import { SignIn, SignUp } from './components/SignUpIn'
import { Provider } from 'react-redux'
import { persisted_store, user_store } from './redux/store'
import { Dashboard } from './components/UserDash'
import { PersistGate } from 'redux-persist/integration/react'
import { UserCourseDetails } from './components/UserCourseDetails'
import { AllCourses } from './components/AllCourses'

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
  },
  {
    path: '/user/courses/:courseID',
    element: <UserCourseDetails />
  },
  {
    path: '/courses',
    element: <AllCourses/>
  },
])

createRoot(document.getElementById('root')!).render(
  <Provider store={user_store}>
    <PersistGate loading={null} persistor={persisted_store}>
  <RouterProvider router={routes} />
  </PersistGate>
  </Provider>
)
