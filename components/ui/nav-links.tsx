'use client'
import { getProfile } from '@/lib/api_server'
import { createClient } from '@/lib/client'
import {
  UserGroupIcon,
  HomeIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { DamIcon, PieChartIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links=[
  { role: 'admin', name: 'Home', href: '/protected', icon: HomeIcon },
  { role: 'admin', name: 'Dasboard', href: '/protected/admin/servicios', icon: DamIcon },
  {
    role: 'admin', name: 'Statistics',
    href: '/protected/admin/estadisticas',
    icon: PieChartIcon,
  },
  { role: 'admin', name: 'Users', href: '/protected/admin/users', icon: UserGroupIcon },
  { role: 'admin', name: 'Vehicles', href: '/protected/admin/vehicles', icon: TruckIcon },
  { role: 'chofer', name: 'Vehicles', href: '/protected/admin/vehicles', icon: TruckIcon },

]

export default function NavLinks({ role }: { role: string }) {

  const pathName=usePathname()


  return (
    <>
      {links.map((link) => {
        if (link.role!==role) {
          return null
        }
        const LinkIcon=link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={` flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathName===link.href? ' bg-sky-100 text-blue-600':''} `

            }
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
