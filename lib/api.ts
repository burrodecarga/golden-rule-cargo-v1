import { QueryData } from "@supabase/supabase-js"
import { createClient } from "./supabase/server"
import { TypeNewEvent } from "@/types/util_types"
import { Database } from "@/types/db_types"

export const allEvents=async () => {
    const supabase=await createClient()
    let { data: events, error }=await supabase.from("events").select(
        `id,
servicio_id,
            title,
            url,
            start,
            end,
            editable,
            backgroundColor,
            textColor`
    )

    if (error) {
        console.log(error)
    }

    return events
}

export type FetchEventsQuery=QueryData<typeof allEvents>
export type FetchEvents=Awaited<ReturnType<typeof allEvents>>
export type DBEvents=Database["public"]["Tables"]["events"]["Row"]
export type Event=[number]

export const addEvent=async (evento: TypeNewEvent) => {
    const supabase=await createClient()
    const { data, error }=await supabase
        .from("events")
        .insert([
            {
                servicio_id: evento.servicio_id,
                title: evento.title,
                url: evento.url,
                start: evento.start,
                end: evento.end,
                editable: evento.editable,
                backgroundColor: evento.backgroundColor,
                textColor: evento.textColor
            }
        ])
        .select()
}

export const fetchServicios=async () => {
    const supabase=await createClient()
    const { data }=await supabase.from("servicios").select("*")
    //console.log('SEVER', data)
    return data
}
