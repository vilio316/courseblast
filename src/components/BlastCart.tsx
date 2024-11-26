import { FaTrashCan } from "react-icons/fa6"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { cart, setCartState } from "../redux/userSlice"
import { MainNav, MobileNav } from "./UserDash"
import supabase from "../supabase/clientSetup"
import {ID } from '../redux/userSlice'

export default function BlastCart(){
    const blastCart = useAppSelector(cart)
    const dispatch = useAppDispatch()
    let user_id = useAppSelector(ID)

    const goToSupa = async(param: any[]) => {
        const {data, error} = await supabase.from('users').update({
            user_blastCart: param
        }).eq('id', user_id)
        console.log(data, error)
    }
    
    return(
        <>
        <div className="w-11/12 mx-auto p-2 md:p-4">
        <MainNav text="Your BlastCart"/>
        <div className="grid">
        <button className="text-md text-white bg-emerald-700 rounded-2xl p-2 justify-self-end" onClick={()=> {
            dispatch(setCartState([]));
            goToSupa([])
        }}>
            Clear Cart
        </button>
        </div>
        <p className="font-bold text-lg md:text-xl">Your BlastCart ({blastCart.length} Items)</p>
        <ul className="list-disc w-11/12 my-2 md:my-4">
        {blastCart.map((cart_item) => (
            <li key={cart_item.id}>
            <div key={cart_item.id} className=" grid grid-cols-12 font-bold text-lg md:text-2xl">
            <p className="col-span-9">{cart_item.title}</p>
            <p className="col-span-2">{cart_item.price}</p>
            <div className="flex items-center">
                <button>
                    <FaTrashCan fill="red" size={'1.5rem'} />
                </button>
            </div>
            </div>
            </li>
        ))}
        </ul>

        <MobileNav/>
        </div>
        </>
    )
}