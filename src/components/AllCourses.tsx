import { useState } from "react"
import { MainNav } from "./UserDash"
import { dummyCourseData } from "./UserDash"
import { UserCourseData } from "./UserDash"

export function AllCourses(){
    let [searchVal, updateSearchVal] = useState('')


    function CourseCard(props: {obj : UserCourseData}){
        let {course_title, course_blurb, course_instructor} = props.obj
        return(
            <div className="rounded-2xl p-4 hover:bg-gray-200">
                <p className="text-xl font-bold my-2">{course_title}</p>
                <p className="my-2 font-bold">{course_instructor}</p>
                <p>{course_blurb}</p>
            </div>
        )
    }

    
    return(
        <>
         <div className="w-11/12 p-4 my-4 mx-auto grid">
        <MainNav />
        <p className="text-2xl text-emerald-700 my-4 font-bold">All Courses</p>
        <input type="text" id='search_bar' placeholder="Search for courses..." className="outline-none border-2 border-emerald-500 p-4 w-8/12 rounded-lg" onChange={(e)=> updateSearchVal(e.target.value)}/>
        <div className="grid-cols-4 gap-x-2 grid">
        {dummyCourseData.filter((item) => item.course_title.toLowerCase().includes(searchVal.toLowerCase())).map((item) => (
            <>
            <CourseCard obj={item} key={item.courseID} />
            </>
        ))
        }
        </div>
        </div>
        </>
    )
}