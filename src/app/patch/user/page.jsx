import React from "react";
import { useState } from "react";

export default function Scoring() {
    const [Scoring, setScoring] = useState(0)
    const [Resenas, setResena] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault()
        const valoracion = {
            resenas_users: {
                Scoring, Resenas
            }
        }
        const id = localStorage.getItem('idWebSelect')
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`http://localhost:4000/api/web/scoring/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(valoracion)
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error("No está bien", error)
        }
    }
    return (
        <>
            <div className="scoring-container">
                <label className="label">Scoring: </label>
                <select onChange={(e) => setScoring(Number(e.target.value))} className="select">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5 </option>
                </select>
                <br />
                <label className="label">Reseña para dejar: </label>
                <input type="text"onChange={(e) => setResena(e.target.value)} className="input"/>
                <br />
                <button type="submit" onClick={handleSubmit} className="submit-btn">Enviar Scoring</button>
            </div>
        </>
    )
}