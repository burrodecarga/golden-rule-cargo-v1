'use client'

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'
import { updateServicioByBol, updateServicioByPod, updateServicioByRc } from '@/lib/api_server'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { use } from 'react'

export default function UploadSreen({ params }: { params: Promise<{ name: string, id: string }> }) {
    const { name, id }=use(params)



    const props=useSupabaseUpload({
        bucketName: 'documentos',
        path: '',
        allowedMimeTypes: ['image/*'],
        maxFiles: 2,
        maxFileSize: 1000*1000*10, // 10MB,

    })

    const router=useRouter()

    if (props.isSuccess) {
        let publicUrl='https://stxsnrianylaldkorlgy.supabase.co/storage/v1/object/public/documentos//'+props.successes[0]
        if (name?.toUpperCase()=='BOL') {
            updateServicioByBol(id as string, publicUrl)
        }
        if (name?.toUpperCase()=='POD') {
            updateServicioByPod(id as string, publicUrl)
        }
        if (name?.toUpperCase()=='RC') {
            updateServicioByRc(id as string, publicUrl)
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

