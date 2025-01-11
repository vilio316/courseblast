import { useNavigate } from "react-router"
import { FaShoppingCart, FaHome, FaUser, FaWrench, FaFile, FaCreditCard } from "react-icons/fa"
import { FaCirclePlus } from "react-icons/fa6"
import { MdDashboard } from "react-icons/md"
import react from '../assets/react.svg'
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import supabase from "../supabase/clientSetup"
import { useState,  } from "react"
import {setID, setEmailAddress, setFirstName, setLastName, updateEnrolledCourses, pfp, updatePFP} from '../redux/userSlice'

export function MobileNav(){
    let navigate = useNavigate()

    return(
        <div className="sticky z-20 bottom-0 grid md:hidden grid-cols-5 bg-white items-end p-2">
            <div className="grid justify-items-center" onClick={()=> navigate('/user/cart')}>
                <div>
                    <FaShoppingCart fill='blue' size='1.25rem'/>
                </div>
                <a className="block text-sm text-center">
                    Cart
                </a>
            </div>

            <div className="grid justify-items-center" onClick={()=> navigate('/courses')}>
                <div>
                    <FaCirclePlus fill='blue' size='1.25rem'/>
                </div>
                <a className="block text-sm text-center">
                    Add
                </a>
            </div>

            <div className="grid justify-items-center" onClick={()=> navigate('/user')}>
                <div>
                    <FaHome fill='blue' size='2rem'/>
                </div>
                <a className="block text-center font-bold">
                    Home
                </a>
            </div>

            <div className="grid justify-items-center" onClick={()=> navigate('/user/profile')}>
                <div>
                    <FaUser fill='blue' size='1.5rem'/>
                </div>
                <a className="block text-sm text-center" href="/user/profile">
                    Profile
                </a>
            </div>

            <div className="grid justify-items-center">
                <div>
                    <FaWrench fill='gray' size='1.25rem'/>
                </div>
                <a className="block text-sm text-center">
                    Settings
                </a>
            </div>

        </div>
    )
}

export function MainNav(props: { readonly text?: string}){
    let profilePhoto = useAppSelector(pfp)
    const [menuState, changeMenu] = useState(false)
    const [prof, changeProf] = useState(false)
    let navigate = useNavigate()
    let dispatch = useAppDispatch()    
    const clearAll = () => {
        dispatch(setID(''));
        dispatch(setEmailAddress(''));
        dispatch(setFirstName(''));
        dispatch(setLastName(''));
        dispatch(updateEnrolledCourses([]));
        dispatch(updatePFP(''))
    }
    let signOut = async() =>{
        await supabase.auth.signOut()
    } 

    return(
         <div className="hidden md:grid md:grid-cols-6 my-4"> 
    <p className="text-emerald-700 text-3xl col-span-5 font-bold">{props.text ? `${props.text}` : `Dashboard`}</p>
    <div className="col-span-1 grid grid-cols-2 justify-items-center relative">
        <i>
            <FaUser size={'2rem'} fill="blue" onClick={()=> changeProf(true)}/>
        </i>

        {/* User Profile Modal Here */}
<div className={`user_nav absolute top-0 left-0 p-4 rounded-xl z-20 bg-white border-2 border-emerald-300 transition-all ${prof? `ml-0`: `ml-96`} `}>
<span className="text-xl font-bold hover:text-red-500 w-full text-right block" onClick={()=> changeProf(false)}> x </span>

<div className="grid justify-center">
{
profilePhoto && profilePhoto.length > 1? 
<img src={profilePhoto} alt="User PFP" className="rounded-full border-2 h-20 w-20 object-cover border-emerald-700"/>
: 
<img src={react} alt="User PFP" className="rounded-full border-2 h-20 w-20 object-cover border-emerald-700"/>
}
</div>

<div className="flex gap-x-2 items-center">
<MdDashboard size={'1.5rem'} fill="green" />
<a className="block text-lg p-2" href="/user">Your Dashboard</a>
</div>

<div className="flex gap-x-2 items-center">
<FaUser size={'1.5rem'} />
<a className="block text-lg p-2" href="/user/profile">Your Profile</a>
</div>

<div className="flex gap-x-2 items-center">
<FaFile size={'1.5rem'} fill="blue"/>
<a className="block text-lg p-2" href='/user/#courses'>Your Courses</a>
</div>


<div className="flex gap-x-2 items-center">
<FaShoppingCart size={'1.5rem'} fill='green' />
<a className="block text-lg p-2" href="/user/cart">Your BlastCart</a>
</div>

<div className="flex gap-x-2 items-center">
<FaCreditCard size={'1.5rem'} fill='green'/>
<a className="block text-lg p-2">Payment History</a>
</div>
<button className="outline-none border-none rounded-2xl my-4 p-2 font-bold block text-white bg-emerald-700" onClick={()=> {
                signOut();
                navigate('/');
                clearAll();}}> Sign Out</button>
</div>


<div className="grid items-center" onClick={()=> changeMenu(true)}>
                <span className="h-1 w-8 block my-1 rounded-lg bg-emerald-800"></span>
                <span className="h-1 w-8 block my-1 rounded-lg bg-emerald-800"></span>
                <span className="h-1 w-8 block my-1 rounded-lg bg-emerald-800"></span>
</div>

{/* Dashboard Navigation Here*/}
<div className={`absolute z-10 top-0 right-0 ${menuState ? `mt-0` : `-mt-96`} transition-all p-4 bg-blue-700 rounded-2xl`} >
<span className="text-xl font-bold hover:text-red-500 w-full text-right block" onClick={()=> changeMenu(false)}> x </span>
<a className="text-xl font-bold block hover:italic m text-white y-4">Home</a>
<a className="text-xl font-bold block hover:italic my-4 text-white" href='/courses'>All Courses</a>
</div>
    </div>
    </div>
    )
}