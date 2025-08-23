import { fetchServicioById } from '@/lib/api_server'
import React, { Suspense } from 'react'
import { Tabs } from './ui/tabs'
import { TabsDetailServicio } from './tabs'

export default async function ServicioDetail(id: { id: string }) {


    const servicio=await fetchServicioById(id.id)

    //console.log(id.id, servicio)
    return (
        <Suspense >
            <TabsDetailServicio item={servicio} />
        </Suspense>
    )
}
