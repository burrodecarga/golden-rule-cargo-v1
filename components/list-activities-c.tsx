import { FetchServicios } from '@/lib/api'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export default function ListActivitiesC({ activities, filter }: { activities: FetchServicios, filter: number }) {




    return (
        <div>
            {activities&&activities.map((a) => {
                return (
                    <div className="flex flex-col w-full" key={a.id+a.orden} >
                        <Link href={`/protected/chofer/${a.id}`}>
                            <Button className='px-4 py-2 bg-blue-500 w-full mb-3'>
                                {a.ruta}-{a.chofer_id}-{a.position}
                            </Button>
                        </Link>

                    </div>
                )
            })}
        </div>
    )
}
