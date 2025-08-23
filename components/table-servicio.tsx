import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchFilteredServices } from "@/lib/api_server"
import { formatDate } from "@fullcalendar/core/index.js"
import Link from "next/link"

export default async function ServicesTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  let totalArray: number[]=[]
  let total=0


  const datos=await await fetchFilteredServices(query, currentPage)
  if (datos) {
    totalArray=datos.map((a) => Number(a.precio_de_servicio))
    total=totalArray.reduce((a, b) => a+b, 0)
  }




  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          <Table>
            <TableCaption>A list of your recent services.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead className="w-[100px]">Week</TableHead>
                <TableHead className="w-[100px]">Order</TableHead>
                <TableHead className="w-[100px]">Platform</TableHead>
                <TableHead className="w-[100px]">Route</TableHead>
                <TableHead>service status</TableHead>
                <TableHead>payment status</TableHead>
                <TableHead>method of payment</TableHead>
                <TableHead>driver</TableHead>
                <TableHead>actions</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datos&&datos.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="uppercase text-[10px]">{formatDate(d.start!)}</TableCell>
                  <TableCell className="uppercase text-[10px]">{d.semana}</TableCell>
                  <TableCell className="uppercase text-[10px]">{d.orden}</TableCell>
                  <TableCell className="uppercase text-[10px]">{d.plataforma}</TableCell>
                  <TableCell className="uppercase text-[10px]">{d.ruta}</TableCell>
                  <TableCell className="uppercase text-[10px]">{d.estatus_servicio}</TableCell>
                  <TableCell className="uppercase text-[10px]">{d.estatus_pago}</TableCell>
                  <TableCell className="uppercase text-[10px]">{d.forma_de_pago}</TableCell>
                  <TableCell className="uppercase text-[10px]">{d.chofer}</TableCell>
                  <TableCell className="uppercase text-[10px] cursor-pointer text-blue-600 text-center"><Link href={{
                    pathname: '/protected/servicios/servicio/',
                    query: { id: d.id },
                  }}>ir</Link></TableCell>
                  <TableCell className="text-right">{d.precio_de_servicio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={9}>Total</TableCell>
                <TableCell className="text-right">${total.toLocaleString()}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  )
}
