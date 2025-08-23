import { fetchServicioById } from '@/lib/api_server'
import React, { Suspense } from 'react'
import { Tabs } from './ui/tabs'
import { TabsDetailServicio } from './tabs'

export default async function ServicioDetail(id: { id: string }) {

    const servicioId=id.id
    const servicio=await fetchServicioById(servicioId)

    //console.log(id.id, servicio)
    return (
        <Suspense >
            <TabsDetailServicio servicio={servicio} />
        </Suspense>
    )
}
