"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginComercio() {
    const [email, setEmail] = useState('')
    const router = useRouter();
    const handleSubmit = async (event) => {
        event.preventDefault()
        const login = {email}
        const token = localStorage.getItem('token')
        try {
            const response = await fetch('http://localhost:1234/api/comercio/login', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(login)
            })
            const data = await response.json()
            console.log(data)
            const comercio = {
                tokenCif: data.data.token,
                CIF: data.data.user.CIF
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
                <label className="label">Email: </label>
                <input type="text" onChange={(e) => setEmail(e.target.value)} className="input"/>
                <br />
                <button type="submit" className="submit-btns">Enviar</button>
            </form>
        </div>
        </>
    )
}