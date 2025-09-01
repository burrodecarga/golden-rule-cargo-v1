'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { addGastosByServicioId, getAllGastosByServicio, getGastosByServicioId, } from '@/lib/api_server'
import { showToast } from "nextjs-toast-notify"
import { Badge } from './ui/badge'



const hoy=new Date()
const gastos=['food', 'repair', 'replacement', 'tex', 'toll', 'legal', 'panalty', 'other']
const initialForm={ 'fecha': hoy.toDateString(), 'tipo': 'other', 'monto': 0 }

export default function FormGasto({ id }: { id: string }) {
    const [isDialogOpen, setIsDialogOpen]=useState<boolean>(false)
    const [loading, setLoading]=useState(false)
    const [gastosv, setGastosv]=useState(0)


    const getGastos=async () => {
        const allGastos=await getAllGastosByServicio()
        let gasto=0
        const result=allGastos.filter(g => g.servicio_id===id)
        if (result) {
            gasto=result[0]? Number(result[0].total_gasto):0
            setGastosv(gasto)
        }
    }

    const [form, setForm]=useState<{ fecha: string, tipo: string, monto: number }>(initialForm)

    const showMsg=() =>
        showToast.success("¡La operación se realizó con éxito!", {
            duration: 4000,
            progress: true,
            position: "top-right",
            transition: "bounceIn",
            icon: "",
            sound: true
        })


    const handleAddGasto=(e: React.FormEvent) => {
        e.preventDefault()
        if (form.monto!==0&&form.tipo.length!==0&&form.fecha.length!==0) {
            setLoading(true)
            const result=addGastosByServicioId(form.fecha, form.tipo, form.monto, id)
            setIsDialogOpen(false)
            showMsg()
            setLoading(false)
        }
    }

    const handleChange=(name: string, text: string): void => {
        setForm((prev) => ({
            ...prev,
            [name]: text
        }))
    }

    useEffect(() => { getGastos() }, [handleAddGasto])

    return (
        <div>

            <Badge variant="destructive">Expenses : {gastosv} $</Badge>
            <div className='my-2' />
            {/* Dialog for adding new events */}
            <Button onClick={() => setIsDialogOpen(true)}>add expense</Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Expense</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <form className='mb-4 space-y-4' onSubmit={handleAddGasto}>
                        <div className="grid grid-cols-2 md:gap-6">

                            <input
                                type='date'
                                placeholder='Date'
                                value={form.fecha!==null? form.fecha:new Date().toDateString()}
                                onChange={(e) => handleChange("fecha", e.target.value)} // Update new event title as the user types.
                                required
                                className='border border-gray-200 p-3 rounded-md text-lg w-full'
                            />
                            <select id="gastos" className='border border-gray-200 p-3 rounded-md text-sm w-full' value={form.tipo} onChange={(e) => handleChange('tipo', e.target.value)}>
                                {gastos&&
                                    gastos.map((p) => (
                                        <option value={p!} key={p}>{p}</option>
                                    ))}
                            </select>
                        </div>

                        <input
                            type='text'
                            placeholder='Event price'
                            value={form.monto!==null? form.monto:0}
                            onChange={(e) =>
                                handleChange("monto", e.target.value)}
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
        </div>
    )
}
