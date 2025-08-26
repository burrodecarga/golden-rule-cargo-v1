import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "./ui/button"
import RSemanaYDia from "./resultado_semana_y_dia"
import RSemanaByChofer from "./resultado_semana_por_chofer"
import RSemanaByPlataforma from "./resultado_semana_por_plataforma"
import RSemanaByVehiculo from "./resultado_semana_por_vehicle"


async function TabEstadisticas() {




    return (
        <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue="general">
                <TabsList>
                    <TabsTrigger value="general">By Week</TabsTrigger>
                    <TabsTrigger value="by_driver">By Driver</TabsTrigger>
                    <TabsTrigger value="plataform">By Platform</TabsTrigger>
                    <TabsTrigger value="vehicle">By Vehicle</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>By Week</CardTitle>
                            <CardDescription>
                                General cargo information, driver data, broker, origin and destination
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="w-full">
                            <RSemanaYDia />
                        </CardContent>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="by_driver">
                    <Card>
                        <CardHeader>
                            <CardTitle>By Driver</CardTitle>
                            <CardDescription>
                                documentation and information about the cargo
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-3 gap-3"> </CardContent>
                        <CardFooter>
                            <RSemanaByChofer />
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="plataform">
                    <Card>
                        <CardHeader>
                            <CardTitle>By Platform</CardTitle>
                            <CardDescription>

                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <RSemanaByPlataforma />
                        </CardContent>
                        <CardFooter>

                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="vehicle">
                    <Card>
                        <CardHeader>
                            <CardTitle>By Vehicle</CardTitle>
                            <CardDescription>

                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <RSemanaByVehiculo />
                        </CardContent>
                        <CardFooter>

                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default TabEstadisticas