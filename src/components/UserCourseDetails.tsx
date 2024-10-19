import { UserCourseData } from "./UserDash";

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

function UserCourseDetails(props: compProps){
    let alpha = props.object

    return(
        <>
        
        </>
    )

}