"use client"; // Indica que este archivo es un componente del lado del cliente

import React, { useState } from "react"; // Importa React y useState
import { useRouter } from "next/navigation"; // Importa useRouter de Next.js para la navegación

export default function GetUserCity() {
    const [usersCity, setUsersCity] = useState([]); // Estado para almacenar los usuarios de la ciudad
    const [click, setClick] = useState(false); // Estado para manejar el clic del botón
    const router = useRouter(); // Inicializa el enrutador de Next.js
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        const tokenCif = localStorage.getItem('tokenCif'); // Obtiene el token del localStorage
        try {
            const response = await fetch('http://localhost:4000/api/web/userInteresadoCiudad', {
                method: 'GET', 
                headers: {
                    'Authorization': `Bearer ${tokenCif}` // Añade el token en los headers de la solicitud
                },
            });
            if (!response.ok) { // Verifica si la respuesta fue exitosa
                throw new Error('Error en la solicitud'); // Lanza un error si la respuesta no es exitosa
            }
            const data = await response.json(); // Convierte la respuesta a JSON
            console.log(data); // Imprime los datos en la consola
            setUsersCity(data); // Actualiza el estado con los datos recibidos
        } catch (error) {
            console.error("No está bien", error); // Maneja cualquier error que ocurra durante la solicitud
        }
    };
    const ListaUsersCity = usersCity.map(user => ( // Mapea los datos de usuarios a elementos JSX
        <div key={user._id}>
            <h4>Nombre: {user.nombre}</h4>
            <p>Ciudad: {user.ciudad}</p>
        </div>
    ));
    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <button type="submit" className="btn-primary" onClick={() => setClick((prev) => !prev)}>
                        Ver usuarios de la misma ciudad
                    </button>
                </form>
                {click && ( // Muestra la lista de usuarios solo si se ha hecho clic
                    <ul className="user-list">
                        {ListaUsersCity.length > 0 ? ( // Verifica si hay usuarios para mostrar
                            ListaUsersCity.map((personas) => (
                                <li key={personas.key} className="user-item">
                                    {personas}
                                </li>
                            ))
                        ) : (
                            <li className="user-item">No hay usuarios disponibles.</li> // Mensaje si no hay usuarios
                        )}
                    </ul>
                )}
                <button onClick={() => router.push('/options/web')} className="back-btn">Volver atrás</button>
            </div>
        </>
    );
}