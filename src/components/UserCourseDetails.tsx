import { UserCourseData } from "./UserDash";
import expert from '../assets/expert_2.jpg'
import { useParams } from "react-router";


interface UCD extends UserCourseData{
    course_units_count : number,
    course_unit_details : CourseUnit[]
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
        course_title: "Basics of Object-Oriented Programming",
        course_unit_details: [
            {
                unit_title: "Introduction",
                unit_blurb: "Introducton to the course matter, key concepts and recommended technologies",
                unit_number: 1,
                unit_status: false
            }, 
            {
                unit_title: "Introduction",
                unit_blurb: "Introducton to the course matter, key concepts and recommended technologies",
                unit_number: 2,
                unit_status: true
            }, 
        ],
        courseID: ""
    }



export function UserCourseDetails(){
    let param = useParams()
    console.log(param)
    let {course_title} = dummyCourseProgression


    return(
        <>
        <div className="container mx-auto p-4">
            <div className="img_container w-full grid">
                <img src = {expert} className="w-full md:h-48 object-cover" alt="Course Image"/>
            </div>
            <p className="text-2xl font-bold my-4">{course_title}</p>
            <CourseUnit object = {dummyCourseProgression} />
        </div>
        </>
    )
}

function CourseUnit(props : compProps){
    let {course_unit_details} = props.object

    return(
        <>
        {course_unit_details.map(({unit_status, unit_number, unit_title}) => (
            <div className="grid items-center w-full grid-cols-12" key={`unit_${unit_number}`}>
                <p>{unit_number}.</p>
                <p className="p-4 col-span-6 text-2xl my-4 font-bold ">{unit_title}</p>
                <input type="checkbox" name="val" id="vlad" checked={unit_status} readOnly />
            </div>
        ))}
        </>
    )



} 