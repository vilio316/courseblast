import { createApi, BaseQueryFn} from "@reduxjs/toolkit/query/react";
import supabase from "../supabase/clientSetup";
import { Json } from "../supabase";
import { PostgrestError } from "@supabase/supabase-js";
import { RootState, user_store } from "./store";

type User = {
    id: string;
    email: string | null;
    user_courses: Json[] | null;
    user_first_name: string | null;
    user_last_name: string | null;
    user_points_balance: number | null;
  };

export interface Course{
          course_blurb: string | null
          course_difficulty: string | null
          course_duration: number | null
          course_id: string
          course_instructor: string | null
          course_price: number 
          course_title: string
}

let userCoursesQuery : BaseQueryFn<
void, 
any[] |null, 
PostgrestError | null > = async()=>{
  let state = user_store.getState() as RootState
  let ID = state.user_information.id
  const {data, error} = await supabase.from('users').select('user_courses').eq('id', ID)
  if(data){
    return {data}
  }
  if(error){
    return {error}
  }
  return {data: []}
}


let supabaseCoursesQuery : BaseQueryFn<void,
 Course[] | null, 
 PostgrestError | null > = async ()=> {
    const {data, error} = await supabase.from('courses').select()
    if(data){
      return {data}
    }

    if(error){
      return {error}
    }

    return {data: []}
}

  // Define a custom base query function
  let supabaseUserQuery : BaseQueryFn< void,
  User[] | null, 
  PostgrestError|null > = async ()=> {
    let state = user_store.getState() as RootState
    let ID = state.user_information.id
    const {data, error} = await supabase.from('users').select().eq('id', ID)

    if(data){
        return {data}
    }

    if(error){
        return {error}
    }

    return {data : []}
  }

  export const supabaseApi = createApi({
    reducerPath: 'supabaseApi',
    baseQuery: supabaseUserQuery,
    endpoints: (builder) => ({
      getUser: builder.query<User[], void>({
        query: () => ('')
      })
    })
  });

  export const userCourses = createApi({
    reducerPath: 'supabaseUserCourses',
    baseQuery: userCoursesQuery,
    endpoints: (builder) => ({
      getUserCourses : builder.query<any[], void>({
        query: () => ('')
      })
    })
  })

  export const coursesAPISlice = createApi({
    reducerPath: 'supabaseCourses',
    baseQuery: supabaseCoursesQuery,
    endpoints: (builder) => ({
      getAllCourses: builder.query<Course[], void>({
        query: () => (``)
      })
    })
  });


  export const { useGetUserQuery } = supabaseApi;
  export const { useGetAllCoursesQuery } = coursesAPISlice
  export const { useGetUserCoursesQuery } = userCourses