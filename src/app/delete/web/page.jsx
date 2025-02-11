"use client"
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DeleteWeb() {

    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const id = localStorage.getItem('idWeb')
        const tokenCif = localStorage.getItem('tokenCif')

        try {
            const response = await fetch(`http://localhost:4000/api/web/${id}`, {
                method: 'DELETE', 
                headers: {
                    'Authorization': `Bearer ${tokenCif}`
                },
            })

            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.error("No está bien", error)
        }
    }


    return (
        <>
            <div className="eliminar-comercio-container">
                <form onSubmit={handleSubmit} className="eliminar-comercio-form">
                    <button type="submit" className="eliminar-comercio-button">Elimina web</button>
                </form>
                <button onClick={() => router.push('/options/web')} className="eliminar-comercio-button">Volver atras</button>
            </div>
        </>
    )
}