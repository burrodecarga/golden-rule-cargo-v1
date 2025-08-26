import { getGastosByServicioId } from '@/lib/api_server'
import React, { Suspense } from 'react'
import GastosTable from './table-gastos'
import Search from './search'

export default async function Expenses({
    id,
    // query,
    // currentPage,
}: {
    id: string
    // query: string
    // currentPage: number
}) {
    let totalArray: number[]=[]
    let total=0

    const gastos=await getGastosByServicioId(id)

    return (
        <Suspense key={id} fallback={<div><p>Cargando....</p></div>}>

            <GastosTable gastos={gastos} />
        </Suspense>
    )
}
