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
import { ESTATUS } from "@/helpers/definitions"
import { Button } from "./ui/button"
import Link from "next/link"

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
            <div className='flex flex-1 flex-wrap flex-row gap-3 rounded-md border border-gray-50 p-5 bg-red-100'>
                {activities&&
                    activities
                        .sort((a, b) => (a.start!>b.start!? -1:1))
                        .map((a) => (
                            <React.Fragment key={a.id}>
                                <Card className='flex-1'>
                                    <CardHeader>
                                        <CardTitle className='space-y-2'>
                                            <p>
                                                {a.ruta?.toUpperCase()} - Order:# {a.orden}
                                            </p>
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
                                        <p>Observations:{a.observaciones}</p>
                                    </CardContent>
                                    <CardFooter className='flex-col'>
                                        <p>Status: {ESTATUS[a.position!]}</p>
                                        <Separator />
                                        {a.position===0&&(
                                            <Link href={`/protected/employes/services/${a.id}`}>
                                                <Button className='bg-grey-600'>Programado</Button>
                                            </Link>
                                        )}
                                        {a.position===1&&(
                                            <Link href={`/protected/employes/services/${a.id}`}>
                                                <Button>En Proceso</Button>
                                            </Link>
                                        )}
                                        {a.position===2&&(
                                            <Link href={`/protected/employes/services/${a.id}`}>
                                                <Button className='bg-red-600'>
                                                    Culminado y No pagado
                                                </Button>
                                            </Link>
                                        )}
                                        {a.position===3&&(
                                            <Link href={`/protected/employes/services/${a.id}`}>
                                                <Button className='bg-green-600'>
                                                    Culminado y pago
                                                </Button>
                                            </Link>
                                        )}
                                    </CardFooter>
                                </Card>
                            </React.Fragment>
                        ))}
            </div>
        </div>
    )
}
