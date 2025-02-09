import { FaTrashCan } from "react-icons/fa6"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { cart, emailAddress, enrolledCourses, setCartState, updateEnrolledCourses, ID } from "../redux/userSlice"
import { MainNav, MobileNav } from "./NavComponents"
import supabase from "../supabase/clientSetup"
import { PaystackButton } from "react-paystack"
import { CartFiller, EmptyCart } from "./EmptyCart"
import { ReactNode, useEffect } from "react"
import { PaystackProps, callback } from "react-paystack/dist/types"
import { updateUserCourses } from "./CourseDetails"
import { useNavigate } from "react-router"


interface PaystackButtonProps extends PaystackProps {
    text?: string;
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
    onSuccess?: callback;
    onClose?: callback;
}


function loopr (array: any[]){
    let holding_value = [...array];
    let hold_price = 0
    for (let item of holding_value){
        hold_price += item.price
    }
    return hold_price
}

export default function BlastCart(){
    const blastCart = useAppSelector(cart)
    const enrolled = useAppSelector(enrolledCourses)
    const user_mail = useAppSelector(emailAddress)
    const dispatch = useAppDispatch()
    let user_id = useAppSelector(ID)
    let navigate = useNavigate()
  

    useEffect(()=> {
        async function fetchBlastCart(){
            const {data} = await supabase.from('users').select('user_blastCart').eq('id', user_id)
            if(data){
            dispatch(setCartState(data[0].user_blastCart))
        }
    };
        fetchBlastCart()
    }, [])

    async function loadInUploadFormat(){
        const {data} = await supabase.from('courses').select()
        let blastCartClone = [...blastCart]
        let newArray = []
        for (let cart_course of blastCartClone){
            if(data){
            let arr = data.filter((item) => item.course_id == cart_course.id)
            let element = arr[0]
            newArray.push(element)
        }
        console.log(newArray)
        let updated_courses_array = [...enrolled, ...newArray]
        updateEnrolledCourses(updated_courses_array)
        updateUserCourses(updated_courses_array, user_id)
    }
    }

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
        
    let payProps: PaystackButtonProps = 
        {publicKey: 'pk_test_01a7b1f00ce37286a6a3e7d6f9d3ebd29bed7d2b', email: user_mail, amount: loopr(blastCart) * 100, text: `Make Payment Now`, onSuccess: () => {
            window.alert("Successful Payment!");
            loadInUploadFormat()
            goToSupa([]);
            dispatch(setCartState([]))
            navigate('/user')
        }}

    return(
        <div className="w-11/12 mx-auto p-2 md:p-4 h-dvh md:h-auto">
        <MainNav text="Your BlastCart"/>
        <div className="grid">
        <button className="text-md text-white bg-emerald-700 rounded-2xl p-2 justify-self-end" onClick={()=> {
            dispatch(setCartState([]));
            goToSupa([])
        }}>
            Clear Cart
        </button>
        </div>
        <p className="font-bold text-lg md:text-xl">{blastCart.length} Items in Cart</p>
        {blastCart.length < 1 ?
        <EmptyCart/>
        :
        <div className="block h-svh w-full">
        <table className="w-full md:w-9/12 my-2 md:my-4 table-auto border-collapse border-2 border-emerald-300">
            <thead>
            <tr className="bg-emerald-200">
                <th className="text-center border border-emerald-300">Course Title</th>
                <th className="text-center border border-emerald-300">Course Price (NGN)</th>
                <th className="text-transparent border border-emerald-300">icon</th>
            </tr>
            </thead>
            <tbody>
        {blastCart.map((cart_item) => (
            <tr key={cart_item.id} className="items-center">
            <td className="text-center font-bold p-2 md:p-4 border border-emerald-300">
                <a href={`/courses/${cart_item.id}`}>{cart_item.title}</a>
                </td>
            <td className="text-center p-2 md:p-4 border border-emerald-300">{cart_item.price}</td>
            <td className="grid p-2 md:p-4">
                <button className="grid items-center" onClick={() => deleteHandler(cart_item, blastCart)}>
                    <FaTrashCan fill="red" size={'2rem'} />
                </button>
            </td>
            </tr>
        ))}
        </tbody>
        </table>
        {
            blastCart.length < 3 ?
            <CartFiller/>
            : null
        }
        { loopr(blastCart) > 0 ?
        <p>Total to Pay: <span className="bold">NGN {loopr(blastCart)}</span></p>: <p>
            Nothing Ordered Yet!
        </p>
        }
        <PaystackButton {...payProps} className='bg-emerald-700 font-bold text-white my-2 md:my-4 grid justify-self-center rounded-2xl p-2 md:p-4' />
        </div>
}
        
        <MobileNav/>
        </div>
    )
}