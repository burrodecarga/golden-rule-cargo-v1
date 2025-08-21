import { createClient } from "./supabase/client"


const supabase=await createClient()
export const allServicios=async () => {

    const { data, error }=await supabase.from("servicios").select("*")
    console.log('SEVER', data)
    return data
}
