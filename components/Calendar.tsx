"use client"

import React, { useState, useEffect } from "react"
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventChangeArg
} from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { superSupabase } from "@/lib/supabase/oterClient"
import { showToast } from "nextjs-toast-notify"
import { URL_FOTO_DEF } from "@/const/Images"
import { semanaDeAno } from "@/const/helper"
import { ServicioNoId } from "@/types/util_types"
import {
  allServicios,
  fetchAllChoferes,
  fetchAllPlataformas,
  fetchAllVehicles,
  FetchChoferes,
  FetchPlataformas,
  FetchServiciosQuery,
  FetchVehicles,
  updateServicio
} from "@/lib/api"
import { DialogDescription } from "@radix-ui/react-dialog"


const Calendar: React.FC=() => {
  const [currentEvents, setCurrentEvents]=useState<EventApi[]>([])
  const [newCurrentEvents, setNewCurrentEvents]=useState()
  const [isDialogOpen, setIsDialogOpen]=useState<boolean>(false)
  const [isDialogEventOpen, setIsDialogEventOpen]=useState<boolean>(false)

  const [newEventTitle, setNewEventTitle]=useState<string>("")
  const [newEventPrice, setNewEventPrice]=useState<string>("")
  const [arg, setArg]=useState<EventClickArg>()
  const [loading, setLoading]=useState(false)
  const [selectedDate, setSelectedDate]=useState<DateSelectArg|null>(null)
  const [cambio, setCambio]=useState(false)
  const [choferes, setChoferes]=useState<FetchChoferes>()
  const [plataformas, setPlataformas]=useState<FetchPlataformas>()
  const [vehiculos, setVehiculos]=useState<FetchVehicles>()
  const [argumento, setArgumento]=useState<EventChangeArg>()

  const hoy=new Date()
  const numSemana=semanaDeAno()

  const initialForm={
    activo: 0,
    bol: URL_FOTO_DEF,
    broker: "",
    carga: "",
    chofer: undefined,
    chofer_id: "",
    despachador: "",
    destino: "",
    estatus_pago: "no cobrado",
    estatus_servicio: "programado",
    fecha_carga: "",
    fecha_entrega: "",
    forma_de_pago: "",
    gasto_estimado: 1200,
    info_pago: "",
    millas: 300,
    num_descargas: 1,
    observaciones: "",
    orden: "",
    origen: "",
    peso: 0,
    plataforma: undefined,
    pod: URL_FOTO_DEF,
    precio_de_servicio: 0,
    precio_mano_de_obra: 0,
    rc: URL_FOTO_DEF,
    ruta: "",
    tipo_de_carga: "",
    vehiculo: undefined,
    vehiculo_id: "",
    dia: hoy.getDate(),
    ano: hoy.getFullYear(),
    dia_de_semana: hoy.getDay(),
    semana: numSemana,
  }

  const [form, setForm]=useState<ServicioNoId>(initialForm)

  const getChoferes=async () => {
    const resultado=await fetchAllChoferes()
    //console.log('CHOFERES', resultado)
    setChoferes(resultado)
  }

  const getPlataformas=async () => {
    const resultado=await fetchAllPlataformas()
    setPlataformas(resultado)
  }

  const getVehiculos=async () => {
    const resultado=await fetchAllVehicles()
    setVehiculos(resultado)
  }

  const handleChange=(name: string, text: string): void => {
    setForm((prev) => ({
      ...prev,
      [name]: text
    }))
  }

  const showMsg=() =>
    showToast.success("¡La operación se realizó con éxito!", {
      duration: 4000,
      progress: true,
      position: "top-right",
      transition: "bounceIn",
      icon: "",
      sound: true
    })

  const getNewCurrentsEvents=async () => {
    const result=await allServicios()
    setNewCurrentEvents(result as FetchServiciosQuery)
  }

  const updateEvent=async (arg: EventChangeArg) => {
    const startD=arg.event.start
    const endD=arg.event.end
    // console.log('START STR', startD)
    const { data, error }=await superSupabase
      .from("servicios")
      .update({ start: startD?.toDateString(), end: endD?.toDateString() })
      .eq("id", arg.event.id)
      .select()

    setCambio(!cambio)
  }

  useEffect(() => {
    getChoferes()
  }, [])

  useEffect(() => {
    getPlataformas()
  }, [])

  useEffect(() => {
    getVehiculos()
  }, [])

  useEffect(() => {
    getNewCurrentsEvents()
  }, [cambio])

  useEffect(() => {
    // Load events from local storage when the component mounts
    if (typeof window!=="undefined") {
      const savedEvents=localStorage.getItem("events")
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents))
      }
    }
  }, [])

  useEffect(() => {
    // Save events to local storage whenever they change
    if (typeof window!=="undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents))
    }
  }, [currentEvents, cambio])

  const handleDateClick=(selected: DateSelectArg) => {
    setSelectedDate(selected)
    setIsDialogOpen(true)
  }

  const handleChangeVehicle=(value: string) => {
    const res=value.split('_')
    handleChange("vehiculo", res[1])
    handleChange("vehiculo_id", res[0])
  }
  const handleChangeChofer=(value: string) => {
    const res=value.split('_')
    handleChange("chofer", res[1])
    handleChange("chofer_id", res[0])
  }

  const handleEventClick=(selected: EventClickArg) => {
    const ruta=`/protected/admin/servicios/servicio/?${selected.event.id}`
    setArg(() => selected)
    if (!arg) return//console.log('ARGUMENTO', JSON.stringify(arg, null, 2))
    setForm((prev) => ({
      ...prev,
      activo: arg?.event.extendedProps.activo,
      bol: arg?.event.extendedProps.bol,
      broker: arg?.event.extendedProps.broker,
      carga: arg?.event.extendedProps.carga,
      chofer: arg?.event.extendedProps.chofer,
      chofer_id: arg?.event.extendedProps.chofer_id,
      despachador: arg?.event.extendedProps.despachador,
      destino: arg?.event.extendedProps.destino,
      estatus_pago: arg?.event.extendedProps.estatus_pago,
      estatus_servicio: arg?.event.extendedProps.estatus_servicio,
      fecha_carga: arg?.event.extendedProps.fecha_carga,
      fecha_entrega: arg?.event.extendedProps.fecha_entrega,
      forma_de_pago: arg?.event.extendedProps.forma_de_pago,
      gasto_estimado: arg?.event.extendedProps.gasto_estimado,
      info_pago: arg?.event.extendedProps.info_pago,
      millas: arg?.event.extendedProps.millas,
      num_descargas: arg?.event.extendedProps.num_descargas,
      observaciones: arg?.event.extendedProps.observaciones,
      orden: arg?.event.extendedProps.orden,
      origen: arg?.event.extendedProps.origen,
      peso: arg?.event.extendedProps.peso,
      plataforma: arg?.event.extendedProps.plataforma,
      pod: arg?.event.extendedProps.pod,
      precio_de_servicio: arg?.event.extendedProps.precio_de_servicio,
      precio_mano_de_obra: arg?.event.extendedProps.precio_mano_de_obra,
      rc: arg?.event.extendedProps.rc,
      ruta: arg?.event.extendedProps.ruta,
      tipo_de_carga: arg?.event.extendedProps.tipo_de_carga,
      vehiculo: arg?.event.extendedProps.vehiculo,
      vehiculo_id: arg?.event.extendedProps.vehiculo_id,
      dia: arg?.event.extendedProps.dia,
      ano: arg?.event.extendedProps.ano,
      dia_de_semana: arg?.event.extendedProps.dia_de_semana,
      semana: arg?.event.extendedProps.semana
    }))
    //console.log('FORM', JSON.stringify(form, null, 2))
    setIsDialogEventOpen(true)
  }

  const handleCloseDialog=() => {
    setIsDialogOpen(false)
    setNewEventTitle("")
    setNewEventPrice("")
  }

  const handleCloseEventDialog=() => {
    setIsDialogEventOpen(false)
    setArg(undefined)
    setForm(initialForm)
  }

  const handleAddEventInBD=async (
    newEventTitle: string,
    newEventPrice: string,
    startD: Date,
    endD: Date
  ) => {
    const fullEvent=newEventTitle+", "+newEventPrice
    const { data, error }=await superSupabase
      .from("servicios")
      .insert([
        {
          title: fullEvent,
          start: startD.toDateString(),
          end: endD.toDateString()
        }
      ])
      .select()
    setCambio(!cambio)
  }

  const handleAddEventDetail=async () => {
    setLoading(true)
    var postData=JSON.stringify(form)
    var formData=new FormData()
    formData.append("postData", postData)
    const resultado=await updateServicio(arg?.event.id!, postData.toLocaleLowerCase())
    //console.log('RESULTADO', resultado, 'ID', arg?.event.id)
    setLoading(false)
    setIsDialogEventOpen(false)
    setArg(undefined)
    setForm(initialForm)
    showMsg()
    handleCloseEventDialog()
    setCambio(!cambio)

  }

  const handleAddEvent=(e: React.FormEvent) => {
    e.preventDefault()
    if (newEventTitle&&selectedDate) {
      const calendarApi=selectedDate.view.calendar // Get the calendar API instance.
      calendarApi.unselect() // Unselect the date range.

      // const newEvent={
      //   id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
      //   title: newEventTitle,
      //   start: selectedDate.start,
      //   end: selectedDate.end,
      //   allDay: selectedDate.allDay,
      // }
      // calendarApi.addEvent(newEvent)

      handleAddEventInBD(
        newEventTitle,
        newEventPrice,
        selectedDate.start,
        selectedDate.end
      )

      handleCloseDialog()
    }
  }

  const deleteEvent=async (id: string) => {
    setLoading(true)
    try {
      const { data, error }=await superSupabase
        .from("servicios")
        .delete()
        .eq("id", id)
        .select()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

    setIsDialogEventOpen(false)
    setCambio(!cambio)
    showMsg()
  }
  const addDetails=async (id: string) => { }

  return (
    <div>
      <div className='flex w-full p-6 justify-start items-start gap-4'>
        <div className='w-3/12'>
          <div className='py-0 text-xl font-extrabold px-1'>
            Calendar Events
          </div>
          <ul className='space-y-4'>
            {currentEvents.length<=0&&(
              <div className='italic text-center text-gray-400'>
                No Events Present
              </div>
            )}

            {currentEvents.length>0&&
              currentEvents.sort((a, b) => a.start!>b.start!? -1:1)
                .map((event: EventApi) => (
                  <li
                    className='border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800 text-xs'
                    key={event.id+new Date().toLocaleTimeString()}
                  >
                    {event.title}
                    <br />
                    <label className='text-slate-950 text-[10px]'>
                      {formatDate(event.start!, {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}{" "}
                      {/* Format event start date */}
                    </label>
                    <br />

                    {event.extendedProps.ruta&&event.extendedProps.ruta}
                    <br />
                    {event.extendedProps.chofer&&event.extendedProps.chofer}
                    <br />
                    {event.extendedProps.precio_de_servicio? event.extendedProps.precio_de_servicio+' $':''}


                  </li>
                ))}
          </ul>
        </div>

        <div className='w-9/12 mt-8'>
          <FullCalendar

            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Initialize calendar with required plugins.
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }} // Set header toolbar options.
            initialView='dayGridMonth' // Initial view mode of the calendar.
            editable={true} // Allow events to be edited.
            selectable={true} // Allow dates to be selectable.
            selectMirror={true} // Mirror selections visually.
            dayMaxEvents={true} // Limit the number of events displayed per day.
            select={handleDateClick} // Handle date selection to create new events.
            eventClick={handleEventClick} // Handle clicking on events (e.g., to delete them).
            eventsSet={(events) => setCurrentEvents(events)} // Update state with current events whenever they change.
            // Initial events loaded from local storage.
            events={newCurrentEvents}
            eventChange={(arg: EventChangeArg) => updateEvent(arg)}
            displayEventTime={false}
          />
        </div>
      </div>

      {/* Dialog for adding new events */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event Details</DialogTitle>
            <DialogDescription>New info</DialogDescription>
          </DialogHeader>
          <form className='mb-4 space-y-4' onSubmit={handleAddEvent}>
            <input
              type='text'
              placeholder='Event Title'
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)} // Update new event title as the user types.
              required
              className='border border-gray-200 p-3 rounded-md text-lg w-full'
            />

            <input
              type='text'
              placeholder='Event price'
              value={newEventPrice}
              onChange={(e) => setNewEventPrice(e.target.value)} // Update new event title as the user types.
              required
              className='border border-gray-200 p-3 rounded-md text-lg w-full'
            />
            <br />
            <button
              className='bg-green-500 text-white p-3 mt-5 rounded-md w-full'
              type='submit'
            >
              Add
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for vew event */}

      <Dialog open={isDialogEventOpen} onOpenChange={setIsDialogEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event Details</DialogTitle>
            <DialogDescription>New edit info</DialogDescription>
          </DialogHeader>
          <div className='border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800 text-xs space-y-6'>
            <div className='flex flex-row gap-3'>
              <input
                type='text'
                placeholder='Orden #'
                value={form.orden!==null? form.orden:''}
                onChange={(e) => handleChange("orden", e.target.value)} // Update new event title as the user types.
                required
                className='border border-gray-200 p-3 rounded-md text-lg w-full'
              />
              <input
                type='date'
                placeholder='Date'
                value={form.fecha_carga!==null? form.fecha_carga:new Date().toDateString()}
                onChange={(e) => handleChange("fecha_carga", e.target.value)} // Update new event title as the user types.
                required
                className='border border-gray-200 p-3 rounded-md text-lg w-full'
              />
              <input
                type='text'
                placeholder='Ruta'
                value={form.ruta!==null? form.ruta:''}
                onChange={(e) => handleChange("ruta", e.target.value)} // Update new event title as the user types.
                required
                className='border border-gray-200 p-3 rounded-md text-lg w-full'
              />
            </div>
            <div className='flex flex-row gap-3'>
              <input
                type='text'
                placeholder='Origin'
                value={form.origen!==null? form.origen:''}
                onChange={(e) => handleChange("origen", e.target.value)} // Update new event title as the user types.
                required
                className='border border-gray-200 p-3 rounded-md text-lg w-full'
              />

              <input
                type='text'
                placeholder='Broker'
                value={form.broker!==null? form.broker:''}
                onChange={(e) => handleChange("broker", e.target.value)} // Update new event title as the user types.
                required
                className='border border-gray-200 p-3 rounded-md text-lg w-full'
              />
            </div>
            <div className='flex flex-row gap-3'>
              <input
                type='text'
                placeholder='Destination'
                value={form.destino!==null? form.destino:''}
                onChange={(e) => handleChange("destino", e.target.value)} // Update new event title as the user types.
                required
                className='border border-gray-200 p-3 rounded-md text-lg w-full'
              />

              <input
                type='text'
                placeholder='Payload'
                value={form.carga!==null? form.carga:''}
                onChange={(e) => handleChange("carga", e.target.value)} // Update new event title as the user types.
                required
                className='border border-gray-200 p-3 rounded-md text-lg w-full'
              />
            </div>
            <div className='flex flex-row gap-3'>
              <input
                type='text'
                placeholder='Price of service'
                value={form.precio_de_servicio!==null? form.precio_de_servicio:0}
                onChange={(e) =>
                  handleChange("precio_de_servicio", e.target.value)
                } // Update new event title as the user types.
                required
                className='border border-gray-200 p-3 rounded-md text-lg w-full'
              />

              <input
                type='text'
                placeholder='method of payment..'
                value={form.forma_de_pago!==null? form.forma_de_pago:''}
                onChange={(e) => handleChange("forma_de_pago", e.target.value)} // Update new event title as the user types.
                required
                className='border border-gray-200 p-3 rounded-md text-lg w-full'
              />

              <select id="plataformas" className='border border-gray-200 p-3 rounded-md text-sm w-full' value={form.plataforma} onChange={(e) => handleChange('plataforma', e.target.value)}>
                {plataformas&&
                  plataformas.map((p) => (
                    <option value={p.nombre!} key={p.id}>{p.nombre}</option>
                  ))}
              </select>
            </div>
            <div className='flex flex-row gap-3'>
              <select id="choferes" className='border border-gray-200 p-3 rounded-md text-sm w-full' onChange={(e) => handleChangeChofer(e.target.value)}>
                {choferes&&
                  choferes.map((p) => <option value={p.id+'_'+p.username} key={p.id}>{p.username}</option>)}
              </select>
              <select id="vehiculos" className='border border-gray-200 p-3 rounded-md text-sm w-full' onChange={(e) => handleChangeVehicle(e.target.value)}>
                {vehiculos&&
                  vehiculos.map((p) => <option value={p.id+'_'+p.name} key={p.id}>{p.name}</option>)}
              </select>
            </div>{" "}
            <br />
            <button
              onClick={() => deleteEvent(arg?.event.id!)}
              className='p-4 py-2 bg-red-500 text-white rounded mr-4'
            >
              delete
            </button>
            <button
              onClick={() => handleAddEventDetail()}
              className='p-4 py-2 bg-green-500 text-white rounded'
            >
              add details
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Calendar // Export the Calendar component for use in other parts of the application.
