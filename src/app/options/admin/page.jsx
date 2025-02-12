'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserOptions() {
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== "undefined") { // Evita errores en SSR
            const role = localStorage.getItem('role');
            if (role !== 'admin') {
                router.push('/post/user/login');
            }
        }
    }, []);
    return (
        <div className="admin-container">
            <h1 className="title">Bienvenido, Admin</h1>
            <p className="subtitle">Elige una de las siguientes opciones:</p>
            <div className="option-button-container">
                <button 
                    onClick={() => router.push('/post/comercio/create')} 
                    className="btn btn-create"
                >
                    Crear un Comercio
                </button>
            </div>
            <div className="option-button-container">
                <button 
                    onClick={() => router.push('/post/comercio/login')} 
                    className="btn btn-login"
                >
                    Login Comercio
                </button>
            </div>
        </div>
    );
}
