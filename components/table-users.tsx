import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deleteUser, fetchAllUsers, } from "@/lib/api_server"
import Foto from "./foto"
import { EraserIcon, PenSquareIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

export default async function UsersTable() {

  const users=await fetchAllUsers()

  const eliminar=(id: string) => {
    const result=deleteUser(id)
  }



  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          <Table>
            <TableCaption>A list of your users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Avatar</TableHead>
                <TableHead className="">Username</TableHead>
                <TableHead className="">First Name</TableHead>
                <TableHead className="">Last Name</TableHead>
                <TableHead className="">Phone</TableHead>
                <TableHead className="">Role</TableHead>
                <TableHead className="">Active</TableHead>
                <TableHead className="">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users&&users.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="uppercase text-[12px]"><Foto uri={d.avatar_url} /></TableCell>
                  <TableCell className="uppercase text-[12px]">{d.username}</TableCell>
                  <TableCell className="uppercase text-[12px]">{d.first_name}</TableCell>
                  <TableCell className="uppercase text-[12px]">{d.last_name}</TableCell>
                  <TableCell className="uppercase text-[12px]">{d.phone}</TableCell>

                  <TableCell className="uppercase text-[12px]">{d.role}</TableCell>
                  <TableCell className="uppercase text-[12px]">{d.activo===0? 'inactivo':'activo'}</TableCell>
                  <TableCell className="flex flex-row gap-2 cursor-pointer text-blue-600 text-center">

                    <Link href={
                      `/protected/admin/users/${d.id}`}><PenSquareIcon /></Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>

              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  )
}
