import ServicioDetail from '@/components/servicio-detail'
import React from 'react'

export default function ServicioDetailScreen(id: string) {
    const servicioId=id!
    return (
        <ServicioDetail id={servicioId} />
    )
}
