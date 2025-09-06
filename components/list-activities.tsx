import { FetchServicios } from "@/lib/api"
import React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { formatCurrency, formatDateToLocal } from "@/helpers/utils"
import { Separator } from "@radix-ui/react-separator"

export default function ListActivities({
    activities,
    filter
}: {
    activities: FetchServicios
    filter: number
}) {
    return (
        <div className='w-full p-5'>
            <h4 className='w-full mx-auto text-sm leading-none font-medium'>Trips</h4>
            <div className='flex flex-row gap-3 rounded-md border border-gray-50 p-5 bg-red-100'>
                {activities&&
                    activities
                        .sort((a, b) => (a.start!>b.start!? -1:1))
                        .map((a) => (
                            <React.Fragment key={a.id}>
                                <Card className='flex-1'>
                                    <CardHeader>
                                        <CardTitle className='space-y-2'>
                                            <p>{a.ruta?.toUpperCase()}</p>
                                            <p>{formatDateToLocal(a.start!)}</p>
                                            <p>Broker:{a.broker?.toUpperCase()}</p>
                                            <p>Dispacher:{a.despachador?.toUpperCase()}</p>
                                            <p>Price:{formatCurrency(a.precio_de_servicio!)}</p>
                                            <p>Pay:{a.forma_de_pago}</p>
                                        </CardTitle>
                                        <CardDescription>
                                            <p>Origin:{a.origen}</p>
                                            <p>{a.destino}</p>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>Payload:{a.carga}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <p>Card Footer</p>
                                    </CardFooter>
                                </Card>
                            </React.Fragment>
                        ))}
            </div>
        </div>
    )
}
