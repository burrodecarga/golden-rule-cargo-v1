import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchFilteredServicesById } from "@/lib/api_server"
import { formatDate } from "@fullcalendar/core/index.js"
import { EyeIcon, PenIcon } from "lucide-react"
import Link from "next/link"

export default async function ServicesTableById({
  id,
  query,
  currentPage,
}: {
  id: string
  query: string
  currentPage: number
}) {
  let totalArray: number[]=[]
  let total=0


  const datos=await fetchFilteredServicesById(id, query, currentPage)
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
                <TableHead className=" text-sm">Date</TableHead>
                <TableHead className=" text-sm">Week</TableHead>
                <TableHead className=" text-sm">Order</TableHead>
                <TableHead className=" text-sm">Platform</TableHead>
                <TableHead className=" text-sm">Route</TableHead>
                <TableHead className="text-sm">service status</TableHead>
                <TableHead className="text-sm">payment status</TableHead>
                <TableHead className="text-sm">method of payment</TableHead>
                <TableHead className="text-sm">driver</TableHead>
                <TableHead className="text-sm text-right">Amount</TableHead>
                <TableHead className="text-sm">actions</TableHead>
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
                  <TableCell className="text-right">{d.precio_de_servicio}</TableCell>
                  <TableCell className="flex flex-row gap-2 cursor-pointer text-blue-600 text-center">
                    <Link href={{
                      pathname: '/protected/admin/servicios/servicio/',
                      query: { id: d.id },
                    }}><EyeIcon /></Link>
                    <Link href={{
                      pathname: '/protected/admin/servicios/servicio/edit',
                      query: { id: d.id },
                    }}><PenIcon /></Link>
                  </TableCell>
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
