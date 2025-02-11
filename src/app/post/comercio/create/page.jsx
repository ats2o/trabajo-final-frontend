"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateComercio() {
    const [name, setName] = useState('')
    const [CIF, setCIF] = useState('')
    const [direccion, setDireccion] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const router = useRouter()    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const create = {name, CIF, direccion, email, telefono}
        const token = localStorage.getItem('token')
        try {
            const response = await fetch('http://localhost:4000/api/comercio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(create)
            })
            const data = await response.json()
            console.log(data)
            const comercio = {
                tokenCif: data.token,
                CIF: data.user.CIF
            }
            localStorage.setItem('tokenCif', comercio.tokenCif)
            localStorage.setItem('CIF', comercio.CIF)
            router.push('/options/comercio')
        } catch (error) {
            console.error("No está bien", error)
        }
    }
    return (
        <>
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
            <label className="label">Nombre: </label>
                <input type="text" onChange={(e) => setName(e.target.value)} className="input"/>
                <br />
                <label className="label">CIF: </label>
                <input type="text" onChange={(e) => setCIF(e.target.value)} className="input"/>
                <br />
                <label className="label">Direccion: </label>
                <input type="text" onChange={(e) => setDireccion(e.target.value)} className="input"/>
                <br />
                <label className="label">Email: </label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} className="input"/>
                <br />
                <label className="label">Telefono: </label>
                <input type="text" onChange={(e) => setTelefono(e.target.value)} className="input"/>
                <br />
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
        </div>
        </>
    )
}