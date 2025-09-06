import SideNav from "@/components/ui/sidenav"
import { createClient } from "@/lib/server"
import { redirect } from "next/navigation"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const supabase=createClient()
  const { data, error }=await (await supabase).auth.getUser()
  if (error||!data?.user) {
    redirect('/auth/login')
  }

  const { data: profile, error: profile_error }=await (await supabase).from('profiles').select('*').eq('id', data.user.id
  ).single()




  return (
    <main>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-60">
          <SideNav role={profile.role} />
        </div>
        <div className="flex-grow p-4 md:overflow-y-auto md:p-6">
          {children}
        </div>

      </div>
    </main>
  )
}
