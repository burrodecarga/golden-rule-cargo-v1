'use client'

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'
import { updateUserByLicense, updateUserByMedical, updateUserBySocial, updateUserByW, updateUserByWork } from '@/lib/api_server'
import { useParams, useRouter, } from 'next/navigation'
import { Suspense } from 'react'

export default function UploadSreenPersonal() {
    const params=useParams<{ id: string; name: string }>()
    const id=params.id
    const name=params.name
    const props=useSupabaseUpload({
        bucketName: 'personal',
        path: '',
        allowedMimeTypes: ['image/*'],
        maxFiles: 2,
        maxFileSize: 1000*1000*10, // 10MB,

    })

    const router=useRouter()

    console.log('NAME', id, name)
    if (props.isSuccess) {
        let publicUrl='https://stxsnrianylaldkorlgy.supabase.co/storage/v1/object/public/personal//'+props.successes[0]
        if (name?.toUpperCase()=='DRIVER_LICENSE_URL') {

            updateUserByLicense(id as string, publicUrl)
        }
        if (name?.toUpperCase()=='MEDICAL_CERTIFICATE_URL') {
            updateUserByMedical(id as string, publicUrl)
        }
        if (name?.toUpperCase()=='SOCIAL_SECURITY_URL') {
            updateUserBySocial(id as string, publicUrl)
        }

        if (name?.toUpperCase()=='WORK_PERMIT_URL') {
            updateUserByWork(id as string, publicUrl)
        }

        if (name?.toUpperCase()=='W_9_URL') {
            updateUserByW(id as string, publicUrl)
        }

        //console.log('PROPS SALIDA', props.successes[0])
        router.back()

    }

    return (
        <Suspense>
            <div className="w-[500px]">
                <p className='text-gray-500 uppercase'>select image {name}</p>

                <Dropzone {...props}>
                    <DropzoneEmptyState />
                    <DropzoneContent />
                </Dropzone>
                <button onClick={() => router.back()}>Cancel</button>
            </div>
        </Suspense>
    )
}

