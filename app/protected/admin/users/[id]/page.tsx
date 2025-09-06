import FormUser from '@/components/form-user'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getProfile, } from '@/lib/api_server'
import { Label } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import React from 'react'

export default async function DetailUserRouter({ params }: { params: Promise<{ id: string }> }) {
    const { id }=await params

    const user=await getProfile(id)


    return (
        <div>
            <FormUser user={user} />

        </div>
    )
}
