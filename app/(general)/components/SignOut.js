'use client'

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function SignOut(){
    return (
        <button onClick={() => signOut()} className="contSignOut">
            Cerrar sesión
        </button>
    )
}