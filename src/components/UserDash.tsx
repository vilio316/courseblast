import { FaCreditCard, FaUser } from "react-icons/fa";
import { useAppSelector } from "../redux/hooks";
import { first_name, ID, setEmailAddress, setFirstName, setID, setLastName } from "../redux/userSlice";
import react from '../assets/react.svg'
import { useNavigate } from "react-router";
import { useGetUsersQuery } from "../redux/apiSlice";
import supabase from "../supabase/clientSetup";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaFile } from "react-icons/fa6";

export type UserCourseData = {
    course_title: string,
    course_instructor: string,
    course_progress_percentage: number, 
    //course_pfp_src : string,
    course_blurb: string,
    courseID : string, 
}
type propType = {
    object: UserCourseData
}

export let dummyCourseData : UserCourseData[] = [{
    course_blurb: "Go from Zero To OOP Hero in thirty days with this new and improved Python course. In this course, you will come to understand various concepts in the field of object-oriented programming, including polymorphism, encapsulation and abstraction. You will also learn various Python techniques, best practices and libraries to improve your understanding of Python programming concepts. ",
    course_instructor: "Amir Khan",
    course_title: "OOP Fundamentals",
    course_progress_percentage: 0,
    courseID: "33acb-56f93"
    
}, 
{
course_blurb: "Understanding Active Server Pages in 30 days, with the special help of LeBron James, Wilt Chamberlain and so much more! bla hehuierhuyruieyghvjerhguiei. Steel Ball Run!",
course_instructor: "J.R.R. Tolkien",
course_title: "Nothing but .NET: 30 Days of ASP.NET with your favourite Basketball Stars",
course_progress_percentage: 35,
courseID: "43red-45k67"
}, 

{
    course_blurb: "Understanding Active Server Pages in 30 days, with the special help of LeBron James, Wilt Chamberlain and so much more! bla hehuierhuyruieyghvjerhguiii. Steel Ball Run!",
    course_instructor: "Araki, Hirohiko",
    course_title: "Stando Power! : The Musical History of JoJo's Bizarre Adventure",
    course_progress_percentage: 46,
    courseID: '24eef-ru3y4'
    }, 

    {
        course_blurb: "Understanding Active Server Pages in 30 days, with the special help of LeBron James, Wilt Chamberlain and so much more! bla hehuierhuyruieyghvjerhguierowii. Steel Ball Run!",
        course_instructor: "J.R.R. Tolkien",
        course_title: "Nothing but .NET: 30 Days of ASP.NET with your favourite Basketball Stars",
        course_progress_percentage: 21,
        courseID: '67uyr-ghe32'
        }, 
        


]

function ShowCourse(props : propType){
    let navigate = useNavigate()
    let {course_blurb, course_instructor, course_progress_percentage, course_title, courseID} = props.object
    let initial = course_progress_percentage
    let convert = () =>{
        let newVal = initial / 100 
        let reddy= Math.round(newVal * 12)
        if(reddy > 0){
        return `w-${reddy}/12`
        }
        else{
            return `w-2`
        }
    }
    return(
        <>
            <div className="rounded-2xl p-4 hover:bg-gray-200 group">
            <p className="font-bold text-xl w-10/12 overflow-hidden text-ellipsis whitespace-nowrap">{course_title}</p>
            <div className="grid-cols-3 gap-4">
                <div className="grid col-span-2 progress-bar">
                    <div className="bg-gray-300 rounded-md">
                    <div className={`${convert()} bg-emerald-700 h-2 p-px rounded-md`}></div>
                    </div>   
                </div> 
                <div className="grid col-span-1">
                    <p>{course_progress_percentage }% complete!</p>
                </div>
            </div>
            <p className="font-bold">{course_instructor}</p>
            <p className="my-4 h-32 overflow-y-auto">{course_blurb}</p>

            <button onClick={()=> navigate(`/user/courses/${courseID}`)}className="hidden group-hover:block p-2 rounded-2xl bg-emerald-700 text-white">
                Continue
            </button>
        </div>
        </>
    )
}


