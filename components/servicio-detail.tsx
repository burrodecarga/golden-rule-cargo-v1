import { fetchServicioById } from '@/lib/api_server'
import React from 'react'

export default async function ServicioDetail(id: { id: string }) {

    const servicio=await fetchServicioById(id.id!)

    console.log(servicio)
    return (
        <div>{servicio[0].id}</div>
    )
}
