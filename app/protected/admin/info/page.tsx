'use client'

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'
import { updateVehicleByDocument, updateVehicleByImage } from '@/lib/api_server'
import { useParams, useRouter, } from 'next/navigation'

export default function UploadSreenPersonal() {
    const params=useParams<{ id: string; name: string }>()
    const id=params.id
    const name=params.name
    const props=useSupabaseUpload({
        bucketName: 'vehiculos',
        path: '',
        allowedMimeTypes: ['image/*'],
        maxFiles: 2,
        maxFileSize: 1000*1000*10, // 10MB,

    })

    const router=useRouter()

    //console.log('NAME', id, name)
    if (props.isSuccess) {
        let publicUrl='https://stxsnrianylaldkorlgy.supabase.co/storage/v1/object/public/vehiculos//'+props.successes[0]
        if (name?.toUpperCase()=='DOCUMENT') {

            updateVehicleByDocument(id as string, publicUrl)
        }
        if (name?.toUpperCase()=='IMAGE') {

            updateVehicleByImage(id as string, publicUrl)
        }


        //console.log('PROPS SALIDA', props.successes[0])
        router.back()

    }

    return (
        <div className="w-[500px]">
            <p className='text-gray-500 uppercase'>select image {name}</p>
            <Dropzone {...props}>
                <DropzoneEmptyState />
                <DropzoneContent />
            </Dropzone>
            <button onClick={() => router.back()}>Cancel</button>
        </div>
    )
}

