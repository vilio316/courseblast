import { useAppSelector } from "../redux/hooks"
import { cart } from "../redux/userSlice"
import { MainNav, MobileNav } from "./UserDash"
export default function BlastCart(){
    const blastCart = useAppSelector(cart)

    return(
        <>
        <div className="w-11/12 mx-auto p-2 md:p-4">
        <MainNav text="Your BlastCart"/>
        <p className="font-bold text-lg md:text-xl">Your BlastCart (4 Items)</p>
        {blastCart.map((cart_item) => (
            <>
            <p>{cart_item.title}</p>
            <p>{cart_item.price}</p>
            </>
        ))}


        <MobileNav/>
        </div>
        </>
    )
}