export function MainNav(props: {text?: string}){
    let [menuState, changeMenu] = useState(false)
    let [prof, changeProf] = useState(false)
    let navigate = useNavigate()
    let dispatch = useDispatch()    
    const clearAll = () => {
        dispatch(setID(''));
        dispatch(setEmailAddress(''));
        dispatch(setFirstName(''));
        dispatch(setLastName(""));
    }

    let signOut = async() =>{
        await supabase.auth.signOut()
    } 

    return(
        <>
         <div className="hidden md:grid md:grid-cols-6 my-4"> 
    <p className="text-emerald-700 text-3xl col-span-5 font-bold">{props.text ? `${props.text}` : `Dashboard`}</p>
    <div className="col-span-1 grid grid-cols-2 justify-items-center relative">
        <i>
            <FaUser size={'2rem'} fill="blue" onClick={()=> changeProf(true)}/>
        </i>

        {/* User Profile Modal Here */}
<div className={`user_nav absolute top-0 left-0 p-4 rounded-xl z-20 bg-white transition-all ${prof? `mt-0`: `-mt-96`}   `}>
<span className="text-xl font-bold hover:text-red-500 w-full text-right block" onClick={()=> changeProf(false)}> x </span>
<div className="grid justify-center">
<img src={react} alt="User PFP" className="rounded-full border-2 h-20 w-20 object-cover border-emerald-700"/>
</div>

<div className="flex gap-x-2 items-center">
<FaUser size={'1.5rem'} />
<a className="block text-lg p-2" href="/user">Your Profile</a>
</div>

<div className="flex gap-x-2 items-center">
<FaFile size={'1.5rem'} fill="blue"/>
<a className="block text-lg p-2" href='/user/#courses'>Your Courses</a>
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
<div className={`absolute z-10 top-0 right-0 bg-white ${menuState ? `mt-0` : `-mt-96`} opacity-75 transition-all p-4 w-9/12 h-full`} >
<span className="text-xl font-bold hover:text-red-500 w-full text-right block" onClick={()=> changeMenu(false)}> x </span>
<a className="text-xl font-bold block hover:italic my-4">Home</a>
<a className="text-xl font-bold block hover:italic my-4" href='/courses'>All Courses</a>
{/*<a className="text-xl font-bold block hover:italic my-4">Search</a>*/}
</div>
    </div>
    </div>
        </>
    )
}


export function Dashboard(){
    let firstName = useAppSelector(first_name)
    useEffect(()=> {
        if(new_arr){
            let {user_first_name, user_last_name, email} = new_arr[0]
            dispatch(setFirstName(user_first_name));
            dispatch(setLastName(user_last_name));
            dispatch(setEmailAddress(email))  ;
        }
    })

    
    let dispatch = useDispatch()    
    let id_value = useAppSelector(ID)
    let {data, isFetching}= useGetUsersQuery()
    const new_arr = data?.filter((item) => item.id == id_value)

    return(
        <>
        <div className="w-11/12 p-4 my-4 mx-auto">
        <MainNav/>

        <div className="grid grid-cols-4 items-center">
            <div className="grid col-span-1 justify-items-center">
            <img src={react} alt="User Profile Photograph" className="rounded-full w-6/12 p-4" />
            </div>
            <div className="grid col-span-3 p-4">
                {isFetching?
                <>
                <p className='text-xl font-bold'>Loading....</p>
                </> :
                <>
                <p className="font-bold text-2xl">Hi, {firstName}!</p>
                <p>Pick up from where you left off!</p>
                </>
}
            </div>
        </div>
        <p className="text-4xl font-bold my-4">Your Courses ({dummyCourseData.length})</p>

        <div className="user-courses-my-4 grid grid-cols-3 gap-4" id='courses'>
            {
                dummyCourseData.map((course) => (
                    <ShowCourse object = {course} key={course.courseID}  />
                ))
            }
        </div>
        </div>
        </>
    )
}
