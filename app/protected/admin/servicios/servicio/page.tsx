import ServicioDetail from '@/components/servicio-detail'
import React from 'react'

export default async function ServicioDetailScreen(props: {
    searchParams?: Promise<{
        id?: string

    }>
}) {
    const searchParams=await props.searchParams
    const servicioId=searchParams?.id||''



    //console.log(servicioId)
    return (
        <ServicioDetail id={servicioId} />
    )
}
