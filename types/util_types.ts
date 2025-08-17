import { EventSourceInput } from "@fullcalendar/core/index.js"

export interface TypeEvent {
    id: string
    servicio_id?: string
    title: string
    url: string
    start: string
    end: string
    editable: boolean
    backgroundColor: string
    textColor: string
    created_at: string
}

export interface TypeNewEvent {
    id?: string
    title: string
    start: string|null
    end: string|null
    allDay: boolean|null
    servicio_id: string
    url: string|null
    editable: boolean|null
    backgroundColor: string|null
    textColor: string
    created_at: string
}

export type DeEvento={
    backgroundColor: string
    created_at: string
    editable: boolean
    end: string
    id: string
    servicio_id: string
    start: string
    textColor: string
    title: string
    url: string
}

export type Evento={
    backgroundColor: string|null
    created_at: string
    editable: boolean|null
    end: string|null
    id: string
    servicio_id: string|null
    start: string|null
    textColor: string|null
    title: string
    url: string|null
}[]


export type DataFullCalenda=EventSourceInput


