import { createSlice } from "@reduxjs/toolkit";

type nameType ={
    first_name: string,
    last_name: string, 
    email: string,
    id:string
}

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
export const first_name = (state: nameType)=> state.first_name
export const last_name = (state: nameType)=> state.last_name
export const {setFirstName, setLastName, setEmailAddress, setID} = userSlice.actions
export default userSlice.reducer