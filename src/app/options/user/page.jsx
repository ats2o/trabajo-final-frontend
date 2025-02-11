'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ComercioOptions() {
    const router = useRouter()

    useEffect(() => {
        const role = localStorage.getItem('role')
        if (role !== 'user') {
            router.push('/post/user/login')
        }
    }, [router])

    return (
        <div className="admin-options-container">
            <p className="subtitle">Elige una de las siguientes opciones:</p>

            <div>
                <button
                    onClick={() => router.push('/get/web/VerWeb')}
                    className="btn btn-view"
                >
                    Ver webs
                </button>
            </div>
        </div>
    );

}
