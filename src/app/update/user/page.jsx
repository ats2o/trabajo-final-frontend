"use client"
import React from "react";
import { useState } from "react";

export default function Update() {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [edad,  setEdad] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [intereses, setIntereses] = useState([''])
    const [permitirOferta, setPermitirOferta] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault()
        const register = {nombre, email, password, edad, ciudad, intereses, permitirOferta}
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        try {
            const response = await fetch(`http://localhost:4000/api/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}` ,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(register)
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
                    <input type="text" onChange={(e) => setNombre(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Email: </label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Password: </label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Edad: </label>
                    <input type="text" onChange={(e) => setEdad(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Ciudad: </label>
                    <input type="text" onChange={(e) => setCiudad(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Intereses: </label>
                    <input type="text" onChange={(e) => setIntereses(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Permitir ofertas: </label>
                    <input type="checkbox" onChange={(e) => setPermitirOferta(e.target.checked)} className="input"/>
                    <br />
                    <button type="submit" className="submit-btn">Enviar</button>
                </form>
            </div>
        </>
    )
}