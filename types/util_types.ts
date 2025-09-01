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

export interface TypeServicio {
    activo?: number|null
    ano?: number|null
    bol?: string|null
    broker?: string|null
    carga?: string|null
    chofer?: string|null
    chofer_id?: string|null
    created_at?: string|null
    despachador?: string|null
    destino?: string|null
    dia?: number|null
    dia_de_semana?: number|null
    estatus_pago?: string|null
    estatus_servicio?: string|null
    fecha_carga?: string|null
    fecha_entrega?: string|null
    forma_de_pago?: string|null
    gasto_estimado?: number|null
    id?: string|null
    info_pago?: string|null
    millas?: number|null
    num_descargas?: number|null
    observaciones?: string|null
    orden?: string|null
    origen?: string|null
    peso?: number|null
    plataforma?: string|null
    pod?: string|null
    position?: number|null
    precio_de_servicio?: number|null
    precio_mano_de_obra?: number|null
    rc?: string|null
    ruta?: string|null
    semana?: number|null
    tipo_de_carga?: string|null
    vehiculo?: string|null
    vehiculo_id?: string|null
}

export interface ServicioNoId {
    activo: number
    bol: string
    broker: string
    carga: string
    chofer: string
    chofer_id: string
    despachador: string
    destino: string
    estatus_pago: string
    estatus_servicio: string
    fecha_carga: string
    fecha_entrega: string
    forma_de_pago: string
    gasto_estimado: number
    info_pago: string
    millas: number
    num_descargas: number
    observaciones: string
    orden: string
    origen: string
    peso: number
    plataforma: string
    pod: string
    precio_de_servicio: number
    precio_mano_de_obra: number
    rc: string
    ruta: string
    tipo_de_carga: string
    vehiculo: string
    vehiculo_id: string
    ano: number
    dia: number
    dia_de_semana: number
    semana: number

}

export interface ProfileProps {
    id?: string
    updated_at?: Date
    username?: string
    full_name: string
    avatar_url?: string
    website?: string
    first_name: string
    last_name: string
    phone: string
    birthday?: Date
    driver_license_url?: string
    medical_certificate_url?: string
    social_security_url?: string
    work_permit_url?: string
    w_9_url?: string
    role: string
    activo: number
}


