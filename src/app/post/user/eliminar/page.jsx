"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DeleteAccountPage() {
    const [user, setUser] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const router = useRouter();
    useEffect(() => {
        // Obtener datos del usuario desde localStorage o API
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);
    const handleDelete = () => {
        localStorage.removeItem("user"); // Simulación de eliminación
        setUser(null);
        alert("Cuenta eliminada correctamente.");
        router.push("/"); // Redirigir a la página principal
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-semibold text-center text-red-600">
                    Eliminar Cuenta
                </h2>
                {user ? (
                    <>
                        <p className="text-center text-gray-600 mt-2">
                            Estás a punto de eliminar tu cuenta. Esta acción es irreversible.
                        </p>
                        {!confirmDelete ? (
                            <button
                                onClick={() => setConfirmDelete(true)}
                                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition mt-4"
                            >
                                Confirmar Eliminación
                            </button>
                        ) : (
                            <button
                                onClick={handleDelete}
                                className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition mt-4"
                            >
                                Sí, eliminar mi cuenta
                            </button>
                        )}
                    </>
                ) : (
                    <p className="text-center text-gray-500 mt-4">
                        No hay cuenta activa para eliminar.
                    </p>
                )}
            </div>
        </div>
    );
}
