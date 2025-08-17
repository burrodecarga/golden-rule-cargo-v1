import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import Calendar from "@/components/Calendar"

export default async function ProtectedPage() {
  const supabase=await createClient()

  const { data, error }=await supabase.auth.getClaims()
  if (error||!data?.claims) {
    redirect("/auth/login")
  }


  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <Calendar />
      </div>
    </div>
  )
}
