import { MainNav, MobileNav } from "./UserDash"
import { useAppSelector, useAppDispatch} from "../redux/hooks"
import { emailAddress, first_name, last_name, pfp, setLastName, updateEnrolledCourses, updatePFP } from "../redux/userSlice"
import supabase from "../supabase/clientSetup"
import {setID, setEmailAddress, setFirstName} from '../redux/userSlice'
import { useNavigate } from "react-router"
import { useGetUserCoursesQuery } from "../redux/apiSlice"

export default function UserProfile(){
    let {data} = useGetUserCoursesQuery()
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
        dispatch(updateEnrolledCourses([]))
        dispatch(updatePFP(''))
    }

    let signOut = async() =>{
        await supabase.auth.signOut()
    } 




    return(
        <>
        <div className="w-11/12 p-2 md:p-4 mx-auto">
        <MainNav text="Your Profile"/>
        
        <p className="md:hidden font-bold text-xl ">Your Profile</p>
        
        <div className="grid p-2 md:p-1">
        <button className={`text-xs justify-self-end ${email_address.length > 1 ? 'block': 'hidden'} text-white p-1 md:p-2 bg-emerald-700 rounded-2xl`} onClick={()=> {
            signOut();
            clearAll();
            navigate('/')
        }} 
        > Log Out </button>
        </div>
        { email_address.length > 1 ?
        <>
        <div className="grid justify-items-center md:justify-items-start md:flex md:gap-x-8 md:h-auto">
        
        <div className="pfp grid justify-center" >
        <img src={profpic} 
        alt="User PFP" className="rounded-full h-12 md:h-24 sm:h-18"/>
        </div>
        
        </div>

            <div>
        <p className="font-bold text-lg text-center md:text-left p-1">{firstName} {lastName}</p>
        <p className="email italic text-sm text-center md:text-left p-1">{email_address}</p>
        <p>Your Courses</p>
        <div className="grid w-9/12">
        {data? <>
            {data[0].user_courses.map((item : any) => (
                <div key={item.course_id} className="hover:bg-gray-200">
                <a href={`/courses/${item.course_id}`} >
                {item.course_title}
                </a>
                </div>
            )
        )}
        </> : <p>
            Nooo!
            </p>}
        </div>
        </div>
        </> : <>
        <NotSignedInError/>
        </>
        }
        <MobileNav/>
        </div>
        </>
    )

}

export function NotSignedInError(){

    return (
        <>
         <div className="w-6/12 mx-auto h-svh md:h-auto">
        <p className="text-center text-2xl">Oops!</p>
        <p>Looks like you're not logged in yet. Click <a href='/sign-in' className="underline">here</a> to sign in if you already have an account and <a href="/sign-up" className="underline">here</a> to sign up for CourseBlast.</p>
        </div>
        </>
    )
}