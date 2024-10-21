import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const userSlice = createSlice({
    name:"user",
    initialState: {
        first_name: '',
        last_name: '',
        email: "", 
        id: ""
    },
    reducers:{
        setFirstName : (state, action) => {
            return {...state, first_name : action.payload}
        },
        setLastName : (state, action) => {
            return {...state, last_name : action.payload}
        },
        setEmailAddress : (state, action) => {
            return {
                ...state, email: action.payload
            }
        },
        setID : (state, action) => {
            return {...state, id : action.payload}
        }
    }
})
export const first_name = (state: RootState)=> state.user_information.first_name
export const last_name = (state: RootState)=> state.user_information.last_name
export const ID = (state: RootState) => state.user_information.id
export const {setFirstName, setLastName, setEmailAddress, setID} = userSlice.actions
export default userSlice.reducer