import { MainNav, MobileNav } from "./UserDash"
import photograph from '../assets/hero_illust.jpeg'
export default function UserProfile(){

    return(
        <>
        <MainNav text="Your Profile"/>
        <p>
            User Profile
        </p>
        <div>
        <img src={photograph} alt="User PFP" />
        </div>
        <MobileNav/>
        </>
    )

}