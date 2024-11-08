import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

let filterSlice = createSlice({
    name: 'filters',
    initialState: {
            name: '',
            grade: '',
            price: 30
    },
    reducers:{
        setFiltersName: (state, action)=> {
            return {...state, name: action.payload}
        },
        setFiltersGrade : (state, action) => {
            return {...state, grade: action.payload}
        }
    }
})

export const {setFiltersName, setFiltersGrade} = filterSlice.actions
export default filterSlice.reducer
export const filterValues = (state: RootState) => state.selected_filters.name
export const gradeFilter = (state: RootState) => state.selected_filters.grade