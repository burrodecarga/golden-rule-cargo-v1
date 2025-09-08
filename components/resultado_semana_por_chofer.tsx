import { fetchChoferSemanas, fetchSemanasAndDay, fetchServiciosBySemanaChofer } from '@/lib/api_server'
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'
import { formatDateToLocal } from '@/helpers/utils'
import { v4 as uuidv4 } from 'uuid'
import { WEEKDAY } from '@/const/helper'


export default async function RSemanaByChofer() {
    const result=await fetchChoferSemanas()
    //console.log(result)

    let totalArray: number[]=[]
    let total=0

    if (result) {
        totalArray=result.map((a) => Number(a.total_ingreso))
        total=totalArray.reduce((a, b) => a+b, 0)
    }

    return (
        <div className="mt-6 flow-root w-full">
            <div className="inline-block align-middle w-full">
                <div className="w-full rounded-lg bg-gray-50 p-2 md:pt-0">

                    <Table className=''>
                        <TableCaption>A list of your recent services.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-14">Week</TableHead>
                                <TableHead className="">Driver</TableHead>
                                <TableHead className="">Amount</TableHead>
                                <TableHead className="">Expenses</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {result&&result.map((d) => (
                                <TableRow key={uuidv4()}>
                                    <TableCell className="uppercase text-[12px]">{d.semana}</TableCell>
                                    <TableCell className="uppercase text-[12px]">{d.chofer}</TableCell>
                                    <TableCell className="uppercase text-[12px]">{d.total_ingreso}</TableCell>
                                    <TableCell className="uppercase text-[12px]">{d.total_gastos}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell className="">${total.toLocaleString()}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </div>
    )
}
