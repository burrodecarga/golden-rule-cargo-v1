import {
    fetchServicioById,

} from "@/lib/api_server"
import React, { Suspense } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import BtnAction from "@/components/btn_action"
import BtnActionD from "@/components/btn_action_d"
import FormGasto from "@/components/form-gastos"
import { revalidatePath } from "next/cache"
import BtnActionT from "@/components/btn_action_t"

export default async function ChoferID({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id }=await params
    const servicio=await fetchServicioById(id)

    //console.log(servicio)
    const programado=
        servicio?.position!==1&&
            servicio?.position!==2&&
            servicio?.position!==3
            ? ""
            :"hidden"
    const desarrollo=
        servicio?.position!==0&&
            servicio?.position!==2&&
            servicio?.position!==3
            ? ""
            :"hidden"
    const delivery=
        servicio?.position!==1&&
            servicio?.position!==0&&
            servicio?.position!==3
            ? ""
            :"hidden"

    const pay=
        servicio?.position!==1&&
            servicio?.position!==2&&
            servicio?.position!==0
            ? ""
            :"hidden"
    const expense=servicio?.position!==3? "":"hidden"
    return (
        <Card className='w-full max-w-7xl'>
            <CardHeader>
                <CardTitle>
                    {servicio?.chofer} Order # {servicio?.orden}
                </CardTitle>
                <CardDescription>
                    information regarding transportation
                    <div className='grid grid-cols-2'>
                        <>
                            <p>
                                <span className='font-bold'>Date:</span>
                                {servicio?.fecha_carga}
                            </p>
                            <p>
                                <span className='font-bold'>Route:</span>
                                {servicio?.ruta}
                            </p>
                            <p>
                                <span className='font-bold'>Origin:</span>
                                {servicio?.origen}
                            </p>
                            <p>
                                <span className='font-bold'>Destination:</span>
                                {servicio?.destino}
                            </p>
                            <p>
                                <span className='font-bold'>Broker:</span>
                                {servicio?.broker}
                            </p>
                            <p>
                                <span className='font-bold'>Dispacher:</span>
                                {servicio?.despachador}
                            </p>
                            <p>
                                <span className='font-bold'>pay:</span>
                                {servicio?.forma_de_pago}
                            </p>
                        </>
                        <div className={expense}>{servicio&&<FormGasto id={servicio?.id!} />}</div>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className={programado}>
                    <p>
                        Press the button to register the correct loading of the merchandise
                        and start of the transport of the cargo.
                    </p>
                    <p>notify the start of cargo transportation</p>
                    <p>
                        Upon notification you will be redirected to the trip control screen
                        where you can register related events.
                    </p>
                    <BtnAction id={servicio?.id!} />
                </div>
                <div className={desarrollo}>
                    <p>Press the button to register the correct delivery of the cargo.</p>
                    <p>notify the end of cargo transportation.</p>
                    <p>
                        After pressing the button you will be redirected to the home page.
                    </p>
                    <BtnActionD id={servicio?.id!} />
                </div>
                <div className={delivery}>
                    <p>Press the button to register the correct delivery of the cargo.</p>
                    <p>notify the end of cargo transportation.</p>
                    <p>
                        After pressing the button you will be redirected to the home page.
                    </p>
                    <BtnActionT id={servicio?.id!} />
                </div>
            </CardContent>
            <CardFooter className='flex-col gap-2'></CardFooter>
        </Card>
    )
}
