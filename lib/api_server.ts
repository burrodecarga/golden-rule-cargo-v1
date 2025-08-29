import { error } from "console"
import { createClient } from "./supabase/client"
import { Database } from "@/types/db_types"

export const SERVICIO_SEMANA=
    `id,
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
url)`


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

    //console.log('SERVIDOR', id)
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

    } else {
        //console.log("EXITO", data)
        return data[0]
    }
}

export type ServicioByID=Awaited<ReturnType<typeof fetchServicioById>>
export type FetchServiciosById=Awaited<ReturnType<typeof fetchServicioById>>
export type ServicioRow=Database["public"]["Tables"]["servicios"]["Row"]
export type Fotos_Servicios=
    Database["public"]["Tables"]["fotos_servicios"]["Row"]



export const uploadImagen=async (filePath: string, formData: FormData) => {
    const { error }=await supabase.storage
        .from("documentos")
        .upload(filePath, formData)

    if (error) throw error

    const { data }=supabase.storage.from("documentos").getPublicUrl(filePath)
    return data.publicUrl
}

export const updateServicioByBol=async (id: string, bol: string) => {
    const { data, error }=await supabase
        .from('servicios')
        .update({ 'bol': bol })
        .eq('id', id)
        .select()

    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}

export const updateServicioByPod=async (id: string, pod: string) => {
    const { data, error }=await supabase
        .from('servicios')
        .update({ 'pod': pod })
        .eq('id', id)
        .select()

    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}


export const updateServicioByRc=async (id: string, rc: string) => {
    const { data, error }=await supabase
        .from('servicios')
        .update({ 'rc': rc })
        .eq('id', id)
        .select()

    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}


export const getGastosByServicioId=async (id: string) => {

    //console.log('SERVIDOR', id)
    const { data, error }=await supabase.from("gastos_servicios").select(`
created_at,
fecha,
id,
monto,
servicio_id,
tipo,url
`).eq('servicio_id', id).order("fecha", {
        ascending: false,
    })
    if (error) {
        console.log("error", error)

    } else {
        //console.log("EXITO", data)
        return data
    }
}

export type GetGastosByServicioId=Awaited<ReturnType<typeof getGastosByServicioId>>
export type GetGastosByServicioIdRow=Database["public"]["Tables"]["servicios"]["Row"]

export const fetchServiciosBySemanaChofer=async (semana: number, chofer: string) => {
    const { data, error }=await supabase.from("servicios").select(SERVICIO_SEMANA).eq('semana', semana).eq('chofer', chofer).order("semana", {
        ascending: false,
    })

    if (error) {
        console.log("error", error)
        return []
    } else {
        console.log('GANO')
        return data
    }
}

export const fetchServiciosBySemanaVehiculo=async (semana: number, vehiculo: string) => {
    const { data, error }=await supabase.from("servicios").select(SERVICIO_SEMANA).eq('semana', semana).eq('vehiculo', vehiculo).order("semana", {
        ascending: false,
    })

    if (error) {
        console.log("error", error)
        return []
    } else {
        console.log('GANO')
        return data
    }
}

export const fetchServiciosBySemanaPlataforma=async (semana: number, plataforma: string) => {
    const { data, error }=await supabase.from("servicios").select(SERVICIO_SEMANA).eq('semana', semana).eq('plataforma', plataforma).order("semana", {
        ascending: false,
    })

    if (error) {
        console.log("error", error)
        return []
    } else {
        console.log('GANO')
        return data
    }
}


export const fetchServiciosBySemana=async (semana: number) => {
    const { data, error }=await supabase.from("servicios").select(`(*), gastos_servicios(*),fotos_servicios(*)`).eq('semana', semana).order("semana", {
        ascending: false,
    })

    if (error) {
        console.log("error", error)
        return []
    } else {
        console.log('GANO')
        return data
    }
}

export const fetchSemanasAndDay=async () => {
    const { data, error }=await supabase.from("resultado_por_semana_y_dia").select('*')
    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}
export type Semanas=Awaited<ReturnType<typeof fetchSemanasAndDay>>
export type Semana=Semanas[number]

export const fetchChoferSemanas=async () => {
    const { data, error }=await supabase.from("resultado_semanal_por_chofer").select('*')
    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}
export const fetchVehiculoSemanas=async () => {
    const { data, error }=await supabase.from("resultado_semanal_por_vehiculo").select('*')
    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}
export type VehiculoSemanas=Awaited<ReturnType<typeof fetchVehiculoSemanas>>
export type VehiculoSemana=VehiculoSemanas[number]

export const fetchPlataformaSemanas=async () => {
    const { data, error }=await supabase.from("resultado_semanal_por_plataforma").select('*')
    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}
export type PlataformaSemanas=Awaited<ReturnType<typeof fetchPlataformaSemanas>>
export type PlataformaSemana=PlataformaSemanas[number]
export type ChoferSemanas=Awaited<ReturnType<typeof fetchChoferSemanas>>
//export type ChoferSemana=Plataformas[number]

export const fetchAllUsers=async () => {
    const { data, error }=await supabase
        .from("profiles")
        .select("*")
    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}

export const getProfile=async (userId: string) => {
    const { data, error }=await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId).limit(1)
    if (error) {
        console.log("error", error)

    } else {
        return data
    }
}

export type GetProfile=Awaited<ReturnType<typeof getProfile>>
//export type GetProfile=GetProfiles[number]


export type AllUsers=Awaited<ReturnType<typeof fetchAllUsers>>
export type AllUser=AllUsers[number]



