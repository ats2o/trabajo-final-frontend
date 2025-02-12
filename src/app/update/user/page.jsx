"use client";
import React, { useState } from "react";

export default function Update() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [edad, setEdad] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [intereses, setIntereses] = useState([]);
    const [permitirOferta, setPermitirOferta] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const register = { nombre, email, password, edad, ciudad, intereses, permitirOferta };
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        if (!token || !id) {
            console.error("Token o ID no encontrados en localStorage");
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/api/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(register)
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
                <label className="label">Nombre: </label>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    className="input"
                />
                <br />
                <label className="label">Email: </label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="input"
                />
                <br />
                <label className="label">Password: </label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="input"
                />
                <br />
                <label className="label">Edad: </label>
                <input 
                    type="number" 
                    value={edad} 
                    onChange={(e) => setEdad(e.target.value)} 
                    className="input"
                />
                <br />
                <label className="label">Ciudad: </label>
                <input 
                    type="text" 
                    value={ciudad} 
                    onChange={(e) => setCiudad(e.target.value)} 
                    className="input"
                />
                <br />
                <label className="label">Intereses (separados por comas): </label>
                <input 
                    type="text" 
                    value={intereses.join(', ')} 
                    onChange={(e) => setIntereses(e.target.value.split(',').map(i => i.trim()))} 
                    className="input"
                />
                <br />
                <label className="label">Permitir ofertas: </label>
                <input 
                    type="checkbox" 
                    checked={permitirOferta} 
                    onChange={(e) => setPermitirOferta(e.target.checked)} 
                    className="input"
                />
                <br />
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
        </div>
    );
}
