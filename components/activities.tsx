import { getServiciosByChofer } from '@/lib/api'
import { createClient } from '@/lib/server'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ListActivities from './list-activities'

export default async function Activities() {
    const supabase=await createClient()
    // You can also use getUser() which will be slower.
    const { data }=await supabase.auth.getUser()
    //const { data, error }=await supabase.auth.getUserIdentities()
    const { user }=data
    //console.log(user?.role)
    const activities=await getServiciosByChofer(user?.id!)

    console.log(activities)
    return (
        <div>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="account">scheduled activities</TabsTrigger>
                    <TabsTrigger value="password">activities in development</TabsTrigger>
                    <TabsTrigger value="completed">completed activities</TabsTrigger>
                </TabsList>
                <TabsContent value="account"><ListActivities activities={activities} filter={0} /></TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
                <TabsContent value="completed">Change your password here.</TabsContent>

            </Tabs>
        </div>
    )
}
