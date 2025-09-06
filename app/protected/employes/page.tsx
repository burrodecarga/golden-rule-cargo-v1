import ListActivities from '@/components/list-activities'
import { getServiciosByChofer } from '@/lib/api'
import { createClient } from '@/lib/server'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function EmployesRoute() {

    const supabase=createClient()
    const { data, error }=await (await supabase).auth.getUser()
    if (error||!data?.user) {
        redirect('/auth/login')
    }

    const serviciosByChofer=await getServiciosByChofer(data.user.id)

    //console.log('SERVICIOS DEL CHOFER', serviciosByChofer)

    return (
        <ListActivities activities={serviciosByChofer} filter={3} />
    )
}
