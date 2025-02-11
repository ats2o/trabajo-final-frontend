"use client"
import React from "react";

export default function Delete() {
    const handleSubmit = async (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        try {
            const response = await fetch(`http://localhost:1234/api/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}` ,
                    'Content-Type': 'application/json'
                }
            })
            const data = response.json()
            console.log(data)
        } catch (error) {
            console.error("No está bien", error)
        }
    }
    return (
        <>
            <div className="eliminar-comercio-container">
                <form onSubmit={handleSubmit} className="eliminar-comercio-form">
                    <button type="submit" className="eliminar-comercio-button">Elimina cuenta</button>
                </form>
            </div>
        </>
    )
}