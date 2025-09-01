import { getServiciosByChofer, getServiciosProgramadoByChofer } from '@/lib/api'
import { createClient } from '@/lib/server'
import React, { Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ListActivities from './list-activities'
import ListActivitiesP from './list-activities-p'
import ListActivitiesD from './list-activities-d'
import ListActivitiesT from './list-activities-t'

export default async function Activities() {

    const supabase=await createClient()
    // You can also use getUser() which will be slower.
    const { data }=await supabase.auth.getUser()
    //const { data, error }=await supabase.auth.getUserIdentities()
    const { user }=data
    //console.log(user?.id)
    const activitiesProgramated=await getServiciosProgramadoByChofer(user?.id!, 0)
    const activitiesDesarrollo=await getServiciosProgramadoByChofer(user?.id!, 1)
    const activitiesTerminado=await getServiciosProgramadoByChofer(user?.id!, 2)
    const activitiesPay=await getServiciosProgramadoByChofer(user?.id!, 3)

    const key=new Date().toLocaleDateString()
    //console.log('ACTIVIDADES', activities)

    return (
        <Suspense key={key} fallback={user?.id}>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="account">scheduled activities</TabsTrigger>
                    <TabsTrigger value="password">activities in development</TabsTrigger>
                    <TabsTrigger value="completed">completed activities</TabsTrigger>
                    <TabsTrigger value="pay">paid activities</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <ListActivitiesP activities={activitiesProgramated} filter={0} /></TabsContent>
                <TabsContent value="password"><ListActivitiesD activities={activitiesDesarrollo} filter={1} /></TabsContent>
                <TabsContent value="completed"><ListActivitiesT activities={activitiesTerminado} filter={2} /></TabsContent>
                <TabsContent value="pay"><ListActivitiesP activities={activitiesPay} filter={3} /></TabsContent>
            </Tabs>
        </Suspense>
    )
}
