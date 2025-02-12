"use client"; // Indica que este archivo es un componente del lado del cliente

import { useState, useEffect } from "react"; // Importa useState y useEffect de React
import { useRouter } from "next/navigation"; // Importa useRouter de Next.js para la navegación

export default function VerComercio() { // Define el componente VerComercio
    const [comercio, setComercio] = useState([]); // Declara un estado para almacenar los datos de comercio
    const [click, setClick] = useState(false); // Declara un estado para manejar el clic del botón
    const router = useRouter(); // Inicializa el enrutador de Next.js
    const handleSubmit = async (event) => { // Define la función handleSubmit para manejar el envío del formulario
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        const token = localStorage.getItem('token'); // Obtiene el token del localStorage
        try {
            const response = await fetch('http://localhost:4000/api/comercio/?ordenar=asc', { // Realiza una solicitud GET a la API
                method: 'GET', // Método de la solicitud
                headers: {
                    'Authorization': `Bearer ${token}` // Añade el token en los headers de la solicitud
                },
            });
            if (!response.ok) { // Verifica si la respuesta fue exitosa
                throw new Error('Error en la solicitud'); // Lanza un error si la respuesta no es exitosa
            }
            const data = await response.json(); // Convierte la respuesta a JSON
            console.log(data); // Imprime los datos en la consola
            setComercio(data); // Actualiza el estado con los datos recibidos
        } catch (error) {
            console.error("No está bien", error); // Maneja cualquier error que ocurra durante la solicitud
        }
    };
    const ListComercios = comercio.map(comercio => ( // Mapea los datos de comercio a elementos JSX
        <div key={comercio._id}> 
            <p>Nombre: {comercio.name}</p> 
            <p>Dirección: {comercio.direccion}</p> 
            <p>Email: {comercio.email}</p> 
            <p>Teléfono: {comercio.telefono}</p> 
        </div>
    ));
    return ( // Renderiza el componente
        <>
            <div className="ver-comercios-container"> 
                <form onSubmit={handleSubmit} className="ver-comercios-form"> 
                    <button type="submit" onClick={() => setClick(prev => !prev)} className="ver-comercios-button">Ver comercios</button>
                </form>
                {
                    click && ( // Si se ha hecho clic, muestra la lista de comercios
                        <ul className="ver-comercios-list">
                            {ListComercios.map((comercio, index) => ( // Mapea cada comercio a un elemento de lista
                                <li key={index} className="ver-comercios-item">{comercio}</li> // Elemento de lista para cada comercio
                            ))}
                        </ul>
                    )
                }
                <button onClick={() => router.push('/options/comercio')} className="ver-comercios-button">Volver atrás</button> 
            </div>
        </>
    );
}