import { createClient } from "@/lib/server"
import { redirect } from "next/navigation"
import { Redirector } from "@/components/redirector"
import { Suspense } from "react"

export default async function Home() {
  const supabase=createClient()
  const { data, error }=await (await supabase).auth.getUser()
  if (error||!data?.user) {
    redirect('/auth/login')
  }

  const { data: profile, error: profile_error }=await (await supabase).from('profiles').select('*').eq('id', data.user.id
  ).single()

  console.log(profile, data.user.id)
  if (profile_error||!profile) {
    redirect("/auth/login")
  }


  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <Suspense fallback={<h1>Cargando....</h1>}>
          <Redirector role={profile.role} />
        </Suspense>
      </div>
    </div>
  )
}
