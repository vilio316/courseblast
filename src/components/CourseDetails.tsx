import { useParams } from "react-router";
import { MainNav } from "./UserDash";
import { dummyCourseData } from "./UserDash"
;
import { dummyCourseProgression } from "./UserCourseDetails";
import { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";


export function CourseDetails(){
    let params = useParams()
    let [course_modal, showMod] = useState(false)
    let [object] = dummyCourseData.filter((course) => course.courseID == params.courseID) 
    let {course_title, course_instructor} = object
    let {course_unit_details} = dummyCourseProgression

    return(
        <>
        <div className="w-11/12 mx-auto p-4 relative">
        <MainNav text="Courses"/>  
        <div className="flex gap-x-2 p-2 items-center">
        <p className="font-bold text-xl ">
            {course_title}
            </p>
        <button className='font-bold text-white p-2 bg-emerald-700 rounded-xl' onClick={()=> showMod(true)
        }>
            Add Course
        </button>
        </div>      
        <p className='text-emerald-700 font-bold text-xl'>
                $2000
        </p>
        <p>{course_instructor}</p>
        <p className="text-justify indent-8">{object.course_blurb}</p>
        <p className="my-4 font-bold text-xl md:text-2xl">
            Units
        </p>
        <ol className="list-decimal m-2 p-2">
        {course_unit_details.map((unit) => (
            <>
            <li key={unit.unit_number}>{unit.unit_title}</li>
            </>
        ))}
        </ol>
        </div>
        <div className={`w-full bg-gray-300 opacity-85 z-10 absolute top-0 h-full ${course_modal? 'grid': 'hidden'}`}>
            <div className={`md:w-6/12 w-full bg-white h-9/12 mx-auto p-4 opacity-100`}>
            <span className="w-full text-right block hover:text-red-500 text-4xl font-bolds" onClick={()=> showMod(false) }>x</span>
                <p className="font-bold text-3xl">{course_title}</p>
                <p className="text-emerald-700 text-xl font-bold my-2">$2000</p>
                <p>{course_instructor}</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur et sit autem repellat iure placeat, dolorum dolor laudantium quidem incidunt obcaecati ipsam consequuntur quis perferendis minima corrupti. Delectus, vitae cum.</p>

                <div className="grid my-4 h-4/6">
                <button className="outline-none border-4 bg-white border-blue-800 p-4 rounded-xl text-emerald-700 justify-self-center w-9/12 hover:bg-blue-300 transition-colors self-end">
                    <div className="flex items-center justify-center gap-x-4">
                        <FaShoppingBasket size='1.5rem' fill="blue"/>
                        <p className="text-blue font-bold">{'Add to Blastcart'.toUpperCase()}</p>
                    </div>

                </button>
                </div>
            </div>
        </div>
        </>
    )
}