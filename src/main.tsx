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
import BlastCart from './components/BlastCart'
import UserProfile from './components/UserProfile'
import PaystackComp from './components/PaystackTestComp'
import UploadProfilePicture from './components/PFP_Upload'
import ErrorHandler from './components/Error'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
    errorElement: <ErrorHandler/>
  },
  {
    path:'/sign-up',
    element: <SignUp/>,
    errorElement: <ErrorHandler/>
  },
  {
    path: "/sign-in",
    element: <SignIn/>,
    errorElement: <ErrorHandler/>
  },
  {
    path: '/user',
    element: <Dashboard/>,
    errorElement: <ErrorHandler/>
  },
  {
    path: '/user/courses/:courseID',
    element: <UserCourseDetails />,
    errorElement: <ErrorHandler/>
  },
  {
    path: '/courses',
    element: <AllCourses/>,
    errorElement: <ErrorHandler/>
  },
  {
    path: '/user/courses/:courseID/:unit_number',
    element: <UnitDetails/>,
    errorElement: <ErrorHandler/>
  },
  {
    path: '/courses/:courseID',
    element: <CourseDetails/>,
    errorElement: <ErrorHandler/>
  }, 
  {
    path: '/user/cart',
    element: <BlastCart/>,
    errorElement: <ErrorHandler/>
  }, 
  {
    path: '/user/profile',
    element: <UserProfile/>,
    errorElement: <ErrorHandler/>
  },
  {
    path: '/paystack_test',
    element: <PaystackComp/>,
    errorElement: <ErrorHandler/>
  },
  {
    path: '/user/change_pfp',
    element: <UploadProfilePicture/>,
    errorElement: <ErrorHandler/>
  }
])

createRoot(document.getElementById('root')!).render(
  <Provider store={user_store}>
    <PersistGate loading={null} persistor={persisted_store}>
  <RouterProvider router={routes} />
  </PersistGate>
  </Provider>
)
