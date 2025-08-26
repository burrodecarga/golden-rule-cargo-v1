import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ServicioByID } from "@/lib/api_server"
import Image from "next/image"
import Link from "next/link"
import Expenses from "./expenses"
import Search from "./search"
interface TabsProps {
    servicio: {
        servicio: ServicioByID
    }
}
export function TabsDetailServicio(servicio: { item: ServicioByID }) {
    //console.log('SERVICIO EN TAB', servicio)
    return (
        <div className="flex w-full max-w-7xl flex-col gap-6">
            <Tabs defaultValue="general">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="payload">Payload</TabsTrigger>
                    <TabsTrigger value="expenses">travel expenses</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General</CardTitle>
                            <CardDescription>
                                General cargo information, driver data, broker, origin and destination
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-3 gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-date">Date</Label>
                                <Input id="tabs-demo-date" defaultValue={servicio.item?.fecha_carga!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-source">Source</Label>
                                <Input id="tabs-demo-source" defaultValue={servicio.item?.plataforma!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-broker">Broker</Label>
                                <Input id="tabs-demo-broker" defaultValue={servicio.item?.broker!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-payload">Payload</Label>
                                <Input id="tabs-demo-payload" defaultValue={servicio.item?.carga!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-origin">Origin</Label>
                                <Input id="tabs-demo-origin" defaultValue={servicio.item?.origen!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-destination">Destination</Label>
                                <Input id="tabs-demo-destination" defaultValue={servicio.item?.destino!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-dispacher">Dispacher</Label>
                                <Input id="tabs-demo-dispacher" defaultValue={servicio.item?.despachador!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-weight">Weight</Label>
                                <Input id="tabs-demo-weight" defaultValue={servicio.item?.peso!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-price">Price</Label>
                                <Input id="tabs-demo-price" defaultValue={servicio.item?.precio_de_servicio!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-pay">Pay</Label>
                                <Input id="tabs-demo-pay" defaultValue={servicio.item?.forma_de_pago!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-driver">Driver</Label>
                                <Input id="tabs-demo-driver" defaultValue={servicio.item?.chofer!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-vehicle">Vehicle</Label>
                                <Input id="tabs-demo-vehicle" defaultValue={servicio.item?.vehiculo!} />
                            </div>
                            <div className="grid gap-3 col-span-3">
                                <Label htmlFor="tabs-demo-observation">Observation</Label>
                                <Input id="tabs-demo-observation" defaultValue={servicio.item?.observaciones!} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="payload">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payload</CardTitle>
                            <CardDescription>
                                documentation and information about the cargo
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-3 gap-3">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-bol">BOL</Label>
                                <Link href={{
                                    pathname: '/protected/documentos',
                                    query: { name: 'bol', id: servicio.item?.id },
                                }}>
                                    <Image src={servicio.item?.bol!} width="0" height="0" sizes="100vw" alt="Image" className="rounded-md object-cover w-full h-auto" /></Link>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-pod">POD</Label>
                                <Link href={{
                                    pathname: '/protected/documentos',
                                    query: { name: 'pod', id: servicio.item?.id },
                                }}>
                                    <Image src={servicio.item?.pod!} width="0" height="0" sizes="100vw" alt="Image" className="rounded-md object-cover w-full h-auto" /></Link>

                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-rc">RC</Label>
                                <Link href={{
                                    pathname: '/protected/documentos',
                                    query: { name: 'rc', id: servicio.item?.id },
                                }}>
                                    <Image src={servicio.item?.rc!} width="0" height="0" sizes="100vw" alt="Image" className="rounded-md object-cover w-full h-auto" /></Link>

                            </div>
                        </CardContent>
                        <CardFooter>

                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="expenses">
                    <Card>
                        <CardHeader>
                            <CardTitle>travel expenses</CardTitle>
                            <CardDescription>

                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-current">travel expenses</Label>

                                <Expenses id={servicio.item?.id||'00'} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
