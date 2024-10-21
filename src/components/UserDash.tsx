import { FaUser } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { first_name, last_name, ID, setEmailAddress, setFirstName, setID, setLastName, setCourses } from "../redux/userSlice";
import react from '../assets/react.svg'
import { useNavigate } from "react-router";
import { useGetUsersQuery } from "../redux/apiSlice";
import supabase from "../supabase/clientSetup";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

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

let dummyCourseData : UserCourseData[] = [{
    course_blurb: "Go from Zero To OOP Hero in thirty days with this new and improved Python course. In this course, you will come to understand various concepts in the field of object-oriented programming, including polymorphism, encapsulation and abstraction. You will also learn various Python techniques, best practices and libraries to improve your understanding of Python programming concepts. ",
    course_instructor: "Amir Khan",
    course_title: "OOP Fundamentals",
    course_progress_percentage: 0,
    courseID: "33acb-56f93"
    
}, 
{
course_blurb: "Understanding Active Server Pages in 30 days, with the special help of LeBron James, Wilt Chamberlain and so much more! bla hehuierhuyruieyghvjerhguierowefoihiiiiiiiiiiii. Steel Ball Run!",
course_instructor: "J.R.R. Tolkien",
course_title: "Nothing but .NET: 30 Days of ASP.NET with your favourite Basketball Stars",
course_progress_percentage: 35,
courseID: "43red-45k67"
}, 

{
    course_blurb: "Understanding Active Server Pages in 30 days, with the special help of LeBron James, Wilt Chamberlain and so much more! bla hehuierhuyruieyghvjerhguierowefoihiiiiiiiiiiii. Steel Ball Run!",
    course_instructor: "Araki, Hirohiko",
    course_title: "Stando Power! : The Musical History of JoJo's Bizarre Adventure",
    course_progress_percentage: 60,
    courseID: '24eef-ru3y4'
    }, 

    {
        course_blurb: "Understanding Active Server Pages in 30 days, with the special help of LeBron James, Wilt Chamberlain and so much more! bla hehuierhuyruieyghvjerhguierowefoihiiiiiiiiiiii. Steel Ball Run!",
        course_instructor: "J.R.R. Tolkien",
        course_title: "Nothing but .NET: 30 Days of ASP.NET with your favourite Basketball Stars",
        course_progress_percentage: 56,
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


export function Dashboard(){
    let firstName = useAppSelector(first_name)
    let navigate = useNavigate()
    let dispatch = useDispatch()    
    let {data, isLoading}= useGetUsersQuery()
    let id_value = useAppSelector(ID)
    const new_arr = data?.filter((item) => item.id == id_value)
    if(new_arr){
        let {user_first_name, user_last_name, email} = new_arr[0]
        dispatch(setFirstName(user_first_name));
        dispatch(setLastName(user_last_name));
        dispatch(setEmailAddress(email))  ;

    }
    else{
        console.log("Oops")
    }
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
        <div className="w-11/12 p-4 my-4 mx-auto">
        <div className="hidden md:grid md:grid-cols-6"> 
        <p className="text-emerald-700 text-3xl col-span-5 font-bold">Dashboard</p>
        <div className="col-span-1 grid grid-cols-2 justify-items-center">
            <i>
                <FaUser size={'2rem'} fill="blue" onClick={()=> {
                    signOut();
                    navigate('/');
                    clearAll();
                }}/>
            </i>

<div className="grid items-center">
            <span className="h-1 w-8 block my-1 rounded-lg bg-emerald-800"></span>
                    <span className="h-1 w-8 block my-1 rounded-lg bg-emerald-800"></span>
                    <span className="h-1 w-8 block my-1 rounded-lg bg-emerald-800"></span>
</div>
        </div>
        </div>

        <div className="grid grid-cols-4 items-center my-4">
            <div className="grid col-span-1 justify-items-center">
            <img src={react} alt="User Profile Photograph" className="rounded-full w-6/12 p-4" />
            </div>
            <div className="grid col-span-3 p-4">
                <p className="font-bold text-2xl">Hi, {firstName}!</p>
                <p>Pick up from where you left off!</p>
            </div>
        </div>
        <p className="text-4xl font-bold my-4">Your Courses</p>

        <div className="user-courses-my-4 grid grid-cols-3">
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
