import { fetchAllVehicles } from '@/lib/api'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import React from 'react'
import Foto from './foto'

export default async function VehiclesList() {
    const vehicles=await fetchAllVehicles()



    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

                    <Table>
                        <TableCaption>A list of your vehicles.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">Image</TableHead>
                                <TableHead className="">Vehicle</TableHead>
                                <TableHead className="">Document</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehicles&&vehicles.map((d) => (
                                <TableRow key={d.id}>
                                    <TableCell className="uppercase text-[12px]"><Foto uri={d.image} /></TableCell>
                                    <TableCell className="uppercase text-[12px]">{d.name}</TableCell>
                                    <TableCell className="uppercase text-[12px]"><Foto uri={d.document} /></TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>

                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </div>
    )
}
