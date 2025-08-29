import FormVehicle from '@/components/form-vehicle'
import { getVehicle } from '@/lib/api_server'
import React from 'react'

export default async function VehicleDetailRoute({ params }: { params: Promise<{ id: string }> }) {
    const { id }=await params

    const vehicle=await getVehicle(id)
    return (
        <div>
            <FormVehicle vehicle={vehicle} />
        </div>
    )
}
