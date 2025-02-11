'use client'
import { useState } from "react";
export default function Register() {
    const [userEmail, setUserEmail] = useState("")
    const [registrado, setRegistrado] = useState(false)
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [edad,  setEdad] = useState(0)
    const [ciudad, setCiudad] = useState('')
    const [intereses, setIntereses] = useState([''])
    const [permiteofertas, setPermitirOferta] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault()
        const register = {nombre, email, password, edad, ciudad, intereses, permiteofertas}
        try {
            const response = await fetch('http://localhost:4000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(register)
            })
            const data = await response.json()
            console.log(data)
            const user = {
                token: data.data.token,
                role: data.data.user.role,
                email: data.data.user.email
            }
            setUserEmail(user.email)
            setRegistrado(true)
            localStorage.setItem('token', user.token)
            localStorage.getItem('token')
            sessionStorage.getItem('token', user.token)
            if (user.role === 'admin') {
                router.push('/options/admin')
            } else if (user.role === 'user') {
                router.push('/options/user')
            }
        } catch (error) {
            console.error('No esta bien', error)
        }
    }
    if (registrado) {
        return (
            <>
                <div>
                    <h1>Bienvenido, {userEmail}</h1>
                    <p>Registrado correctamente</p>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    <label className="label">Nombre: </label>
                    <input type="text" onChange={(e) => setNombre(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Email: </label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Password: </label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Edad: </label>
                    <input type="text" onChange={(e) => setEdad(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Ciudad: </label>
                    <input type="text" onChange={(e) => setCiudad(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Intereses: </label>
                    <input type="text" onChange={(e) => setIntereses(e.target.value)} className="input"/>
                    <br />
                    <label className="label">Permitir ofertas: </label>
                    <input type="checkbox" onChange={(e) =>  setPermitirOferta(e.target.checked)} className="input"/>
                    <br />
                    <button type="submit" className="submit-btn">Enviar</button>
                </form>
            </div>
        </>
    )
} 