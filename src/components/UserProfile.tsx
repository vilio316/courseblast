import { MainNav, MobileNav, ShowCourse } from "./UserDash"
import photograph from '../assets/react.svg'
import { useAppSelector, useAppDispatch} from "../redux/hooks"
import { emailAddress, first_name, last_name } from "../redux/userSlice"
import supabase from "../supabase/clientSetup"
import {setID, setEmailAddress, setFirstName} from '../redux/userSlice'
import { useNavigate } from "react-router"
import { dummyCourseData } from "./UserDash"
import { CourseDetails } from "./CourseDetails"

export default function UserProfile(){
    let firstName = useAppSelector(first_name)
    let navigate = useNavigate()
    let lastName = useAppSelector(last_name)
    let email_address = useAppSelector(emailAddress)
    let dispatch = useAppDispatch()    
    const clearAll = () => {
        dispatch(setID(''));
        dispatch(setEmailAddress(''));
        dispatch(setFirstName(''));
    }

    let signOut = async() =>{
        await supabase.auth.signOut()
    } 




    return(
        <>
        <div className="w-11/12 p-2 md:p-4 mx-auto">
        <MainNav text="Your Profile"/>
        <div className="grid">
        </div>
        <p className="md:hidden font-bold text-xl ">Your Profile</p>
        
        <div className="grid p-2 md:p-1">
        <button className="text-xs justify-self-end" onClick={()=> {
            signOut();
            clearAll();
            navigate('/')
        }}> Log Out </button>
        </div>

        <div className="grid justify-items-center md:justify-items-start md:flex md:gap-x-8">
        <div className="pfp grid justify-center" >
        <img src={photograph} alt="User PFP" className="rounded-full h-12 md:h-24 sm:h-18"  />
        </div>
        </div>
        <p className="font-bold text-lg text-center md:text-left p-1">{firstName} {lastName}</p>
        <p className="email italic text-sm text-center md:text-left p-1">{email_address}</p>

        <p>Your Courses</p>
        <div className="grid grid-cols-3 w-9/12 overflow-x-scroll whitespace-nowrap">
            {dummyCourseData.map((item) =>(
                <ShowCourse object={item} />
                ))}
        </div>
        <MobileNav/>
        </div>
        </>
    )

}