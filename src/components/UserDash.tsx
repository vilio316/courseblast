import { FaHamburger, FaUser } from "react-icons/fa";
import { useAppSelector } from "../redux/hooks";
import { last_name } from "../redux/userSlice";

export function Dashboard(){
    let firstName = useAppSelector(last_name)

    return(
        <>
        <div className="w-11/12 p-4 my-4 mx-auto">
        <div className="hidden md:grid md:grid-cols-6"> 
        <p className="text-emerald-700 text-3xl col-span-5 font-bold">Dashboard</p>
        <div className="col-span-1 grid grid-cols-2 justify-items-center">
            <i>
                <FaUser size={'2rem'} fill="blue"/>
            </i>
            <i>
                <FaHamburger size={"2rem"} fill="green" />
            </i>
        </div>
        </div>

        <p className="text-2xl">Welcome Back, {firstName} </p>
        </div>
        </>
    )
}