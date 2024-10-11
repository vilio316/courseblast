import { createApi, fakeBaseQuery, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import supabase from "../supabase/clientSetup";

/* const supabaseApiSlice = createApi({
    reducerPath: 'supabaseApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) =>({
        getData : builder.query({
            queryFn : async ()=> {
                const {data, error} = await supabase.from('users').select()
                if(error){
                    return error
                }
                else{
                    return data
                }
            }
        })
    })
}) */
export {}



/* endpoints: (builder) => ({
    getBlogs: builder.query({
      queryFn: async () => {
        // Supabase conveniently already has `data` and `error` fields
        const { data, error } = await supabase.from('blogs').select()
        if (error) {
          return { error }
        }
        return { data }
      },
    }),*/