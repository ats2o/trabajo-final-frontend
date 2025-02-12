"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateComercio() {
    const [name, setName] = useState("");
    const [CIF, setCIF] = useState("");
    const [direccion, setDireccion] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validación de campos
        if (!name || !CIF || !direccion || !email || !telefono) {
            console.error("Todos los campos son obligatorios");
            return;
        }
        const create = { name, CIF, direccion, email, telefono };
        const token = localStorage.getItem("token");
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:1234/api/comercio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(create),
            });
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            const data = await response.json();
            console.log("Comercio creado:", data);
            localStorage.setItem("tokenCif", data.token);
            localStorage.setItem("CIF", data.user.CIF);
            router.push("/options/comercio");
        } catch (error) {
            console.error("Error al crear comercio:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <label className="label">Nombre:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" />
                <label className="label">CIF:</label>
                <input type="text" value={CIF} onChange={(e) => setCIF(e.target.value)} className="input" />
                <label className="label">Dirección:</label>
                <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="input" />
                <label className="label">Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
                <label className="label">Teléfono:</label>
                <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="input" />
                <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar"}
                </button>
            </form>
        </div>
    );
}
