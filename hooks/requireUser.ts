"use server"

import { createClient } from "@/lib/client"
import { redirect } from "next/navigation"

const supabase=await createClient()
export const requireUser=async () => {
    const { data, error }=await supabase.auth.getClaims()
    //console.log('DATA', data?.claims)
    if (error||!data?.claims) {
        return redirect("/auth/login")
    }

    return data
}