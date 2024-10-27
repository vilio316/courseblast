import { useEffect, useState } from "react"
import { MainNav } from "./UserDash"
import { dummyCourseData } from "./UserDash"
import { UserCourseData } from "./UserDash"

export function AllCourses(){
    let [searchVal, updateSearchVal] = useState('')
    let search_results = dummyCourseData.filter((item) => item.course_title.toLowerCase().includes(searchVal.toLowerCase()))
    let [null_search, setNullSearch ] = useState(false)
    
    useEffect(()=> {
        if(search_results.length == 0){
            setNullSearch(true)
        }
        else if(searchVal.length == 0){
            setNullSearch(false)
        }
        else{
            setNullSearch(false)
        }
    }, [null_search, search_results.length, searchVal.length])

    function CourseCard(props: {obj : UserCourseData}){
        let {course_title, course_blurb, course_instructor} = props.obj
        return(
            <div className="rounded-2xl group p-4 hover:bg-gray-200">
                <p className="text-xl font-bold my-2">{course_title}</p>
                <p className="my-2 font-bold">{course_instructor}</p>
                <p>{course_blurb}</p>
                <button className="add_course hidden group-hover:block outline-none border-none p-2 rounded-xl text-white bg-emerald-700">
                    Add Course
                </button>
            </div>
        )
    }

    return(
        <>
         <div className="w-11/12 p-4 my-4 mx-auto grid">
        <MainNav />
        <p className="text-2xl text-emerald-700 my-4 font-bold">All Courses</p>
        <input type="text" id='search_bar' placeholder="Search for courses..." className="outline-none border-2 border-emerald-500 p-4 w-8/12 rounded-lg" onChange={(e)=> updateSearchVal(e.target.value)}/>
        {null_search? <>
        <div className="grid justify-center my-4 p-4">
        <p className="text-2xl font-bold ">
            No courses on that yet. 
        </p>
        <p className="text-lg">Your search term '{`${searchVal}`}' yielded no results.</p>
        <p>Please try a different term or check the quality of your connection.</p>
        </div>
        </>: 
        <>
         <div className="grid-cols-4 gap-x-2 grid my-4">
        {search_results.map((item) => (
            <CourseCard obj={item } key={item.courseID} />
        ))}
        </div>
        </>}
        </div>
        </>
    )
}