import { useParams } from "react-router";
import { MainNav } from "./UserDash";
import { dummyCourseData } from "./UserDash"
;
export function CourseDetails(){
    let params = useParams()
    let [object] = dummyCourseData.filter((course) => course.courseID == params.courseID) 

    return(
        <>
        <div className="w-11/12 mx-auto p-4">
        <MainNav text="Courses"/>  
        <div className="flex gap-x-2 p-2 items-center">
        <p className="font-bold text-xl ">
            {object.course_title}
            </p>
        <button className='font-bold text-white p-2 bg-emerald-700 rounded-xl'>
            Add Course
        </button>
        </div>      
        <p className='text-emerald-700 font-bold text-xl'>
                $2000
        </p>
        <p>{object.course_instructor}</p>
        <p>{object.course_blurb}</p>
        </div>
        </>
    )
}