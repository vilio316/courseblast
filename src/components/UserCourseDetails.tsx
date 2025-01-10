import { UserCourseData } from "./UserDash";
import { MainNav } from "./NavComponents";
import expert from '../assets/expert_2.jpg'
{/*
import { useState } from "react";
*/}
import { FaBookOpen, FaClock, FaUser } from "react-icons/fa";
import { useParams } from "react-router";
//import { useGetUserCoursesQuery } from "../redux/apiSlice";
import { FullCourse, useGetAllCoursesQuery } from "../redux/apiSlice";
import { Json } from "../supabase";

export interface UCD extends UserCourseData{
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
    let {data } = useGetAllCoursesQuery()
    let user_courses = data?.filter((item) => item.course_id === courseID)
    let requested_user_course: FullCourse = {
        course_blurb: '',
        course_difficulty: '',
        course_id: '',
        course_duration: 0,
        course_instructor: '',
        course_long_desc: '',
        course_price: 0,
        course_title:'',
        course_units: []
    }
    if(data && user_courses){
        requested_user_course = user_courses[0]
    }

    let {course_duration, course_instructor, course_title, course_units} = requested_user_course
    

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
                <FaUser size={'1.5rem'} fill='blue'/>
            </div>
            <span>{course_instructor}</span>
            </div>


            <div className="flex gap-x-2 items-center">
            <div className="p-2">
                <FaBookOpen size={'1.5rem'} fill='blue'/>
            </div>
            <span>{course_units?.length} units</span>
            </div>
    
            <div className="flex gap-x-2 items-center">
            <div className="p-2">
                <FaClock size={'1.5rem'} fill='green'/>
            </div>
            <span>{course_duration} hours</span>
            </div>
            <ol className="list-decimal">
            {
                course_units?.map((course_item) => <CourseUnit unit={course_item}/>)
            }
            </ol>
        </div>
        </>
    )
}

function CourseUnit(props: {unit: Json}){
    return(
        <>
        <li>
            <div className="grid grid-cols-12">
            <p className="col-span-8">{props.unit?.toString()}</p>
            <div className="col-span-3 justify-items-center p-2 md:p-4">
                <button className="
               bg-emerald-700 text-center grid outline-none border-0 text-white rounded-sxl p-2 md:p-3 
                ">
                    Complete
                    </button>
            </div>
            </div>
        </li>
        </>
    )
} 