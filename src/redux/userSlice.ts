import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UCD } from "../components/UserCourseDetails";
import { Course } from "./apiSlice";

type State = {
    first_name: string,
    last_name: string,
    email: string, 
    id: string,
    course_details: UCD,
    enrolled_courses: Course[],
    cart_state: {title: string, price:number, id:string}[
    ]
}

let initialState : State = {
    first_name: '',
    last_name: '',
    email: '',
    id: '',
    enrolled_courses: [],
    course_details: {
        course_blurb: '',
        course_duration: '',
        course_instructor: '',
        course_progress_percentage: 0,
        course_title: '',
        course_unit_details: [],
        course_units_completed: 0,
        course_units_count: 0,
        courseID: ''
    },
    cart_state: []
}

const userSlice = createSlice({
    name:"user",
    initialState
    ,
    reducers:{
        setFirstName : (state, action) => {
            return {...state, first_name : action.payload}
        },
        setLastName : (state, action) => {
            return {...state, last_name : action.payload}
        },
        setEmailAddress : (state, action) => {
            return {...state, email: action.payload}
        },
        setID : (state, action) => {
            return {...state, id : action.payload}
        },
        setCourses : (state, action) => {
            return {...state, course_details: action.payload}
        },
        setCartState : (state, action) => {
            return {...state, cart_state: action.payload}
        }, 
        updateEnrolledCourses: (state, action) => {
            return {...state, enrolled_courses: action.payload}
        }
    }
})
export const first_name = (state: RootState)=> state.user_information.first_name
export const last_name = (state: RootState)=> state.user_information.last_name
export const ID = (state: RootState) => state.user_information.id
export const emailAddress = (state: RootState) => state.user_information.email
export const courses = (state: RootState) => state.user_information.course_details
export const enrolledCourses = (state: RootState) => state.user_information.enrolled_courses
export const {setFirstName, setLastName, setEmailAddress, setID, setCourses, setCartState, updateEnrolledCourses} = userSlice.actions
export const cart = (state: RootState) => state.user_information.cart_state
export default userSlice.reducer