import { fetchAllChoferes, fetchAllPlataformas, fetchAllVehicles } from '@/lib/api'
import { fetchPlataformaSemanas, getGastosByServicioId } from '@/lib/api_server'
import React from 'react'

export default async function EditPageRoute(props: {
    searchParams?: Promise<{
        id?: string

    }>
}) {
    const searchParams=await props.searchParams
    const servicioId=searchParams?.id||''
    const servicio=await getGastosByServicioId(servicioId)
    const vehiculos=await fetchAllVehicles()
    const plataformas=await fetchAllPlataformas()
    const choferes=await fetchAllChoferes()

    return (
        <div>EditPageRoute{servicioId}XXXX</div>
    )
}
