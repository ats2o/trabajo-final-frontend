"use client";
import { useState, useEffect } from "react";

export default function EditProfilePage() {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    useEffect(() => {
        // Simulación de obtener datos del usuario desde localStorage o API
        const storedUser = JSON.parse(localStorage.getItem("user")) || {
            name: "Usuario",
            email: "usuario@email.com",
        };
        setUser({ ...storedUser, password: "" }); // No prellenar la contraseña
    }, []);
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user.name || !user.email) {
            setMessage("Por favor, completa todos los campos.");
            return;
        }
        // Simulación de guardado en localStorage o API
        localStorage.setItem("user", JSON.stringify(user));
        setMessage("Perfil actualizado correctamente.");
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Modificar Perfil
                </h2>
                {message && (
                    <p className="text-center text-sm text-green-600 mt-2">{message}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <label className="block text-gray-600 text-sm">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm">Correo</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm">Nueva Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    );
}
