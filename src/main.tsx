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
import { UnitDetails } from './components/UnitDetails'
import { CourseDetails } from './components/CourseDetails'
import Error from './components/Error'
import BlastCart from './components/BlastCart'
import UserProfile from './components/UserProfile'
import PaystackComp from './components/PaystackTestComp'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
    errorElement: <Error/>
  },
  {
    path:'/sign-up',
    element: <SignUp/>,
    errorElement: <Error/>
  },
  {
    path: "/sign-in",
    element: <SignIn/>,
    errorElement: <Error/>
  },
  {
    path: '/user',
    element: <Dashboard/>,
    errorElement: <Error/>
  },
  {
    path: '/user/courses/:courseID',
    element: <UserCourseDetails />,
    errorElement: <Error/>
  },
  {
    path: '/courses',
    element: <AllCourses/>,
    errorElement: <Error/>
  },
  {
    path: '/user/courses/:courseID/:unit_number',
    element: <UnitDetails/>,
    errorElement: <Error/>
  },
  {
    path: '/courses/:courseID',
    element: <CourseDetails/>,
    errorElement: <Error/>
  }, 
  {
    path: '/user/cart',
    element: <BlastCart/>,
    errorElement: <Error/>
  }, 
  {
    path: '/user/profile',
    element: <UserProfile/>,
    errorElement: <Error/>
  },
  {
    path: '/paystack_test',
    element: <PaystackComp/>,
    errorElement: <Error/>
  }
])

createRoot(document.getElementById('root')!).render(
  <Provider store={user_store}>
    <PersistGate loading={null} persistor={persisted_store}>
  <RouterProvider router={routes} />
  </PersistGate>
  </Provider>
)
