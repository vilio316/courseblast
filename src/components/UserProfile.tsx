import { MainNav, MobileNav } from "./UserDash"
import photograph from '../assets/react.svg'
import { useAppSelector, useAppDispatch} from "../redux/hooks"
import { first_name, last_name } from "../redux/userSlice"
import supabase from "../supabase/clientSetup"
import {setID, setEmailAddress, setFirstName} from '../redux/userSlice'
import { useNavigate } from "react-router"

export default function UserProfile(){
    let firstName = useAppSelector(first_name)
    let navigate = useNavigate()
    let lastName = useAppSelector(last_name)
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
        <MainNav text="Your Profile"/>
        <p>
            User Profile
        </p>
        <div>
        <img src={photograph} alt="User PFP" className="rounded-full w-4/12" />
        </div>
        <p className="font-bold text-lg md:text-xl">{firstName} {lastName}</p>
        <button onClick={()=> {
            signOut();
            clearAll();
            navigate('/')
        }}>
            Log Out
        </button>
        <MobileNav/>
        </>
    )

}