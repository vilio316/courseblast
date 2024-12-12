import { FaTrashCan } from "react-icons/fa6"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { cart, emailAddress, setCartState } from "../redux/userSlice"
import { MainNav, MobileNav } from "./UserDash"
import supabase from "../supabase/clientSetup"
import {ID } from '../redux/userSlice'
import { PaystackButton } from "react-paystack"

function loopr (array: any[]){
    let holding_value = [...array];
    let hold_price = 0
    for(let i= 0; i < holding_value.length; i++){
        hold_price += holding_value[i].price
    }
    return hold_price
}

export default function BlastCart(){
    const blastCart = useAppSelector(cart)
    const user_mail = useAppSelector(emailAddress)
    const dispatch = useAppDispatch()
    let user_id = useAppSelector(ID)

    const goToSupa = async(param: any[]) => {
        const {data, error} = await supabase.from('users').update({
            user_blastCart: param
        }).eq('id', user_id)
        console.log(data, error)
    }

    function deleteHandler(item: {title: string, price: number, id:string }, array: any[]){
        let older_arr = [...array];
        let updated_arr = older_arr.filter(({id}) => id != item.id)
        dispatch(setCartState(updated_arr))
        goToSupa(updated_arr)
    }
    
   {/* const componentProps = {
        email,
        amount,
        currency: 'NGN',
        metadata: {
          name,
          phone,
          custom_fields: [
            {
                display_name: 'description',
                variable_name: 'description',
                value: 'Funding Wallet'
            }
            // To pass extra metadata, add an object with the same fields as above
        ]
        },
        publicKey,
        text: "Pay Now",
      }
    */}

    let payProps = 
        {publicKey: 'pk_test_01a7b1f00ce37286a6a3e7d6f9d3ebd29bed7d2b', email: user_mail, amount: loopr(blastCart) * 100, text: `Make Payment Now`}

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
            <div key={cart_item.id} className=" grid grid-cols-12 font-bold text-lg md:text-2xl items-center">
            <p className="col-span-9">{cart_item.title}</p>
            <p className="col-span-2">{cart_item.price}</p>
            <div className="flex items-center">
                <button onClick={() => deleteHandler(cart_item, blastCart)}>
                    <FaTrashCan fill="red" size={'1.5rem'} />
                </button>
            </div>
            </div>
            </li>
        ))}
        </ul>
        { loopr(blastCart) > 0 ?
        <p>Total to Pay: NGN {loopr(blastCart)}</p>: <p>
            Nothing Ordered Yet!
        </p>
        }
        <PaystackButton {...payProps} className='bg-emerald-700 font-bold text-white my-2 md:my-4 md:w-20 rounded-2xl p-2 md:p-4' />
        <MobileNav/>
        </div>
        </>
    )
}