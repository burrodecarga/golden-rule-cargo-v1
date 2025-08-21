'use server'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { allServicios } from "@/lib/api_server"

export default async function ServiciosScreenList() {
    let totalArray: number[]=[]
    let total=0
    const datos=await allServicios()
    if (datos) {
        totalArray=datos.map((a) => Number(a.precio_de_servicio))
        total=totalArray.reduce((a, b) => a+b, 0)

    }

    return (
        <Table>
            <TableCaption>A list of your recent services.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Route</TableHead>
                    <TableHead>service status</TableHead>
                    <TableHead>payment status</TableHead>
                    <TableHead>method of payment</TableHead>
                    <TableHead>driver</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {datos&&datos.map((d) => (
                    <TableRow key={d.id} >
                        <TableCell className="uppercase text-[10px]">{d.ruta}</TableCell>
                        <TableCell className="uppercase text-[10px]">{d.estatus_servicio}</TableCell>
                        <TableCell className="uppercase text-[10px]">{d.estatus_pago}</TableCell>
                        <TableCell className="uppercase text-[10px]">{d.forma_de_pago}</TableCell>
                        <TableCell className="uppercase text-[10px]">{d.chofer}</TableCell>
                        <TableCell className="text-right">{d.precio_de_servicio}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Total</TableCell>
                    <TableCell className="text-right">${total.toLocaleString()}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
