import React, { useState } from "react";

export default function Scoring() {
    const [scoring, setScoring] = useState(0);
    const [resena, setResena] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = localStorage.getItem('idWebSelect');
        const token = localStorage.getItem('token');
        if (!id || !token) {
            console.error("ID o token no encontrado en localStorage.");
            return;
        }
        const valoracion = {
            resenas_users: {
                scoring, 
                resena
            }
        };
        try {
            const response = await fetch(`http://localhost:1234/api/web/scoring/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(valoracion)
            });
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };
    return (
        <div className="scoring-container">
            <form onSubmit={handleSubmit}>
                <label className="label">Scoring: </label>
                <select onChange={(e) => setScoring(Number(e.target.value))} className="select">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br />
                <label className="label">Reseña para dejar: </label>
                <input 
                    type="text" 
                    onChange={(e) => setResena(e.target.value)} 
                    className="input"
                    value={resena}
                />
                <br />
                <button type="submit" className="submit-btn">
                    Enviar Scoring
                </button>
            </form>
        </div>
    );
}