import { MainNav, MobileNav } from "./NavComponents"
import { useAppSelector, useAppDispatch} from "../redux/hooks"
import { emailAddress, first_name, last_name, pfp, setLastName, updateEnrolledCourses, updatePFP} from "../redux/userSlice"
import supabase from "../supabase/clientSetup"
import {setID, setEmailAddress, setFirstName} from '../redux/userSlice'
import { useNavigate } from "react-router"
import { useGetUserCoursesQuery } from "../redux/apiSlice"
import react_img from '../assets/react.svg'

export default function UserProfile(){
    let {data, isSuccess, isFetching, error} = useGetUserCoursesQuery()
    let firstName = useAppSelector(first_name)
    let navigate = useNavigate()
    let profpic = useAppSelector(pfp)
    let lastName = useAppSelector(last_name)
    let email_address = useAppSelector(emailAddress)
    let dispatch = useAppDispatch()    
    const clearAll = () => {
        dispatch(setID(''));
        dispatch(setEmailAddress(''));
        dispatch(setFirstName(''));
        dispatch(setLastName(''))
        dispatch(updateEnrolledCourses([]));
        dispatch(updatePFP(''))
    }
    let signOut = async() =>{
        await supabase.auth.signOut()
    } 

    return(
        <div className="w-11/12 p-2 md:p-4 mx-auto">
        <MainNav text="Your Profile"/>
        <p className="md:hidden font-bold text-xl ">Your Profile</p>
        <div className="grid p-2 md:p-1">
        <button className={`text-lg p-2 md:p-4 font-bold justify-self-end ${email_address.length > 1 ? 'block': 'hidden'} text-white p-1 md:p-2 bg-emerald-700 rounded-2xl`} onClick={()=> {
            signOut();
            clearAll();
            navigate('/')
        }} 
        > Log Out </button>
        </div>
        { email_address.length > 1 ?
        <>
        <div className="grid justify-items-center md:justify-items-start md:flex md:gap-x-8 md:h-auto">
        
        <div className="pfp grid justify-center" onClick={()=> navigate('/user/change_pfp')}>
        { profpic && profpic.length > 1 ? 
        <img src={profpic} alt="User PFP" className="rounded-full h-[10rem] w-[10rem] object-contain" />
        : 
        <img src={react_img}
        alt="User PFP"
        className="rounded-full h-[10rem] w-[10rem] object-contain"
        />
}
        </div>
        
        </div>

        <div>
        <p className="font-bold text-lg text-center md:text-left p-1">{firstName} {lastName}</p>
        <p className="email italic text-sm text-center md:text-left p-1">{email_address}</p>
        <p className="underline">Your Courses</p>
        <div className="grid w-11/12 mx-auto max-h-svh min-h-96">
        { data && isSuccess? <>
        <ul className="list-disc">
           {
            data[0].user_courses.length > 0 ? <>
             {data[0].user_courses.map((item : any) => (
                <li key={item.course_id} className="hover:bg-gray-200">
                <a href={`/courses/${item.course_id}`} >
                {item.course_title}
                </a>
                </li>
            )
        )}
            </> : 
            <div>            
            <p>No Courses Added Yet</p>
            <p>Add Courses using the link <a className="underline" href='/courses'>here</a></p>
            </div>
           }
        </ul>
        </> : 
        <>
        {
        isFetching ? <p>Loading... {isFetching}</p>: <>{error ?
        <p>Oops! We've encountered an error and can't find your profile at the moment. Click here to log back into your CourseBlast account. </p>
        : null }</>
        }
        </> }
        </div>
        </div>
        </> :
        <NotSignedInError/>
        }
        <MobileNav/>
        </div>
    )

}

export function NotSignedInError(){

    return (
         <div className="w-6/12 mx-auto h-svh md:h-auto">
        <p className="text-center text-2xl">Oops!</p>
        <p>Looks like you're not logged in yet. Click <a href='/sign-in' className="underline">here</a> to sign in if you already have an account and <a href="/sign-up" className="underline">here</a> to sign up for CourseBlast.</p>
        </div>
    )
}