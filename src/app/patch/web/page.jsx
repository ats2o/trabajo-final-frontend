"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubirFoto() {
    const [file, setFile] = useState(null)
    const [texto, setTexto] = useState('')
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const tokenCif = localStorage.getItem('tokenCif')
        const id = localStorage.getItem('idWeb')

        const formData = new FormData()
        formData.append("image", file)
        formData.append("Array_textos", texto)

        try {
            const response = await fetch('http://localhost:4000/api/storage', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${tokenCif}`
                },
                body: formData
            })

            const data = await response.json()
            console.log(data)

            const subirFoto = await fetch(`http://localhost:4000/api/storage/${id}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenCif}`
                },
                body: JSON.stringify({Array_textos: texto, Array_imagenes: data.data.url})
            })

            const dataFoto = await subirFoto.json()
            console.log(dataFoto)
            

        } catch (error) {
            console.error("No está bien", error)
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <>
            <div className="upload-container">
                <form onSubmit={handleSubmit} className="upload-form">
                    <label className="label">Texto: </label>
                    <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Selecciona una imagen: </label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="input"/>
                    <br />
                    <button type="submit" className="submit-btn">Subir</button>
                </form>
                <button onClick={() => router.push('/options/web')} className="back-btn">Volver atras</button>
            </div>
        </>
    );
}
