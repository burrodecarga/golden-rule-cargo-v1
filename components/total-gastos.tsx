'use client'
import { getGastosByServicioId } from '@/lib/api_server'
import React, { useEffect } from 'react'

export default function TotalGastos({ id }: { id: string }) {
    let totalArray: number[]=[]
    let total=0
    const sumGastos=async () => {
        const result=await getGastosByServicioId(id)
        if (result) {
            totalArray=result.map((a) => Number(a.monto))
            total=totalArray.reduce((a, b) => a+b, 0)
            //console.log('RESULTADO', totalArray, total)
        }
    }

    useEffect(() => { sumGastos() }, [id])
    return (
        <div>xx{total}yy</div>
    )
}
