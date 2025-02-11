"use client"
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateComercio() {
    const [name, setName] = useState('')
    const [direccion, setDireccion] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const router = useRouter()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const update = {name, direccion, email, telefono}
        const token = localStorage.getItem('token')
        const CIF = localStorage.getItem('CIF')
        try {
            response = await fetch(`http://localhost:1234/api/comercio/${CIF}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Asegúrate de que el token sea válido
                },
                body: JSON.stringify(update) // Asegúrate de que 'update' contenga los datos correctos
            })
            const data = response.json()
            console.log(data)
        } catch (error) {
            console.error("No está bien", error)
        }
    }
    return (
        <>
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <label className="label">Nombre: </label>
                <input type="text" onChange={(e) => setName(e.target.value)} className="input"/>
                <br />
                <label className="label">Direccion: </label>
                <input type="text" onChange={(e) => setDireccion(e.target.value)} className="input"/>
                <br />
                <label className="label">Email: </label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} className="input"/>
                <br />
                <label className="label">Telefono: </label>
                <input type="text" onChange={(e) => setTelefono(e.target.value)} className="input"/>
                <br />
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
            <button onClick={() => router.push('/options/comercio')} className="back-btn">Volver atras</button>
        </div>
        </>
    )
}