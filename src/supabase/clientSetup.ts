import { createClient } from "@supabase/supabase-js";
import { Database } from "../supabase";

let supabaseURL = import.meta.env.VITE_CLIENT_URL
let supabaseKey = import.meta.env.VITE_API_KEY

let supabase = createClient<Database>(supabaseURL, supabaseKey)
export default supabase


supabase.channel('userUpdates')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'users' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()