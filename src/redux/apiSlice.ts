import { createApi, BaseQueryFn} from "@reduxjs/toolkit/query/react";
import supabase from "../supabase/clientSetup";
import { Json } from "../supabase";
import { PostgrestError } from "@supabase/supabase-js";

type User = {
    id: string;
    email: string | null;
    user_courses: Json[] | null;
    user_first_name: string | null;
    user_last_name: string | null;
    user_points_balance: number | null;
  };
  
  // Define a custom base query function
  let supabaseQuery: BaseQueryFn< void,
  User[],
  PostgrestError|null > = async ()=> {
    const {data, error} = await supabase.from('users').select()

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
    baseQuery: supabaseQuery, // Use the custom base query function
    endpoints: (builder) => ({
      getUsers: builder.query<User[], void>({
        query: () => (''),
      }),
    }),
  });

  export const { useGetUsersQuery } = supabaseApi;

/* type User = {
  id: string;
  email: string | null;
  user_courses: string[] | null;
  user_first_name: string | null;
  user_last_name: string | null;
  user_points_balance: number | null;
};

// Define a custom base query function
const supabaseQuery: BaseQueryFn<
  { query: string }, // Args type
  User[],           // Result type
  PostgrestError    // Error type
> = async ({ query }) => {
  const { data, error } = await supabase.from('users').select(query);

  if (error) {
    return { error };
  }

  return { data };
};*/