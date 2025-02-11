"use client"
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GetUserCity() {
    
    const [usersCity, setUsersCity] = useState([])
    const [click, setClick] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const tokenCif = localStorage.getItem('tokenCif')

        try {
            const response = await fetch('http://localhost:4000/api/web/userInteresadoCiudad', {
                method: 'GET', 
                headers: {
                    'Authorization': `Bearer ${tokenCif}`
                },
            })

            const data = await response.json()
            console.log(data)
            setUsersCity(data)

        } catch (error) {
            console.error("No está bien", error)
        }
    }

    const ListaUsersCity = usersCity.map(usersCity => (
        <div key={usersCity._id}>
            <h4>Nombre: {usersCity.nombre}</h4>
            <p>Ciudad: {usersCity.ciudad}</p>
        </div>
    ))

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <button type="submit" className="btn-primary" onClick={() => setClick((prev) => !prev)}>
                        Ver usuarios de la misma ciudad
                    </button>
                    {click && (
                        <ul className="user-list">
                            {ListaUsersCity.map((personas, index) => (
                                <li key={index} className="user-item">
                                    {personas}
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
                <button onClick={() => router.push('/options/web')} className="back-btn">Volver atras</button>
            </div>
        </>
    );
    
}