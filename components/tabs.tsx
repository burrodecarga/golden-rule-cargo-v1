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
                    <TabsTrigger value="account">Payload</TabsTrigger>
                    <TabsTrigger value="password">Source</TabsTrigger>
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
                                <Label htmlFor="tabs-demo-name">Date</Label>
                                <Input id="tabs-demo-name" defaultValue={servicio.item?.fecha_carga!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-username">Source</Label>
                                <Input id="tabs-demo-username" defaultValue={servicio.item?.plataforma!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-username">Broker</Label>
                                <Input id="tabs-demo-username" defaultValue={servicio.item?.broker!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Payload</Label>
                                <Input id="tabs-demo-name" defaultValue={servicio.item?.carga!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Origin</Label>
                                <Input id="tabs-demo-name" defaultValue={servicio.item?.origen!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Destination</Label>
                                <Input id="tabs-demo-name" defaultValue={servicio.item?.destino!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Dispacher</Label>
                                <Input id="tabs-demo-name" defaultValue={servicio.item?.despachador!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Weight</Label>
                                <Input id="tabs-demo-name" defaultValue={servicio.item?.peso!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Price</Label>
                                <Input id="tabs-demo-name" defaultValue={servicio.item?.precio_de_servicio!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Pay</Label>
                                <Input id="tabs-demo-name" defaultValue={servicio.item?.forma_de_pago!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Driver</Label>
                                <Input id="tabs-demo-name" defaultValue={servicio.item?.chofer!} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Vehicle</Label>
                                <Input id="tabs-demo-name" defaultValue={servicio.item?.vehiculo!} />
                            </div>
                            <div className="grid gap-3 col-span-3">
                                <Label htmlFor="tabs-demo-name">Observation</Label>
                                <Input id="tabs-demo-name" defaultValue={servicio.item?.observaciones!} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you&apos;re
                                done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Name</Label>
                                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-username">Username</Label>
                                <Input id="tabs-demo-username" defaultValue="@peduarte" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you&apos;ll be logged
                                out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-current">Current password</Label>
                                <Input id="tabs-demo-current" type="password" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-new">New password</Label>
                                <Input id="tabs-demo-new" type="password" />
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
