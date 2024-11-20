import { useEffect, useState } from "react"
import { MainNav, MobileNav} from "./UserDash"
import { dummyCourseData } from "./UserDash"
import { UserCourseData } from "./UserDash"
import  { Course } from '../redux/apiSlice'
import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { filterValues, gradeFilter, setFiltersGrade, setFiltersName } from "../redux/filterSlice"
import { useGetAllCoursesQuery } from "../redux/apiSlice"

export function AllCourses(){
    let {data, isSuccess} = useGetAllCoursesQuery()
    let navigate = useNavigate()
    let dispatch = useAppDispatch()
    let filter_values= useAppSelector(filterValues)
    let gradeValue = useAppSelector(gradeFilter)
    let [is_filter_chosen, chooseFilter] = useState(false)
    let [searchVal, updateSearchVal] = useState('')
    let search_results = data?.filter((item) => item.course_title.toLowerCase().includes(searchVal.toLowerCase()))

    function determineFilterOutput(){
    let nameFilterResults;
    nameFilterResults = showSupaOutput()?.filter((item) => item.course_title.toLowerCase().includes(filter_values))
    if(gradeValue.length > 1){
       let arr = nameFilterResults?.filter((item) => item.course_difficulty?.toLowerCase() == gradeValue)
       console.log(arr) 
       return arr
    }
    else{
        return nameFilterResults
    }
}

    function showSupaOutput(){
       if(data) return data
    }


    useEffect(()=> {
        if(filter_values.length <= 1 && gradeValue.length <= 1){
            chooseFilter(false)
        }
    }, [filter_values, is_filter_chosen, gradeValue.length])

    let [null_search, setNullSearch ] = useState(false)
    
    useEffect(()=> {
        if(search_results?.length == 0){
            setNullSearch(true)
        }
        else if(searchVal.length == 0){
            setNullSearch(false)
        }
        else{
            setNullSearch(false)
        }
    }, [null_search, search_results?.length, searchVal.length])

    function CourseCard(props: {obj: Course}){
        let {course_title, course_blurb, course_instructor, course_id, course_difficulty} = props.obj
        return(
            <div className="rounded-2xl group md:p-4 p-2  hover:bg-gray-200">
                <p className=" text-lg md:text-xl font-bold my-2">{course_title}</p>
                <p className="my-2 font-bold">{course_instructor}</p>
                <p>{course_difficulty}</p>
                <p className="my-2 text-sm">{course_blurb}</p>
                <button className="add_course hidden group-hover:block outline-none border-none p-2 rounded-xl text-white bg-emerald-700" onClick={()=> navigate(`/courses/${course_id}`)}>
                    Add Course
                </button>
            </div>
        )
    }

    



    return(
        <>
         <div className="w-11/12 p-2 md:p-4 my-2 md:my-4 mx-auto grid relative">
        <MainNav text="All Courses"/>
        <div className="md:flex gap-x-4 items-center">
        <input type="text" id='search_bar' placeholder="Search for courses..." className="outline-none border-2 border-emerald-500 p-4 md:w-8/12 w-10/12 mx-2 rounded-lg" value={searchVal} onChange={(e)=> updateSearchVal(e.target.value)}/>
    
        <div className=" text-sm bg-inherit flex gap-x-4 rounded-xl hover:bg-gray-50 col-span-1">
                <select onChange={(e)=>{
                    chooseFilter(true);
                    dispatch(setFiltersGrade(e.target.value))
                }} name="Grade Level" >
                    <option value={''}>Level: All</option>
                    <option value={'beginner'}>Beginner</option>
                    <option value={'intermediate'}>Intermediate</option>
                    <option value={'advanced'}>Advanced</option>
                </select>
        </div>

        </div>
        <p className="indent-4 text-md md:text-xl">{is_filter_chosen? determineFilterOutput()?.length :showSupaOutput()?.length} results</p>

        {null_search? <>
        <div className="grid justify-center my-4 p-4">
        <p className="text-2xl font-bold ">
            No courses on that yet. 
        </p>
        <p className="text-lg">Your search term '<b>{`${searchVal}`}</b>' yielded no results.</p>
        <p>Please try a different term or check the quality of your connection.</p>
        </div>
        </>: 
        <>
         <div className="md:grid-cols-4 gap-x-2 grid my-2">
        {is_filter_chosen?<>
        {
            determineFilterOutput()?.map((course) => (<CourseCard obj={course} key={course.course_id} />))
        }
        </>:    search_results?.map((item) => (
            <CourseCard obj={item} key={item.course_id}/>
        )) } 
        </div>
        </>}
        <MobileNav/>
        </div>
        </>
    )
}