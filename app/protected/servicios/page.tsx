'use server'
import Pagination from "@/components/pagination"
import Search from "@/components/search"
import ServicesTable from "@/components/table-servicio"
import { fetchServicesTotalPages } from "@/lib/api_server"
import { Suspense } from "react"

export default async function ServiciosScreenList({ searchParams }: { searchParams?: { query?: string, page?: number|1 } }) {

    const query=searchParams?.query||''
    const currentPage=searchParams?.page||1
    const totalPage=await fetchServicesTotalPages(query, currentPage)

    return (
        <>

            <Suspense key={query+currentPage} fallback={<div><p>Cargando....</p></div>}>
                <Search placeholder="find service" />
                <ServicesTable query={query} currentPage={currentPage} />
            </Suspense>
            {/* <Pagination totalPages={totalPage.count!} /> */}

        </>
    )
}
