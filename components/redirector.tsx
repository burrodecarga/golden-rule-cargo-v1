import { redirect, RedirectType } from 'next/navigation'
import React from 'react'

export function Redirector({ role }: { role: string }) {
    if (role==='chofer') {
        redirect('/protected/employes', RedirectType.replace)
    } else {
        redirect('/protected/admin', RedirectType.replace)

    }
    return (
        <div>Redirector {role}</div>
    )
}
