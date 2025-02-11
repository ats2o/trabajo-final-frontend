'use client'
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    console.log('Estado de isLoggedIn en Navbar:', isLoggedIn);

    useEffect(() => {
            const token = localStorage.getItem("token")
            if (token) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        }, []); // Solo se ejecuta cuando el componente se monta

        const handleLogout = () => {
            // Eliminar el token del localStorage al hacer logout
            localStorage.removeItem("token");
            setIsLoggedIn(false);  // Cambiar el estado al hacer logout
        };

        
        console.log('Estado de isLoggedIn en Navbar:', isLoggedIn);

    return (
        <nav className="navbar">
            <Link href='/'>
                Casa
            </Link>
            <br />

            {!isLoggedIn ? (
                <>
                    <Link href='/post/user/login' className="navbar-link">
                        <button>Login</button>
                    </Link>
                    <br />
                    <Link href='/post/user/registro' className="navbar-link">
                        Registrar un usuario
                    </Link>
                </>
            ) : (
                <>
                    <Link href='/post/user/modificar' className="navbar-link">
                        Modificar perfil
                    </Link>
                    <br />
                    <Link href='/post/user/eliminar' className="navbar-link">
                        Eliminar cuenta
                    </Link>
                    <br />
                    <button onClick={handleLogout} className="navbar-button">Cerrar sesión</button>
                </>
            )}
        </nav>
    );
}
