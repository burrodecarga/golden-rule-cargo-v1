import { fetchAllVehicles } from '@/lib/api'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import React from 'react'
import Foto from './foto'
import Image from 'next/image'
import { CardImage } from './card-image'
import { Edit3Icon } from 'lucide-react'
import { FOTO } from '@/helpers/utils'
import Link from 'next/link'
import { PencilSquareIcon } from '@heroicons/react/24/outline'

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
                                <TableHead className="">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehicles&&vehicles.map((d) => (
                                <TableRow key={d.id}>

                                    <TableCell className="uppercase text-[12px]"><CardImage url={d.image? d.image!:FOTO} /></TableCell>
                                    <TableCell className="uppercase text-[12px]">{d.name}</TableCell>
                                    <TableCell className="uppercase text-[12px]"><CardImage url={d.document? d.document:FOTO} /></TableCell>
                                    <TableCell><Link href={
                                        `/protected/admin/vehicles/${d.id}`}><PencilSquareIcon /></Link></TableCell>

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
