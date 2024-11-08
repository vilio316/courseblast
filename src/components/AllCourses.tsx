import { useEffect, useState } from "react"
import { MainNav, MobileNav} from "./UserDash"
import { dummyCourseData } from "./UserDash"
import { UserCourseData } from "./UserDash"
import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { filterValues, gradeFilter, setFiltersGrade, setFiltersName } from "../redux/filterSlice"


export function AllCourses(){
    let navigate = useNavigate()
    let dispatch = useAppDispatch()
    let filter_values= useAppSelector(filterValues)
    let gradeValue = useAppSelector(gradeFilter)
    let [is_filter_chosen, chooseFilter] = useState(false)
    console.log(is_filter_chosen)
    let [searchVal, updateSearchVal] = useState('')
    let search_results = dummyCourseData.filter((item) => item.course_title.toLowerCase().includes(searchVal.toLowerCase()))

    function determineFilterOutput(){
    let nameFilterResults;
    nameFilterResults = dummyCourseData.filter((item) => item.course_title.toLowerCase().includes(filter_values))
    if(gradeValue.length > 1){
       let arr = nameFilterResults.filter((course) => course.course_blurb.toLowerCase().includes(gradeValue))
       console.log(arr) 
       return arr
    }
    else{
        return nameFilterResults
    }
}
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
        let {course_title, course_blurb, course_instructor, courseID} = props.obj
        return(
            <div className="rounded-2xl group p-4 hover:bg-gray-200">
                <p className="text-xl font-bold my-2">{course_title}</p>
                <p className="my-2 font-bold">{course_instructor}</p>
                <p className="my-2 text-sm">{course_blurb}</p>
                <button className="add_course hidden group-hover:block outline-none border-none p-2 rounded-xl text-white bg-emerald-700" onClick={()=> navigate(`/courses/${courseID}`)}>
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
        <div className="grid grid-cols-3 filters">
            <div className="bg-inherit flex gap-x-4 rounded-xl hover:bg-gray-50 text-sm col-span-1">
                <select onChange={(e)=>{
                    chooseFilter(true)
                    dispatch(setFiltersName(e.target.value))
                }} name="Key Concept" >
                    <option value={''}>All Concepts</option>
                    <option value={'jojo'}>JoJo</option>
                    <option value={'oop'}>OOP</option>
                    <option value={'.net'}>.NET</option>
                </select>
        </div>

        <div className=" text-sm bg-inherit flex gap-x-4 rounded-xl hover:bg-gray-50 col-span-1">
                <select onChange={(e)=>{
                    chooseFilter(true);
                    dispatch(setFiltersGrade(e.target.value))
                }} name="Grade Level" >
                    <option value={''}>Level: All</option>
                    <option value={'begin'}>Beginner</option>
                    <option value={'inter'}>Intermediate</option>
                    <option value={'pro'}>Professional</option>
                </select>
        </div>


        </div>
        </div>
        <p className="indent-4 my-2 text-lg md:text-xl">{determineFilterOutput().length} results</p>
        {is_filter_chosen? <>
        Now Using Filters
        </>
    : <>
        </>}
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
            determineFilterOutput().map((course) => (<CourseCard obj={course} key={course.courseID} />))
        }
        </>:    search_results.map((item) => (
            <CourseCard obj={item } key={item.courseID} />
        )) } 
        </div>
        </>}
        <MobileNav/>
        </div>
        </>
    )
}