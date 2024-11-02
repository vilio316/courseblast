import { useParams } from "react-router";
import { MainNav } from "./UserDash";
import react from '../assets/expert_2.jpg'
import { dummyCourseProgression } from "./UserCourseDetails";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCourses } from "../redux/userSlice";

export function UnitDetails(){
    let value = useParams()
    let dispatch = useDispatch()
    let [info_object]= dummyCourseProgression.course_unit_details.filter((item) => item.unit_number == Number(value.unit_number)) 
    let baseArray = dummyCourseProgression
    let course_details = dummyCourseProgression.course_unit_details.filter((item) => item.unit_number !== Number(value.unit_number))
    let [unit_is_complete, completeUnit] = useState(info_object.unit_status)
    return(
        <>
        <div className="mx-auto w-11/12 my-4 p-2"> 
        <MainNav/>
        <div>
            <img src={react} alt="Test Image" className='h-40 w-full object-cover'/>
        </div>
        <div>
        <p>Course Title: </p>
        <div className="flex gap-x-4 p-2 items-center">
        <p className="font-bold">Unit {value.unit_number}: {info_object.unit_title}</p>
        <button className="bg-emerald-700 rounded-2xl p-2 text-white font-bold" onClick={()=> {
            completeUnit(!unit_is_complete)
            let new_obj = {...info_object, unit_status : !unit_is_complete}
            let updated_course_details = [...course_details, new_obj]
            updated_course_details.sort((a,b) => a.unit_number - b.unit_number)
            console.log(updated_course_details)
            let newCoursesArray = {...baseArray, course_unit_details: updated_course_details}
            dispatch(setCourses(newCoursesArray))
        }}>
            {unit_is_complete? 'Completed' : 'Mark as Complete'}
        </button>
        </div>
        <p className="text-justify font-bold text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non necessitatibus ad, at autem dolor sunt commodi! At, consequuntur nam. Labore quam modi sed quaerat unde provident tenetur consequatur at natus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam maiores laborum ea architecto autem debitis a expedita nisi explicabo quas ipsam officia itaque necessitatibus minima veritatis velit facilis, esse facere. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo ex rem quasi, ea mollitia, veritatis iure dolores repellendus aliquid suscipit architecto quidem quaerat. Itaque soluta obcaecati, beatae totam tenetur ipsa! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem ullam dolorem tempore similique cupiditate accusamus. Id voluptate eius tempore accusamus quam ipsa modi delectus? Expedita adipisci voluptate laborum nobis praesentium! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, sunt, itaque placeat dolorem alias voluptas explicabo distinctio nisi officiis optio ipsum! Ratione dignissimos mollitia doloremque veniam, ad dolor iure non. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa minima adipisci libero, ipsa consequuntur fuga quae dolores sed nulla labore facilis illum blanditiis, at corrupti modi minus sunt recusandae vero.</p>
        </div>
        </div>
        </>
    )
}