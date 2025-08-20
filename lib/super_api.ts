import { QueryData } from "@supabase/supabase-js"
import { Database } from "@/types/db_types"
import { superSupabase } from "./supabase/oterClient"

// export const allEvents=async () => {
//     const supabase=await createClient()
//     let { data: events, error }=await supabase.from("events").select(
//         `id,
// servicio_id,
//             title,
//             url,
//             start,
//             end,
//             editable,
//             backgroundColor,
//             textColor`
//     )

//     if (error) {
//         console.log(error)
//     }

//     return events
// }

// export const allNoPayEvents=async () => {
//     const supabase=await createClient()
//     let { data: events, error }=await supabase.from("events").select(
//         `id,
// servicio_id,
//             title,
//             url,
//             start,
//             end,
//             editable,
//             backgroundColor,
//             textColor`
//     ).neq('position', 0)


//     if (error) {
//         console.log(error)
//     }

//     return events
// }


// export type FetchEventsQuery=QueryData<typeof allEvents>
// export type FetchEvents=Awaited<ReturnType<typeof allEvents>>
// export type DBEvents=Database["public"]["Tables"]["events"]["Row"]
// export type Event=[number]

// export const addEvent=async (evento: TypeNewEvent) => {
//     const supabase=await createClient()
//     const { data, error }=await supabase
//         .from("events")
//         .insert([
//             {
//                 servicio_id: evento.servicio_id,
//                 title: evento.title,
//                 url: evento.url,
//                 start: evento.start,
//                 end: evento.end,
//                 editable: evento.editable,
//                 backgroundColor: evento.backgroundColor,
//                 textColor: evento.textColor
//             }
//         ])
//         .select()
// }

export const allServicios=async () => {

    const { data }=await superSupabase.from("servicios").select("*")
    //console.log('SEVER', data)
    return data
}

export const allServiciosNoPay=async () => {

    const { data, error }=await superSupabase.from("servicios").select("*").neq('position', 0).order("start", {
        ascending: true,
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
        .from('servicios')
        .insert([
            { carga: carga },
        ])
        .select()
    if (error) {
        console.log(error)
    } else {
        return data[0]
    }
}

export async function updateEvent(id: string, servicio_id: string) {
    const { data, error }=await superSupabase
        .from('events')
        .update({ servicio_id: servicio_id })
        .eq('id', id)
        .select()
    if (error) {
        console.log(error)
    }
    return data
}

export async function findServicioInEvent(id: string) {
    const { data, error }=await superSupabase
        .from('events')
        .select("*")
        .eq('servicio_id', id)

    if (error) {
        console.log(error)

    }
    return data
}

export async function findServicio(id: string) {
    const { data, error }=await superSupabase
        .from('servicios')
        .select("*")
        .eq('id', id)

    if (error) {
        console.log(error)

    }
    return data
}

