"use client"

import React, { useState, useEffect } from "react"
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventChangeArg,
} from "@fullcalendar/core"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { allServiciosNoPay, FetchServiciosQuery } from "@/lib/super_api"
import { superSupabase } from "@/lib/supabase/oterClient"
import { showToast } from "nextjs-toast-notify"


const Calendar: React.FC=() => {
  const [currentEvents, setCurrentEvents]=useState<EventApi[]>([])
  const [newCurrentEvents, setNewCurrentEvents]=useState()
  const [isDialogOpen, setIsDialogOpen]=useState<boolean>(false)
  const [isDialogEventOpen, setIsDialogEventOpen]=useState<boolean>(false)

  const [newEventTitle, setNewEventTitle]=useState<string>("")
  const [newEventPrice, setNewEventPrice]=useState<string>("")
  const [arg, setArg]=useState<EventClickArg>()


  const [selectedDate, setSelectedDate]=useState<DateSelectArg|null>(null)
  const [cambio, setCambio]=useState(false)

  const showMsg=() => showToast.success("¡La operación se realizó con éxito!", {
    duration: 4000,
    progress: true,
    position: "top-right",
    transition: "bounceIn",
    icon: '',
    sound: true,
  })


  const getNewCurrentsEvents=async () => {
    const result=await allServiciosNoPay()
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
  }, [currentEvents])

  const handleDateClick=(selected: DateSelectArg) => {
    setSelectedDate(selected)
    setIsDialogOpen(true)
  }

  const handleEventClick=(selected: EventClickArg) => {
    const ruta=`/protected/servicios/servicio/?${selected.event.id}`
    setIsDialogEventOpen(true)
    setArg(selected)
  }

  const handleCloseDialog=() => {
    setIsDialogOpen(false)
    setNewEventTitle("")
    setNewEventPrice("")
  }

  const handleAddEventInBD=async (
    newEventTitle: string,
    newEventPrice: string,
    startD: Date,
    endD: Date
  ) => {
    const fullEvent=newEventTitle+', '+newEventPrice
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

      handleAddEventInBD(newEventTitle, newEventPrice, selectedDate.start, selectedDate.end)

      handleCloseDialog()
    }
  }

  const deleteEvent=async (id: string) => { }
  const addDetails=async (id: string) => { }


  return (
    <div>
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-3/12">
          <div className="py-10 text-2xl font-extrabold px-7">
            Calendar Events
          </div>
          <ul className="space-y-4">
            {currentEvents.length<=0&&(
              <div className="italic text-center text-gray-400">
                No Events Present
              </div>
            )}

            {currentEvents.length>0&&
              currentEvents.map((event: EventApi) => (
                <li
                  className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
                  key={event.id}
                >
                  {event.title}
                  <br />
                  <label className="text-slate-950">
                    {formatDate(event.start!, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    {/* Format event start date */}
                  </label>
                </li>
              ))}
          </ul>
        </div>

        <div className="w-9/12 mt-8">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Initialize calendar with required plugins.
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }} // Set header toolbar options.
            initialView="dayGridMonth" // Initial view mode of the calendar.
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
            <DialogTitle>Event Details</DialogTitle>
            <div className='border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800 text-xs space-y-6'>
              <label>{arg?.event.title}</label>

              <br />
              <label className='text-slate-950'>
                {formatDate(arg?.event.start!, {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}{" "}
                {/* Format event start date */}
              </label>
              <br />
              <button onClick={() => deleteEvent(arg?.event.id!)} className="p-4 py-2 bg-red-500 text-white rounded mr-4">delete</button>
              <button onClick={() => addDetails(arg?.event.id!)} className="p-4 py-2 bg-green-500 text-white rounded">add details</button>
            </div>
          </DialogHeader>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Calendar // Export the Calendar component for use in other parts of the application.
