import { useNavigate, useParams } from "react-router";
import { MainNav, MobileNav } from "./NavComponents";
import {cart, emailAddress, enrolledCourses, ID, setCartState } from '../redux/userSlice'
import { useEffect, useState } from "react";
import { FaShoppingBasket, FaUserClock, FaPen } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useGetAllCoursesQuery } from "../redux/apiSlice";
import { Course } from "../redux/apiSlice";
import supabase from "../supabase/clientSetup";
import { FaScaleUnbalanced } from "react-icons/fa6";

export const updateUserCourses = async (param: any[], id:string)=> {
    await supabase.from('users').update({
        user_courses : param,
    }).eq('id', id)
}



export function CourseDetails(){
    let user_id = useAppSelector(ID)
    
    useEffect(()=>{
        async function find_my_courses(){
            const {data} = await supabase.from('users').select('user_blastCart').eq('id', user_id)
            if(data){
                dispatch(setCartState(data[0].user_blastCart))
            }
        };
        find_my_courses()
    }, [])

    let user_mail = useAppSelector(emailAddress)
    let your_course_data = useAppSelector(enrolledCourses)
    let your_cart_data = useAppSelector(cart)
    let value= [...your_course_data]
    let navigate = useNavigate()
   
    const goToSupa = async(param: any[]) => {
        const {data, error} = await supabase.from('users').update({
            user_blastCart: param,
        }).eq('id', user_id)
        console.log(data, error)
    }
   
    let params = useParams()
    let dispatch = useAppDispatch()
    let { data }= useGetAllCoursesQuery()
    let courseFetchResult = data?.filter((item) => item.course_id == params.courseID)

    //Possibly Redundant Code Block
    let course: Course = {
        course_blurb: '',   
        course_difficulty: '',
        course_duration: 0,
        course_id: "",
        course_instructor: "",
        course_price: 0,
        course_title:'', 
        course_long_desc: '',
    }

    if(courseFetchResult){
    course = courseFetchResult[0]
    value.push(course)
    }
    //Redundant Ends Here
    
    let {course_difficulty, course_duration, course_title,course_price, course_instructor, course_id, course_long_desc} = course
    
    let [course_modal, showMod] = useState(false)
    let blast_cart = useAppSelector(cart)

    function setCourseInCart(title:string ,price: number, id: string ){
        let newBCart= [...blast_cart, {title: title, price: price, id: id}]
        dispatch(setCartState(newBCart))
        goToSupa(newBCart)
    }
    return(
        <>
        <div className="w-11/12 block min-h-dvh md:h-auto mx-auto p-4 relative">
        <MainNav text="Courses"/>  
        <div className="flex gap-x-2 p-2 items-center">
        <p className="font-bold text-xl ">
            {course_title}
            </p>
        <button className='font-bold text-white p-2 bg-emerald-700 rounded-xl' onClick={()=> showMod(true)
        }>
            Add Course
        </button>
        </div>      
        <p className='text-emerald-700 font-bold text-xl'>
                NGN {course_price}
        </p>

        <div className="my-2 md:my-4">
        <div className="flex items-center gap-x-2 md:gap-x-4">
        <FaUserClock size={'1.5rem'} fill='green' />
        <p>{course_duration} hours</p>
        </div>

        <div className="flex items-center gap-x-2 md:gap-x-4">
        <FaPen size={'1.25rem'} fill='black'/>
        <p>{course_instructor}</p>
        </div>

        <div className="flex items-center gap-x-2 md:gap-x-2">
        <FaScaleUnbalanced size={'1.5rem'} fill='blue' />
        <p>{course_difficulty}</p>
        </div>
        </div>

        <p className="text-justify indent-8 text-lg">{course_long_desc}</p>
        <p className="my-4 font-bold text-xl md:text-2xl">
            Units
        </p>
        </div>
        <MobileNav/>

        {/* Course Details Modal*/}
        <div className={`w-full bg-gray-300 opacity-90 z-10 absolute top-0 h-svh ${course_modal? 'grid': 'hidden'}`}>
            <div className={`md:w-6/12 w-full bg-white md:h-9/12 mx-auto p-4 opacity-100`}>
            <span className="w-full text-right block hover:text-red-500 text-4xl font-bolds" onClick={()=> showMod(false) }>x</span>
                <p className="font-bold md:text-3xl text-lg ">{course_title}</p>
                <p className="text-emerald-700 md:text-xl text-sm font-bold my-2">NGN {course_price}</p>
                <p className="font-bold">{course_instructor}</p>
                <p className="text-sm md:text-lg italic indent-2 md:indent-4">{course_long_desc}</p>

                <div className="grid my-4 absolute md:bottom-0 md:w-6/12 mx-auto w-full">
                <button onClick={()=> {
                    let ids_arr = [];
                    if(user_mail.length > 1){
                    for(let i = 0; i < your_cart_data.length; i++){
                        ids_arr.push(your_cart_data[i].id)
                    }
                    if(params.courseID && ids_arr.indexOf(params.courseID) !== -1){
                        alert("Course is already in Cart")
                    }
                    else{
                    setCourseInCart(course_title, course_price, course_id);
                    showMod(false);
                    alert("Course successfully Added to Cart!")
                    }
                
                }
                else{
                    navigate('/sign-in')    
                }
                }
                } className="outline-none border-4 bg-white border-blue-800 p-2 md:p-4 rounded-xl text-emerald-700 justify-self-center w-9/12 hover:bg-blue-300 transition-colors self-end"  >
                     <div className="flex items-center justify-center gap-x-4">
                        <FaShoppingBasket size='1.5rem' fill="blue"/>
                        <p className="text-blue font-bold">{'Add to Blastcart'.toUpperCase()}</p>
                    </div>

                </button>
                </div>
            </div>
        </div>
        </>
    )
}