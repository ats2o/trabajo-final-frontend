"use client"

import { useRouter } from "next/navigation";
export default function DeleteComerico() {
    const router = useRouter()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        const CIF = localStorage.getItem('CIF')
        try {
            const response = await fetch(`http://localhost:4000/api/comercio/${CIF}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            const data = response.json()
            console.log(data)
        } catch(error) {
            console.error("No está bien", error)
        }
    }
    return (
        <>
            <div className="eliminar-comercio-container">
                <form onSubmit={handleSubmit} className="eliminar-comercio-form">
                    <button type="submit" className="eliminar-comercio-button">Eliminar comercio</button>
                </form>
                <button onClick={() => router.push('/options/comercio')} className="eliminar-comercio-button">Volver atras</button>
            </div>
        </>
    )
}