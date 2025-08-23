import { error } from "console"
import { createClient } from "./supabase/client"
import { Database } from "@/types/db_types"


const supabase=await createClient()
export const allServicios=async () => {

    const { data, error }=await supabase.from("servicios").select("*")
    //console.log('SEVER', data)
    return data
}

const getFromTo=(page: number) => {
    const ITEM_PER_PAGE=3
    let from=page*ITEM_PER_PAGE
    let to=from+ITEM_PER_PAGE
    if (page>0) {
        from+=1
    } else {
        from=0
    }
    return { from, to }
}

export const fetchFilteredServices=async (query: string, page: number) => {
    const { from, to }=getFromTo(page)
    const { data: servicios, error }=await supabase
        .from('servicios')
        .select('*')
        .or(`orden.ilike.${'%'+query+'%'},plataforma.ilike.${'%'+query+'%'},estatus_pago.ilike.${'%'+query+'%'},chofer.ilike.${'%'+query+'%'},forma_de_pago.ilike.${'%'+query+'%'},ruta.ilike.${'%'+query+'%'}`)

        .order("start", {
            ascending: false
        })
    console.log('SEVER', servicios)
    return servicios
}


export const fetchServicesTotalPages=async (query: string, page: number) => {
    const result=supabase
        .from('servicios')
        .select('*', { count: 'exact' })
        .or(`orden.ilike.${'%'+query+'%'},plataforma.ilike.${'%'+query+'%'},estatus_pago.ilike.${'%'+query+'%'},chofer.ilike.${'%'+query+'%'},forma_de_pago.ilike.${'%'+query+'%'},ruta.ilike.${'%'+query+'%'}`)
    return result
}

export const fetchServicioById=async (id: string) => {
    const { data, error }=await supabase.from("servicios").select(`
id,
activo,
bol,
broker,
carga,
chofer,
chofer_id,
created_at,
despachador,
destino,
estatus_pago,
estatus_servicio,
fecha_carga,
fecha_entrega,
forma_de_pago,
gasto_estimado,
id,
info_pago,
millas,
num_descargas,
observaciones,
orden,
origen,
peso,
plataforma,
pod,
precio_de_servicio,
precio_mano_de_obra,
rc,
ruta,
tipo_de_carga,
vehiculo,
vehiculo_id,
ano,
dia_de_semana,
semana,
fotos_servicios ( 
created_at,
fecha,
id,
observacion,
servicio_id,
ubicacion,
url
 ),
 gastos_servicios(
created_at,
fecha,
id,
monto,
servicio_id,
tipo,url)
`).eq('id', id).order("semana", {
        ascending: false,
    }).limit(1)
    if (error) {
        console.log("error", error)
        return []
    } else {
        //console.log("EXITO", data)
        return data
    }
}

export type ServicioByID=Awaited<ReturnType<typeof fetchServicioById>>

export type FetchServiciosById=Awaited<ReturnType<typeof fetchServicioById>>
export type ServicioRow=Database["public"]["Tables"]["servicios"]["Row"]
export type Fotos_Servicios=
    Database["public"]["Tables"]["fotos_servicios"]["Row"]



