import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import Calendar from "@/components/Calendar"
import { getProfile } from "@/lib/api_server"


export default async function ProtectedPage() {
  const supabase=await createClient()

  const { data, error }=await supabase.auth.getUser()
  if (error||!data?.user) {
    redirect("/auth/login")
  }
  const profile=await getProfile(data.user.id)
  if (profile?.role=='chofer') {
    redirect("/protected/employes")
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-1">
      <div className="w-full">
        <Calendar />
      </div>
    </div>
  )
}
