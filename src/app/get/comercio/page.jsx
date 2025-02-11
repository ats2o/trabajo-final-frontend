"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerComercio() {

    const [comercio, setcomercio] = useState([])
    const [click, setClick] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        // const create = {name, CIF, direccion, email, telefono}
        const token = localStorage.getItem('token')

        try {
            const response = await fetch('http://localhost:4000/api/comercio/?ordenar=asc', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })

            const data = await response.json()
            console.log(data)
            setcomercio(data)

        } catch (error) {
            console.error("No está bien", error)
        }
    }

    const ListComercios = comercio.map(comercio => (
        <div key={comercio._id}>
            <p>Nombre: {comercio.name}</p>
            <p>Dirección: {comercio.direccion}</p>
            <p>Email: {comercio.email}</p>
            <p>Telefono: {comercio.telefono}</p>
        </div>
    ))

    return (
        <>
            <div className="ver-comercios-container">
                <form onSubmit={handleSubmit} className="ver-comercios-form">
                    <button type="submit" onClick={() => setClick(prev => !prev)} className="ver-comercios-button">Ver comercios</button>
                    {
                        click && (
                            <ul className="ver-comercios-list">
                                {ListComercios.map((comercio, index) => (
                                    <li key={index} className="ver-comercios-item">{comercio}</li>
                                ))}
                            </ul>
                        )
                    }
                </form>
                
                <button onClick={() => router.push('/options/comercio')} className="ver-comercios-button">Volver atras</button>
            </div>
        </>
    )
}