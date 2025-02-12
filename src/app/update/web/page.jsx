"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateWeb() {
    const [ciudad, setCiudad] = useState('');
    const [actividad, setActividad] = useState('');
    const [titulo, setTitulo] = useState('');
    const [resumen, setResumen] = useState('');
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const update = { ciudad, actividad, titulo, resumen };
        const id = localStorage.getItem('idWeb');
        const tokenCif = localStorage.getItem('tokenCif');
        if (!id || !tokenCif) {
            console.error("Falta el ID o el token en localStorage");
            return;
        }
        try {
            const response = await fetch(`http://localhost:1234/api/web/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenCif}`
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
                <label className="label">Ciudad: </label>
                <input 
                    type="text" 
                    value={ciudad} 
                    onChange={(e) => setCiudad(e.target.value)} 
                    className="input"
                />
                <br />
                <label className="label">Actividad: </label>
                <input 
                    type="text" 
                    value={actividad} 
                    onChange={(e) => setActividad(e.target.value)} 
                    className="input"
                />
                <br />
                <label className="label">Título: </label>
                <input 
                    type="text" 
                    value={titulo} 
                    onChange={(e) => setTitulo(e.target.value)} 
                    className="input"
                />
                <br />
                <label className="label">Resumen: </label>
                <input 
                    type="text" 
                    value={resumen} 
                    onChange={(e) => setResumen(e.target.value)} 
                    className="input"
                />
                <br />
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
            <button onClick={() => router.push('/options/web')} className="back-btn">
                Volver atrás
            </button>
        </div>
    );
}