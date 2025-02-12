'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState("");
    const [registrado, setRegistrado] = useState(false);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [edad, setEdad] = useState(0);
    const [ciudad, setCiudad] = useState('');
    const [intereses, setIntereses] = useState('');
    const [permiteofertas, setPermitirOferta] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const register = { nombre, email, password, edad, ciudad, intereses, permiteofertas };
        try {
            const response = await fetch('http://localhost:1234/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(register)
            });
            const data = await response.json();
            console.log(data);
            const user = {
                token: data?.data?.token,
                role: data?.data?.user?.role,
                email: data?.data?.user?.email
            };
            setUserEmail(user.email);
            setRegistrado(true);
            localStorage.setItem('token', user.token);
            if (user.role === 'admin') {
                router.push('/options/admin');
            } else if (user.role === 'user') {
                router.push('/options/user');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    if (registrado) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-2xl font-bold">Bienvenido, {userEmail}</h1>
                <p className="text-green-600">Registrado correctamente</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6 text-black">Registro</h2>
                <label className="block mb-2 text-black">Nombre:</label>
                <input type="text" onChange={(e) => setNombre(e.target.value)} className="w-full p-2 border rounded mb-4" />
                <label className="block mb-2 text-black">Email:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" />
                <label className="block mb-2 text-black">Password:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" />
                <label className="block mb-2 text-black">Edad:</label>
                <input type="number" onChange={(e) => setEdad(e.target.value)} className="w-full p-2 border rounded mb-4" />
                <label className="block mb-2 text-black">Ciudad:</label>
                <input type="text" onChange={(e) => setCiudad(e.target.value)} className="w-full p-2 border rounded mb-4" />
                <label className="block mb-2 text-black">Intereses:</label>
                <input type="text" onChange={(e) => setIntereses(e.target.value.split(','))} className="w-full p-2 border rounded mb-4" />
                <div className="flex items-center mb-4">
                    <input type="checkbox" onChange={(e) => setPermitirOferta(e.target.checked)} className="mr-2" />
                    <label className="text-black">Permitir ofertas</label>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">Enviar</button>
            </form>
        </div>
    );
}