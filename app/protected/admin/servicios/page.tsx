'user serve'
import Search from "@/components/search"
import ServicesTable from "@/components/table-servicio"
import { Suspense } from "react"


export default async function Page(props: {
    searchParams?: Promise<{
        query?: string
        page?: string
    }>
}) {
    const searchParams=await props.searchParams
    const query=searchParams?.query||''
    const currentPage=Number(searchParams?.page)||1
    //const totalPage=await fetchServicesTotalPages(query, currentPage)

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
