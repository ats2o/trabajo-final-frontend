"use client"; // Indica que este archivo debe ser ejecutado en el cliente.
import { useState, useEffect } from "react"; // Importa los hooks useState y useEffect de React.
import Link from "next/link"; // Importa el componente Link de Next.js para la navegación.

export default function Navbar() { // Define el componente Navbar como la exportación por defecto.
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Declara un estado llamado isLoggedIn y una función para actualizarlo, inicializado en false.
    
    useEffect(() => { // Hook que se ejecuta después de que el componente se monta.
        const token = localStorage.getItem("token"); // Obtiene el token del localStorage.
        setIsLoggedIn(!!token); // Actualiza el estado isLoggedIn basado en la existencia del token.
    }, []); // El array vacío indica que este efecto solo se ejecuta una vez, después del primer renderizado.
    
    const handleLogout = () => { // Define la función handleLogout.
        localStorage.removeItem("token"); // Elimina el token del localStorage.
        setIsLoggedIn(false); // Actualiza el estado isLoggedIn a false.
    };
    
    return ( // Retorna el JSX que define la estructura del componente Navbar.
        <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white py-4 px-6 shadow-lg flex justify-between items-center"> 
            <Link href="/" className="text-lg font-semibold hover:text-gray-300 transition"> 
                Casa 
            </Link>
            <div className="flex items-center space-x-4"> 
                {!isLoggedIn ? ( // Condicional que verifica si el usuario no está logueado.
                    <> 
                        <Link href="/post/user/login"> 
                            <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"> 
                                Login 
                            </button>
                        </Link>
                        <Link href="/post/user/registro" className="hover:text-gray-300 transition"> 
                            Registrar 
                        </Link>
                    </> // Cierra el fragmento React.
                ) : ( // Condicional que verifica si el usuario está logueado.
                    <> 
                        <Link href="/post/user/modificar" className="hover:text-gray-300 transition">
                            Modificar perfil 
                        </Link>
                        <Link href="/post/user/eliminar" className="hover:text-gray-300 transition">
                            Eliminar cuenta 
                        </Link>
                        <button 
                            onClick={handleLogout} // Asigna la función handleLogout al evento onClick del botón.
                            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition" // Estilos del botón de logout.
                        >
                            Cerrar sesión 
                        </button>
                    </> // Cierra el fragmento React.
                )}
            </div> 
        </nav> // Cierra el contenedor del navbar.
    );
}