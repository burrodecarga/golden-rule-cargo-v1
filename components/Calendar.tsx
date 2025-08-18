"use client"

import React, { useState, useEffect, use } from "react"
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
import { v4 as uuidv4 } from "uuid"
import { FetchEvents } from "@/lib/api"
import { DataFullCalenda, Evento } from "@/types/util_types"
import Link from "next/link"

const Calendar: React.FC=() => {
  const [currentEvents, setCurrentEvents]=useState<EventApi[]>([])
  const [newCurrentEvents, setNewCurrentEvents]=useState<
    FetchEvents|Evento|null
  >()
  const [isDialogOpen, setIsDialogOpen]=useState<boolean>(false)
  const [newEventTitle, setNewEventTitle]=useState<string>("")
  const [selectedDate, setSelectedDate]=useState<DateSelectArg|null>(null)

  const getEventos=async () => {
    const { data }=await superSupabase.from("events").select("*")
    if (!data) {
      //setNewCurrentEvents()
    }
    console.log("EVENTOS", data)
    setNewCurrentEvents(data)
  }

  useEffect(() => {
    getEventos()
  }, [])

  useEffect(() => {
    // Load events from local storage when the component mounts
    if (typeof window!=="undefined") {
      localStorage.removeItem("events")
      const savedEvents=localStorage.getItem("events")
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents))
      }
      localStorage.removeItem("events")
      console.log("BORRANDO EVENTOS")
    }
  }, [])

  useEffect(() => {
    // Save events to local storage whenever they change
    if (typeof window!=="undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents))
    }
  }, [currentEvents])

  const handleDateClick=(selected: DateSelectArg) => {
    setSelectedDate(selected)
    setIsDialogOpen(true)
  }

  const handleEventClick=(selected: EventClickArg) => {
    const ruta=`/protected/servicios/servicio/?${selected.event.id}`
    //Prompt user for confirmation before deleting an event
    if (
      window.confirm(
        `Are you sure you want to delete the event "${selected.event.title}"?`
      )
    ) {
      window.location.href=ruta
      //selected.event.remove()
    }
  }

  const updateEvent=async (arg: EventChangeArg) => {

    const startD=arg.event.start
    const endD=arg.event.end
    console.log('START STR', startD)
    const { data, error }=await superSupabase
      .from("events")
      .update({ start: startD?.toDateString(), end: endD?.toDateString() })
      .eq("id", arg.event.id)
      .select()
  }

  const handleAddEventInBD=async (
    newEventTitle: string,
    startD: Date,
    endD: Date
  ) => {
    const { data, error }=await superSupabase
      .from("events")
      .insert([
        {
          title: newEventTitle,
          start: startD.toDateString(),
          end: endD.toDateString()
        }
      ])
      .select()
  }

  const handleCloseDialog=() => {
    setIsDialogOpen(false)
    setNewEventTitle("")
  }

  const handleAddEvent=(e: React.FormEvent) => {
    e.preventDefault()
    if (newEventTitle&&selectedDate) {
      const calendarApi=selectedDate.view.calendar // Get the calendar API instance.
      calendarApi.unselect() // Unselect the date range.
      const newId=`${selectedDate.start.toISOString()}-${newEventTitle}`
      const isAllDay=selectedDate.allDay
      const newEvent={
        id: newId,
        title: newEventTitle,
        start: selectedDate.start,
        end: selectedDate.end,
        allDay: isAllDay,
        servicio_id: "00-00-00",
        editable: true,
        backgroundColor: "yellow",
        textColor: "black"
      }

      const startD=selectedDate.start
      const endD=selectedDate.end
      calendarApi.addEvent(newEvent)
      // handleAddEventInBD(newEventTitle, startD, endD)
      handleAddEventInBD(newEventTitle, startD, endD)
      handleCloseDialog()
    }
  }

  return (
    <div>
      <div className='flex w-full px-10 justify-start items-start gap-8'>
        <div className='w-3/12'>
          <div className='py-10 text-xl font-extrabold px-7'>
            Calendar Events
          </div>
          <ul className='space-y-4'>
            {currentEvents.length<=0&&(
              <div className='italic text-center text-gray-400'>
                No Events Present
              </div>
            )}

            {currentEvents.length>0&&
              currentEvents.map((event: EventApi) => (
                <li
                  className='border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800 text-xs'
                  key={uuidv4()}
                >
                  {event.title}
                  <br />
                  <label className='text-slate-950'>
                    {formatDate(event.start!, {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}{" "}
                    {/* Format event start date */}
                  </label>
                  <Link href={`/protected/servicios/servicio/${event.id}`}>
                    Enviar
                  </Link>
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
            // initialEvents={
            //   typeof window!=="undefined"
            //     ? JSON.parse(localStorage.getItem("events")||"[]")
            //     :[]
            // } // Initial events loaded from local storage.

            events={newCurrentEvents as DataFullCalenda}
            eventChange={(arg: EventChangeArg) => updateEvent(arg)}
          />
        </div>
      </div>

      {/* Dialog for adding new events */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event Details</DialogTitle>
          </DialogHeader>
          <form className='space-x-5 mb-4' onSubmit={handleAddEvent}>
            <input
              type='text'
              placeholder='Event Title'
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)} // Update new event title as the user types.
              required
              className='border border-gray-200 p-3 rounded-md text-lg'
            />
            <button
              className='bg-green-500 text-white p-3 mt-5 rounded-md'
              type='submit'
            >
              Add
            </button>{" "}
            {/* Button to submit new event */}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Calendar // Export the Calendar component for use in other parts of the application.
