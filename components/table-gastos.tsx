import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchFilteredServices, GetGastosByServicioId } from "@/lib/api_server"
import { formatDate } from "@fullcalendar/core/index.js"
import Link from "next/link"

export default async function GastosTable({
  gastos
}: {
  gastos: GetGastosByServicioId
}) {
  let totalArray: number[]=[]
  let total=0


  if (gastos) {
    totalArray=gastos.map((a) => Number(a.monto))
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
                <TableHead className="">Date</TableHead>
                <TableHead className="">Type</TableHead>
                <TableHead className="">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gastos&&gastos.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="uppercase text-[12px]">{formatDate(d.fecha!)}</TableCell>
                  <TableCell className="uppercase text-[12px]">{d.tipo}</TableCell>
                  <TableCell className="uppercase text-[12px]">{d.monto}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="">${total.toLocaleString()}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  )
}
