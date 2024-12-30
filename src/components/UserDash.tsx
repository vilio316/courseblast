import { useAppSelector, useAppDispatch} from "../redux/hooks";
import { first_name, ID, pfp, setEmailAddress, setFirstName, setLastName } from "../redux/userSlice";
import { useNavigate } from "react-router";
import { MainNav, MobileNav } from "./NavComponents";
import { useGetUserCoursesQuery, useGetUserQuery } from "../redux/apiSlice";
import supabase from "../supabase/clientSetup";
import { useEffect } from "react"
import { updateEnrolledCourses } from "../redux/userSlice";

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

export function ShowCourse(props : propType){
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
            return `w-2/12`
        }
    }
    return(
        <>
            <div className="rounded-2xl p-2 md:p-4 hover:bg-gray-200 group w-full bg-gray-200 md:bg-inherit my-2">
            <p className="font-bold text-lg md:text-xl w-10/12 overflow-hidden text-ellipsis whitespace-nowrap">{course_title}</p>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="grid col-span-2 progress-bar self-center">
                    <div className="bg-gray-300 rounded-md">
                    <div className={`${convert()} bg-emerald-700 h-2 p-px rounded-md`}></div>
                    </div>   
                </div> 
                <div className="grid col-span-1">
                    <p>{course_progress_percentage }% complete!</p>
                </div>
            </div>
            <p className="font-bold">{course_instructor}</p>
            <p className="my-4 h-20 md:h-32 overflow-y-auto text-xs md:text-sm">{course_blurb}</p>

            <button onClick={()=> navigate(`/user/courses/${courseID}`)} className="hidden text-sm group-hover:block p-2 rounded-2xl bg-emerald-700 text-white">
                Continue
            </button>
        </div>
        </>
    )
}

function DashBody(){
    let {data} = useGetUserCoursesQuery()
   
    return(
        <>
        {data ?
        <>
        {data[0].user_courses.length > 0 ? <>
            {
                data[0].user_courses.map((item: any) => <ShowCourse object={item} />)
            }
        </> : <>
        <p>
            No Courses Added Yet
        </p>
        </> }
        </> : 
        <>
        </>
        }
        </>
    )
}

export function Dashboard(){
    let firstName = useAppSelector(first_name)  
    let dispatch = useAppDispatch()    
    let id_value = useAppSelector(ID)
    let profilePicture = useAppSelector(pfp)
    let {data, isFetching}= useGetUserQuery()
    const new_arr = data?.filter((item) => item.id == id_value)
    useEffect(()=> {
        if(new_arr){
            let {user_first_name, user_last_name, email, user_courses } = new_arr[0]
            dispatch(setFirstName(user_first_name));
            dispatch(setLastName(user_last_name));
            dispatch(setEmailAddress(email));
            dispatch(updateEnrolledCourses(user_courses))
        }
    })

    async function clearCourses(){
        dispatch(updateEnrolledCourses([]))
        const {data} = await supabase.from('users').update({
            user_courses: []
        }).eq('id', id_value)
        console.log(data)
    }

    return(
        <>
        <div className="w-11/12 p-2 md:p-4 my-4 mx-auto relative">
        <MainNav/>
        <div className="grid grid-cols-4 items-center">
            <div className="grid col-span-1 justify-items-center">
            <img src={profilePicture} alt="User Profile Photograph" className="rounded-full md:w-6/12 md:p-4 p-2" />
            </div>
            <div className="grid col-span-3 p-4">
                {isFetching?
                <>
                <p className='text-lg md:text-xl font-bold'>Loading....</p>
                </> :
                <>
                <p className="font-bold text-lg md:text-2xl">Hi, {firstName}!</p>
                <p>Pick up from where you left off!</p>
                </>
}
            </div> 
        </div>
        <button
        onClick={()=> {
            clearCourses()
        }}
        > Clear Your Courses!</button>
        <div id="courses" className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 min-h-svh md:h-auto">
            <div>
        <DashBody />
        </div>
        </div>
        <MobileNav/>
        </div>
        </>
    )
}


