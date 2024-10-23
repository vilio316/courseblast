import { UserCourseData } from "./UserDash";
import expert from '../assets/expert_2.jpg'
import { useParams } from "react-router";
import { useState } from "react";
import { FaClock } from "react-icons/fa";


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

const dummyCourseProgression : UCD= 
    {
        course_instructor: "Amir Rash",
        course_blurb: "Go from Zero To OOP Hero in thirty days with this new and improved Python course. In this course, you will come to understand various concepts in the field of object-oriented programming, including polymorphism, encapsulation and abstraction. You will also learn various Python techniques, best practices and libraries to improve your understanding of Python programming concepts. ",
        course_units_count: 12,
        course_progress_percentage: 0,
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
        courseID: "",
        course_duration: '9'
    }



export function UserCourseDetails(){
    let param = useParams()
    console.log(param)
    let {course_title , course_units_count, course_units_completed, course_duration} = dummyCourseProgression
    let [units_state, changeUnits] = useState(course_units_completed)


    function CourseUnit(props : compProps){
        let {course_unit_details} = props.object
    
        function Unit(props: {object : CourseUnit}){
            let [blurb_state, setBlurbState] = useState(false)
            let {unit_blurb, unit_number, unit_status, unit_title } = props.object
            let [status, updateStatus] = useState(unit_status)
            return(
                <>
                <div key={`unit_${unit_number}`} className="hover:bg-gray-400 p-2 rounded-xl">
                <div className="grid peer items-center w-full grid-cols-12 p-2 rounded-xl" onChange={()=> {
                    setBlurbState(!blurb_state)
                }}> 
                    <p className="font-bold">{unit_number}.</p>
                    <p className="p-2 col-span-10 text-lg my-2 font-bold ">{unit_title}</p>
                    < button onClick={()=>{
                        if(status == false){
                            changeUnits((state) => state += 1);
                            updateStatus(true)
                        }
                        else{
                            changeUnits((state) => state -= 1)
                            updateStatus(false)
                        }
                    }}>
                        {status? "Mark Incomplete" : "Mark Complete"}
                    </button>
                </div>
                <p className={`my-1 ${blurb_state ? 'block' : 'hidden'} whitespace-nowrap w-10/12 transition-all`}>{unit_blurb}</p>
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
            <div className="img_container w-full grid">
                <img src = {expert} className="w-full md:h-48 object-cover" alt="Course Image"/>
            </div>
            <p className="text-2xl font-bold my-4">{course_title}</p>
            <p>{course_units_count} units</p>
            <p>{units_state * 100 / course_units_count}% Complete</p>
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

