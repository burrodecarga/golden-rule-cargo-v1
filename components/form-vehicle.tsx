'use client'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { deleteVehicle, updateVehicle } from '@/lib/api_server'
import { redirect } from 'next/navigation'
import { Switch } from './ui/switch'

const path='https://stxsnrianylaldkorlgy.supabase.co/storage/v1/object/public/personal//'
export default function FormVehicle(vehicle: any) {
    const carro=vehicle.vehicle[0]

    const [name, setName]=useState(carro.name||'')
    const [document, setDocument]=useState(carro.document||'')
    const [image, setImage]=useState(carro.image||'')
    const [error, setError]=useState<string|null>(null)
    const [isLoading, setIsLoading]=useState(false)


    //console.log(carro.birthday)
    const handleSubmit=async (e: any) => {
        e.preventDefault()
        let vehicleId=carro.id
        setIsLoading(true)
        const res=await updateVehicle(name, vehicleId)
        setIsLoading(false)
        redirect(`/protected/vehicles/`)
    }

    const handleDelete=async () => {
        let vehicleId=carro.id
        setIsLoading(true)
        await deleteVehicle(vehicleId)
        setIsLoading(false)
        redirect(`/protected/vehicles/`)
    }


    return (
        <div className="">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Edit: {carro.name}</CardTitle>
                    <CardDescription>""</CardDescription>

                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-row gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="first_name">first_name</Label>
                                    <Input
                                        autoComplete='false'
                                        id="first_name"
                                        type="text"
                                        placeholder="jhon doe"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>


                            {error&&<p className="text-sm text-red-500">{error}</p>}
                            <div className="flex gap-3 w-full">

                                <Button type="submit" className="" disabled={isLoading}>
                                    {isLoading? "Updating an account...":"Update"}
                                </Button>
                                <Button type="button" variant={'destructive'} className="" disabled={isLoading} onClick={handleDelete}>
                                    {isLoading? "Deleting an account...":"Delete"}
                                </Button>
                            </div>
                        </div>

                    </form>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Documents Image</CardTitle>
                    <CardDescription>
                        documentation and information about the vehicle
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-5 gap-3">
                    <div className="grid gap-3">
                        <Label >Document {carro.name}</Label>
                        <Link href={{
                            pathname: '/protected/info',
                            query: { name: 'document', id: carro.id },
                        }}>
                            <Image priority src={carro.document!} width="0" height="0" sizes="100vw" alt={carro.vehiclename} className="rounded-md object-cover w-full h-auto" /></Link>
                    </div>
                    <div className="grid gap-3">
                        <Label>Image</Label>
                        <Link href={{
                            pathname: '/protected/info',
                            query: { name: 'image', id: carro.id },
                        }}>
                            <Image priority src={carro.image!} width="0" height="0" sizes="100vw" alt="Image" className="rounded-md object-cover w-full h-auto" /></Link>

                    </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
        </div>
    )
}
