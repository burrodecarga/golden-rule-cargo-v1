'use client'
import Link from 'next/link'
import NavLinks from './nav-links'
import { PowerIcon } from 'lucide-react'
import { createClient } from "@/lib/supabase/client"
import { useRouter } from 'next/router'
import { LogoutButton } from '../logout-button'
export default function SideNav({ role }: { role: string }) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <h3 className='text-center text-xs'>Golden Rulle Cargo LLC</h3>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks role={role} />
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
