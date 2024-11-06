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

  //Defining another custom base query. God abeg
  /*let userDataQuery : BaseQueryFn< void , User[] | null, PostgrestError | null> = async() =>{
    const state = user_store.getState() as RootState
    let ID = state.user_information.id

    const {data, error} = await supabase.from('users').select().eq('id', ID )
    if(data){
        return data
    }
    if(error){
        return error
    }

    return {data: []}
  }*/

  export const supabaseApi = createApi({
    reducerPath: 'supabaseApi',
    baseQuery: supabaseUserQuery,
    endpoints: (builder) => ({
      getUser: builder.query<User[], void>({
        query: () => ('')
      })
    })
  });

  export const { useGetUserQuery } = supabaseApi;

