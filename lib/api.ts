import { QueryData } from "@supabase/supabase-js"
import { Database } from "@/types/db_types"
import { superSupabase } from "./supabase/oterClient"

export const allServicios=async () => {

    const { data }=await superSupabase.from("servicios").select("*")
    //console.log('SEVER', data)
    return data
}

export const allServiciosNoPay=async () => {

    const { data, error }=await superSupabase
        .from("servicios")
        .select("*")
        .neq("position", 0)
        .order("start", {
            ascending: true
        })
    if (error) {
        console.log(error.message)
        return []
    } else {
        return data
    }
}

export const getServiciosByChofer=async (choferId: string) => {

    const { data, error }=await superSupabase
        .from("servicios")
        .select("*")
        .eq("chofer_id", choferId)
        .order("start", {
            ascending: true
        })
    if (error) {
        console.log(error.message)
        return []
    } else {
        return data
    }
}

export const getServiciosProgramadoByChofer=async (choferId: string, position: number) => {

    const { data, error }=await superSupabase
        .from("servicios")
        .select("*")
        .eq("chofer_id", choferId)
        .eq("position", position)
        .order("start", {
            ascending: true
        })
    if (error) {
        console.log(error.message)
        return []
    } else {
        return data
    }
}


export type FetchServiciosQuery=QueryData<typeof allServicios>
export type FetchServicios=Awaited<ReturnType<typeof allServicios>>
export type DBServicio=Database["public"]["Tables"]["servicios"]["Row"]
export type Servicio=[number]

export async function crearServicio(id: string, carga: string) {
    const { data, error }=await superSupabase
        .from("servicios")
        .insert([{ carga: carga }])
        .select()
    if (error) {
        console.log(error)
    } else {
        return data[0]
    }
}

export const updateServicio=async (id: string, form: string) => {


    const newForm=JSON.parse(form)
    const { data, error }=await superSupabase
        .from('servicios')
        .update(newForm)
        .eq('id', id)
        .select()

    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}


export async function updateEvent(id: string, servicio_id: string) {
    const { data, error }=await superSupabase
        .from("events")
        .update({ servicio_id: servicio_id })
        .eq("id", id)
        .select()
    if (error) {
        console.log(error)
    }
    return data
}

export async function findServicioInEvent(id: string) {
    const { data, error }=await superSupabase
        .from("events")
        .select("*")
        .eq("servicio_id", id)

    if (error) {
        console.log(error)
    }
    return data
}

export async function findServicio(id: string) {
    const { data, error }=await superSupabase
        .from("servicios")
        .select("*")
        .eq("id", id)

    if (error) {
        console.log(error)
    }
    return data
}


export const fetchAllChoferes=async () => {
    const { data, error }=await superSupabase
        .from("profiles")
        .select("*")
        .eq('role', 'chofer')
    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}

export type FetchChoferesQuery=QueryData<typeof fetchAllChoferes>
export type FetchChoferes=Awaited<ReturnType<typeof fetchAllChoferes>>
export type DBChofere=Database["public"]["Tables"]["profiles"]["Row"]
export type Chofere=[number]

export const fetchAllPlataformas=async () => {
    const { data, error }=await superSupabase.from("plataformas").select('*')
    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}

export type FetchPlataformasQuery=QueryData<typeof fetchAllPlataformas>
export type FetchPlataformas=Awaited<ReturnType<typeof fetchAllPlataformas>>
export type DBPlataforma=Database["public"]["Tables"]["plataformas"]["Row"]
export type Plataforma=[number]

export const fetchAllVehicles=async () => {
    const { data, error }=await superSupabase.from("vehicles").select('*')
    if (error) {
        console.log("error", error)
        return []
    } else {
        return data
    }
}

export type FetchVehiclesQuery=QueryData<typeof fetchAllVehicles>
export type FetchVehicles=Awaited<ReturnType<typeof fetchAllVehicles>>
export type DBVehicles=Database["public"]["Tables"]["vehicles"]["Row"]
export type Vehicles=[number]


