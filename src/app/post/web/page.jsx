"use client"
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CrearWeb() {

    const [Ciudad, setCiudad] = useState('')
    const [Actividad, setActividad] = useState('')
    const [Titulo, setTitulo] = useState('')
    const [Resumen, setResumen] = useState('')
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const create = {Ciudad, Actividad, Titulo, Resumen}
        const tokenCif = localStorage.getItem('tokenCif')

        try {
            const response = await fetch('http://localhost:4000/api/web', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenCif}`
                },
                body: JSON.stringify(create)
            })

            const data = await response.json()
            console.log(data)

            const web = {
                id: data.data._id
            }

            localStorage.setItem('idWeb', web.id)
            
            router.push('/options/web')

        } catch (error) {
            console.error("No está bien", error)
        }
    }

    return (
        <>
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <label className="label">Ciudad: </label>
                <input type="text" onChange={(e) => setCiudad(e.target.value)} className="input"/>
                <br />
                <label className="label">Actividad: </label>
                <input type="text" onChange={(e) => setActividad(e.target.value)} className="input"/>
                <br />
                <label className="label">Titulo: </label>
                <input type="text" onChange={(e) => setTitulo(e.target.value)} className="input"/>
                <br />
                <label className="label">Resumen: </label>
                <input type="text" onChange={(e) => setResumen(e.target.value)} className="input"/>
                <br />
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
            <button onClick={() => router.push('/options/comercio')} className="back-btn">Volver atras</button>
        </div>
        </>
    )
}