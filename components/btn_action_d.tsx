
'use client'
import React from 'react'
import { Button } from './ui/button'
import { createClient } from '@/lib/client'
import { redirect } from 'next/navigation'


export default function BtnActionD({ id }: { id: string }) {

    const supabase=createClient()
    const start=async () => {
        const result=await supabase.from('servicios').update({ position: 2 }).eq('id', id).select()
        redirect('/')
    }
    return (
        <Button onClick={() => start()} >delivery</Button>
    )
}
