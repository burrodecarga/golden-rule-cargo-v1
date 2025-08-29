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
import { deleteUser, updateProfile } from '@/lib/api_server'
import { redirect } from 'next/navigation'
import { Switch } from './ui/switch'

const path='https://stxsnrianylaldkorlgy.supabase.co/storage/v1/object/public/personal//'
export default function FormUser(user: any) {
    const profile=user.user[0]

    const [first_name, setFirst_name]=useState(profile.first_name||'')
    const [last_name, setLast_name]=useState(profile.last_name||'')
    const [phone, setPhone]=useState(profile.phone||'')
    const [birthday, setBirtdate]=useState(profile.birthday||"")
    const [role, setRole]=useState(profile.role)
    const [active, setActive]=useState(profile.activo||0)
    const [checked, setChecked]=useState(profile.activo===1)
    const [error, setError]=useState<string|null>(null)
    const [isLoading, setIsLoading]=useState(false)


    //console.log(profile.birthday)
    const handleSubmit=async (e: any) => {
        e.preventDefault()
        let userId=profile.id
        setIsLoading(true)
        const res=await updateProfile(first_name, last_name, phone, birthday, role, active, userId)
        setIsLoading(false)
        redirect(`/protected/users/`)
    }

    const handleDelete=async () => {
        let userId=profile.id
        setIsLoading(true)
        await deleteUser(userId)
        setIsLoading(false)
        redirect(`/protected/users/`)
    }

    useEffect(() => {
        if (checked) {
            setActive(1)
        } else {
            setActive(0)
        }
    }, [checked])
    return (
        <div className="">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Edit: {profile.full_name}</CardTitle>
                    <CardDescription>Rol: {profile.role}</CardDescription>
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode"
                            checked={checked}
                            onCheckedChange={() => setChecked(!checked)}
                        />
                        <Label htmlFor="airplane-mode">{checked? 'Active':'No active'}</Label>
                    </div>
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
                                        value={first_name}
                                        onChange={(e) => setFirst_name(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last_name">last_name</Label>
                                    <Input
                                        autoComplete='false'
                                        name="last_name"
                                        id="last_name"
                                        type="text"
                                        placeholder="wilson macoy"
                                        required
                                        value={last_name}
                                        onChange={(e) => setLast_name(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">phone</Label>
                                    <Input
                                        name="phone"
                                        autoComplete='false'
                                        id="phone"
                                        type="text"
                                        placeholder="+45-00-890-00"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="birthday">birthday</Label>
                                    <Input
                                        name="birthday"
                                        autoComplete='false'
                                        id="birthday"
                                        type="text"
                                        placeholder="yyyy-mm-dd"
                                        required
                                        value={birthday}
                                        onChange={(e) => setBirtdate(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="role">role</Label>
                                    <select name="role" value={role} onChange={(e) => setRole(e.target.value)} className='bg-gray-50 px-2 py-1 rounded border-0.5 border-gray-50' id="role">
                                        <option value="chofer">chofer</option>
                                        <option value="administrador">administrador</option>
                                    </select>
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
                        documentation and information about the user
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-5 gap-3">
                    <div className="grid gap-3">
                        <Label >Drive License{profile.drive_license_url}</Label>
                        <Link href={{
                            pathname: '/protected/legal',
                            query: { name: 'driver_license_url', id: profile.id },
                        }}>
                            <Image priority src={profile.driver_license_url!} width="0" height="0" sizes="100vw" alt={profile.username} className="rounded-md object-cover w-full h-auto" /></Link>
                    </div>
                    <div className="grid gap-3">
                        <Label>Medical Certificate</Label>
                        <Link href={{
                            pathname: '/protected/legal',
                            query: { name: 'medical_certificate_url', id: profile.id },
                        }}>
                            <Image priority src={profile.medical_certificate_url!} width="0" height="0" sizes="100vw" alt="Image" className="rounded-md object-cover w-full h-auto" /></Link>

                    </div>
                    <div className="grid gap-3">
                        <Label>Social Security</Label>
                        <Link href={{
                            pathname: '/protected/legal',
                            query: { name: 'social_security_url', id: profile.id! },
                        }}>
                            <Image priority src={profile.social_security_url!} width="0" height="0" sizes="100vw" alt="Image" className="rounded-md object-cover w-full h-auto" /></Link>

                    </div>

                    <div className="grid gap-3">
                        <Label>Work Permit</Label>
                        <Link href={{
                            pathname: '/protected/legal',
                            query: { name: 'work_permit_url', id: profile.id! },
                        }}>
                            <Image priority src={profile.work_permit_url!} width="0" height="0" sizes="100vw" alt="Image" className="rounded-md object-cover w-full h-auto" /></Link>

                    </div>
                    <div className="grid gap-3">
                        <Label>W-9</Label>
                        <Link href={{
                            pathname: '/protected/legal',
                            query: { name: 'w_9_url', id: profile.id! },
                        }}>
                            <Image priority src={profile.w_9_url!} width="0" height="0" sizes="100vw" alt="Image" className="rounded-md object-cover w-full h-auto" /></Link>

                    </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
        </div>
    )
}
