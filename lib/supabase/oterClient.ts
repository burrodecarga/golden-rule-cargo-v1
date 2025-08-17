import { Database } from "@/types/db_types"
import { createClient } from "@supabase/supabase-js"

export const superSupabase=createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
)
