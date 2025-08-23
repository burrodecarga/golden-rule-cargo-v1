import ServicioDetail from '@/components/servicio-detail'
import React from 'react'

export default function ServicioDetailScreen({ searchParams }: { searchParams: { id: string } }) {

    const servicioId=searchParams.id
    //console.log(servicioId)
    return (
        <ServicioDetail id={servicioId} />
    )
}
