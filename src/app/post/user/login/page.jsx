'use client';
import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const datos = { email, password };

        try {
            const response = await fetch("http://localhost:4000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            });

            const data = await response.json();
            console.log(data);

            const user = {
                token: data.data.token,
                role: data.data.user.role,
                email: data.data.user.email,
                id: data.data.user._id
            }
            setUserEmail(user.email)
            setIsLoggedIn(true)

            
            localStorage.setItem('id', user.id)
            localStorage.setItem("token", user.token)
            localStorage.setItem('role', user.role)
            sessionStorage.getItem('token', user.token)

            if (user.role === 'admin') {
                router.push('/options/admin')
            } else if (user.role === 'user') {
                router.push('/options/user')
            }

        } catch (error) {
            console.error("No está bien", error)
        }
    };

    if (isLoggedIn) {
        return (
            <div>
                <h1>Bienvenido, {userEmail}</h1>
                <p>Has iniciado sesión correctamente.</p>
            </div>
        );
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <label className="label">Email: </label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input"/>
                <br />
                <label className="label">Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input"/>
                <br />
                <button type="submit" className="submit-btn">Enviar</button>
            </form>
        </div>
    );
}
