import Search from '@/components/search'
import ServicesTableById from '@/components/table-servicioById'
import { createClient } from '@/lib/server'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'

export default async function ChoferService(props: {
    searchParams?: Promise<{
        query?: string
        page?: string
    }>
}) {
    const searchParams=await props.searchParams
    const query=searchParams?.query||''
    const currentPage=Number(searchParams?.page)||1

    const supabase=createClient()
    const { data, error }=await (await supabase).auth.getUser()
    if (error||!data?.user) {
        redirect('/auth/login')
    }


    return (
        <>

            <Suspense key={query+currentPage} fallback={<div><p>Cargando....</p></div>}>
                <Search placeholder="find service" />
                <ServicesTableById id={data.user.id} query={query} currentPage={currentPage} />
            </Suspense>
            {/* <Pagination totalPages={totalPage.count!} /> */}

        </>)
}
