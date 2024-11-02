import { MainNav, UserCourseData } from "./UserDash";
import expert from '../assets/expert_2.jpg'
import { useState } from "react";
import { FaBookOpen, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useParams } from "react-router";


interface UCD extends UserCourseData{
    course_units_count : number,
    course_unit_details : CourseUnit[]
    course_duration: string
    course_units_completed: number
}

type CourseUnit = {
    unit_title : string,
    unit_number : number,
    unit_blurb : string,
    unit_status : boolean,
}

type compProps ={
    object : UCD
}

export const dummyCourseProgression : UCD= 
    {
        course_instructor: "Amir Rash",
        course_blurb: "Go from Zero To OOP Hero in thirty days with this new and improved Python course. In this course, you will come to understand various concepts in the field of object-oriented programming, including polymorphism, encapsulation and abstraction. You will also learn various Python techniques, best practices and libraries to improve your understanding of Python programming concepts. ",
        course_units_count: 12,
        course_progress_percentage: 33,
        course_units_completed: 3,
        course_title: "Basics of Object-Oriented Programming",
        course_unit_details: [
            {
                unit_title: "Introduction",
                unit_blurb: "Introducton to the course matter, key concepts and recommended technologies",
                unit_number: 1,
                unit_status: false
            }, 
            {
                unit_title: "Definition of Terms",
                unit_blurb: "Introducton to the course matter, key concepts and recommended technologies",
                unit_number: 2,
                unit_status: true
            }, 
        ],
        courseID: 
        '43red-45k67',
        course_duration: '9',
    }



export function UserCourseDetails(){
    let {courseID} = useParams()
    console.log(courseID)
    let {course_title , course_units_count, course_duration, course_progress_percentage} = dummyCourseProgression
    let navigate = useNavigate()
    function CourseUnit(props : compProps){
        let {course_unit_details} = props.object
    
        function Unit(props: {object : CourseUnit}){
            let [blurb_state, setBlurbState] = useState(false)
            let {unit_blurb, unit_number, unit_status, unit_title } = props.object
            return(
                <>
                <div key={`unit_${unit_number}`} className="hover:bg-gray-200 hover:shadow-md hover:shadow-emerald-300 p-2 rounded-xl">
                <div className="grid peer items-center w-full grid-cols-12 p-2 rounded-xl" onClick={()=> {
                    setBlurbState(!blurb_state)
                }}> 
                    <p className="font-bold">{unit_number}.</p>
                    <p className="p-2 col-span-9 text-lg my-2 font-bold ">{unit_title}</p>
                    <button className=' col-span-2 p-2 w-10/12 outline-none border-none rounded-2xl text-lg text-white bg-emerald-700'>{!unit_status ? "Continue": "Completed!"}</button>
                </div>
                <p className={`my-1 ${blurb_state ? 'block' : 'hidden'} whitespace-nowrap w-10/12 transition-all indent-4`} onClick={()=> navigate(`/user/courses/${courseID}/${unit_number}`)}>{unit_blurb}</p>
                </div>
                </>
            )
    
        }
    
        return(
            <>
            {course_unit_details.map((unit : CourseUnit) => (
                <Unit object={unit} key={unit.unit_number} />
            ))}
            </>
        )
    
    
    
    } 

    return(
        <>
        <div className="container mx-auto p-4">
        <MainNav/>
            <div className="img_container w-full grid  my-4">
                <img src = {expert} className="w-full md:h-48 object-cover" alt="Course Image"/>
            </div>
            <p className="text-2xl font-bold my-4">{course_title}</p>
            <div className="flex gap-x-2 items-center">
            <div className="p-2">
                <FaBookOpen size={'1.5rem'} fill='blue'/>
            </div>
            <span>{course_units_count} units</span>
            </div>
          
            <div className="flex gap-x-2 items-center">
            <div className="p-2">
                <FaLocationDot size={'1.5rem'} fill='green'/>
            </div>
            <span>{course_progress_percentage}% complete</span>
            </div>

            <div className="flex gap-x-2 items-center">
            <div className="p-2">
                <FaClock size={'1.5rem'} fill='green'/>
            </div>
            <span>{course_duration} hours</span>
            </div>
            <CourseUnit object = {dummyCourseProgression} />
        </div>
        </>
    )
}

