import { FetchServicios } from '@/lib/api'
import React from 'react'
import { Button } from './ui/button'

export default function ListActivities({ activities, filter }: { activities: FetchServicios, filter: number }) {
    return (
        <div>
            {activities&&activities.map((a) => {
                return (
                    <div className="flex flex-col w-full">
                        <Button key={a.id} className='px-4 py-2 bg-blue-500 w-full mb-3'>
                            {a.ruta}
                        </Button>
                    </div>
                )
            })}
        </div>
    )
}
