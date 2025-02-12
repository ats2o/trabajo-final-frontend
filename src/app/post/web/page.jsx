"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CrearWeb() {
    const [ciudad, setCiudad] = useState("");
    const [actividad, setActividad] = useState("");
    const [titulo, setTitulo] = useState("");
    const [resumen, setResumen] = useState("");
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const create = { ciudad, actividad, titulo, resumen };
        const tokenCif = localStorage.getItem("tokenCif");
        if (!tokenCif) {
            console.error("Token no encontrado en localStorage");
            return;
        }
        try {
            const response = await fetch("http://localhost:4000/api/web", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenCif}`,
                },
                body: JSON.stringify(create),
            });
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            const data = await response.json();
            console.log(data);
            if (data?.data?._id) {
                localStorage.setItem("idWeb", data.data._id);
                router.push("/options/web");
            } else {
                console.error("ID no recibido en la respuesta");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <label className="label">Ciudad: </label>
                <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} className="input" required />
                <br />
                <label className="label">Actividad: </label>
                <input type="text" value={actividad} onChange={(e) => setActividad(e.target.value)} className="input" required />
                <br />
                <label className="label">Título: </label>
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="input" required />
                <br />
                <label className="label">Resumen: </label>
                <input type="text" value={resumen} onChange={(e) => setResumen(e.target.value)} className="input" required />
                <br />
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
            <button onClick={() => router.push("/options/comercio")} className="back-btn">Volver atrás</button>
        </div>
    );
}
