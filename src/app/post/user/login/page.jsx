"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulación de autenticación (aquí iría la petición real a la API)
        if (email === "usuario@email.com" && password === "123456") {
            const user = { email, token: "fake-token-123" };
            localStorage.setItem("user", JSON.stringify(user));

            // Redirigir a la página deseada después del login
            router.push("/dashboard");  // Cambia "/dashboard" por la ruta que quieras
        } else {
            setError("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Iniciar Sesión
                </h2>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                    <div>
                        <label className="block text-gray-600 text-sm">Correo</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}
