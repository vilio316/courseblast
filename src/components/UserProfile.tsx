import { MainNav, MobileNav } from "./UserDash"
import photograph from '../assets/react.svg'
import { useAppSelector, useAppDispatch} from "../redux/hooks"
import { emailAddress, first_name, last_name } from "../redux/userSlice"
import supabase from "../supabase/clientSetup"
import {setID, setEmailAddress, setFirstName} from '../redux/userSlice'
import { useNavigate } from "react-router"

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
        
        <div className="grid">
        <button className="text-xs justify-self-end" onClick={()=> {
            signOut();
            clearAll();
            navigate('/')
        }}> Log Out </button>
        </div>

        <div className="block justify-items-center md:justify-items-start md:flex md:gap-x-8">
        <div className="pfp grid justify-center">
        <img src={photograph} alt="User PFP" className="rounded-full" />
        </div>
        </div>
        <p className="font-bold text-lg md:text-xl text-center">{firstName} {lastName}</p>
        <p className="email italic text-sm text-center">{email_address}</p>
        <MobileNav/>
        </div>
        </>
    )

}