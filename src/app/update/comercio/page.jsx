"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateComercio() {
    const [name, setName] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const update = { name, direccion, email, telefono };
        const token = localStorage.getItem('token');
        const CIF = localStorage.getItem('CIF');
        if (!token || !CIF) {
            console.error("Token o CIF no encontrados en localStorage");
            return;
        }
        try {
            const response = await fetch(`http://localhost:1234/api/comercio/${CIF}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(update)
            });
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <label className="label">Nombre:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="input" 
                />
                <br />
                <label className="label">Dirección:</label>
                <input 
                    type="text" 
                    value={direccion} 
                    onChange={(e) => setDireccion(e.target.value)} 
                    className="input" 
                />
                <br />
                <label className="label">Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="input" 
                />
                <br />
                <label className="label">Teléfono:</label>
                <input 
                    type="tel" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                    className="input" 
                />
                <br />
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
            <button onClick={() => router.push('/options/comercio')} className="back-btn">
                Volver atrás
            </button>
        </div>
    );
}
