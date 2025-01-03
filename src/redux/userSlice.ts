import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Course } from "./apiSlice";

type State = {
    first_name: string,
    last_name: string,
    email: string, 
    id: string,
    pfp_url?: string, 
    enrolled_courses: Course[],
    cart_state: {title: string, price:number, id:string}[
    ], 
}

let initialState : State = {
    first_name: '',
    last_name: '',
    email: '',
    id: '',
    enrolled_courses: [],
    cart_state: [], 
    pfp_url: '',
    
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
        },
        updatePFP: (state, action) => {
            return {...state, pfp_url: action.payload}
        },
    }
})
export const first_name = (state: RootState)=> state.user_information.first_name
export const last_name = (state: RootState)=> state.user_information.last_name
export const ID = (state: RootState) => state.user_information.id
export const emailAddress = (state: RootState) => state.user_information.email
export const enrolledCourses = (state: RootState) => state.user_information.enrolled_courses
export const pfp = (state: RootState) => state.user_information.pfp_url
export const {setFirstName, setLastName, setEmailAddress, setID, setCourses, setCartState, updateEnrolledCourses, updatePFP} = userSlice.actions
export const cart = (state: RootState) => state.user_information.cart_state
export default userSlice.reducer