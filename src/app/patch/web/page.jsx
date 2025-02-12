"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubirFoto() {
    const [file, setFile] = useState(null);
    const [texto, setTexto] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Obtener valores de localStorage
        const tokenCif = localStorage.getItem("tokenCif");
        const id = localStorage.getItem("idWeb");
        if (!file || !texto.trim() || !tokenCif || !id) {
            console.error("Faltan datos requeridos (imagen, texto, token o ID)");
            return;
        }
        const formData = new FormData();
        formData.append("image", file);
        formData.append("Array_textos", texto);
        try {
            setIsLoading(true);
            // Subir imagen
            const response = await fetch("http://localhost:1234/api/storage", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${tokenCif}`,
                },
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`Error al subir imagen: ${response.status}`);
            }
            const data = await response.json();
            console.log("Imagen subida:", data);
            // Guardar imagen y texto en la web
            const subirFoto = await fetch(`http://localhost:1234/api/storage/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenCif}`,
                },
                body: JSON.stringify({
                    Array_textos: [texto], // Asegurar que se envía como array
                    Array_imagenes: [data.data.url], // Asegurar que se envía como array
                }),
            });
            if (!subirFoto.ok) {
                throw new Error(`Error al actualizar web: ${subirFoto.status}`);
            }
            const dataFoto = await subirFoto.json();
            console.log("Actualización exitosa:", dataFoto);
        } catch (error) {
            console.error("Error en la operación:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="upload-container">
            <form onSubmit={handleSubmit} className="upload-form">
                <label className="label">Texto: </label>
                <input
                    type="text"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    className="input"
                />
                <br />
                <label className="label">Selecciona una imagen: </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="input"
                />
                <br />
                <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? "Subiendo..." : "Subir"}
                </button>
            </form>
            <button onClick={() => router.push("/options/web")} className="back-btn">
                Volver atrás
            </button>
        </div>
    );
}
