'use client'
import React, { useState } from 'react'
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

export default function FormUser(user: any) {

    const profile=user.user[0]
    const [first_name, setFirst_name]=useState("")
    const [last_name, setLast_name]=useState("")
    const [phone, setPhone]=useState("")
    const [birtdate, setBirtdate]=useState("")
    const [role, setRole]=useState('chofer')
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [error, setError]=useState<string|null>(null)
    const [isLoading, setIsLoading]=useState(false)


    console.log(profile)
    const handleSubmit=() => {

    }
    return (
        <div className="">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Edit: {profile.full_name}</CardTitle>
                    <CardDescription>Rol: {profile.role}</CardDescription>
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
                                    <Label htmlFor="birtdate">birtdate</Label>
                                    <Input
                                        name="birtdate"
                                        autoComplete='false'
                                        id="birtdate"
                                        type="text"
                                        placeholder="dd-mm-yyyy"
                                        required
                                        value={birtdate}
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
                            <div className="flex flex-row gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" >Email</Label>
                                    <Input
                                        name="email"
                                        autoComplete='false'
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        value={profile.email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error&&<p className="text-sm text-red-500">{error}</p>}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading? "Creating an account...":"Sign up"}
                            </Button>
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
                            query: { name: 'drive_license_url', id: profile.id },
                        }}>
                            <Image src={profile.driver_license_url!} width="0" height="0" sizes="100vw" alt={profile.username} className="rounded-md object-cover w-full h-auto" /></Link>
                    </div>
                    <div className="grid gap-3">
                        <Label>Medical Certificate</Label>
                        <Link href={{
                            pathname: '/protected/legal',
                            query: { name: 'medical_certificate_url', id: profile.id },
                        }}>
                            <Image src={profile.medical_certificate_url!} width="0" height="0" sizes="100vw" alt="Image" className="rounded-md object-cover w-full h-auto" /></Link>

                    </div>
                    <div className="grid gap-3">
                        <Label>Social Security</Label>
                        <Link href={{
                            pathname: '/protected/legal',
                            query: { name: 'social_security_url', id: profile.id! },
                        }}>
                            <Image src={profile.social_security_url!} width="0" height="0" sizes="100vw" alt="Image" className="rounded-md object-cover w-full h-auto" /></Link>

                    </div>

                    <div className="grid gap-3">
                        <Label>Social Security</Label>
                        <Link href={{
                            pathname: '/protected/legal',
                            query: { name: 'work_permit_url', id: profile.id! },
                        }}>
                            <Image src={profile.work_permit_url!} width="0" height="0" sizes="100vw" alt="Image" className="rounded-md object-cover w-full h-auto" /></Link>

                    </div>
                    <div className="grid gap-3">
                        <Label>Social Security</Label>
                        <Link href={{
                            pathname: '/protected/legal',
                            query: { name: 'w_9_url', id: profile.id! },
                        }}>
                            <Image src={profile.w_9_url!} width="0" height="0" sizes="100vw" alt="Image" className="rounded-md object-cover w-full h-auto" /></Link>

                    </div>
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
        </div>
    )
}
