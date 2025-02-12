"use client"; // Indica que este archivo es un componente del lado del cliente en Next.js

import React from "react"; // Importa la biblioteca React
import { useRouter } from "next/navigation"; // Importa useRouter de Next.js para la navegación

export default function DeleteWeb() { // Define un componente funcional llamado DeleteWeb
    const router = useRouter(); // Inicializa el hook useRouter para la navegación
    const handleSubmit = async (event) => { // Define una función asincrónica handleSubmit que se ejecuta al enviar el formulario
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        const id = localStorage.getItem('idWeb'); // Obtiene el idWeb del localStorage
        const tokenCif = localStorage.getItem('tokenCif'); // Obtiene el tokenCif del localStorage
        try {
            const response = await fetch(`http://localhost:1234/api/web/${id}`, { // Realiza una solicitud DELETE a la API con el id obtenido
                method: 'DELETE', // Especifica el método HTTP DELETE
                headers: {
                    'Authorization': `Bearer ${tokenCif}`, // Añade el token de autorización en los headers
                    'Content-Type': 'application/json' // Especifica que el contenido de la solicitud es JSON
                },
            });
            if (!response.ok) { // Verifica si la respuesta fue exitosa
                throw new Error('Error en la solicitud'); // Lanza un error si la respuesta no es exitosa
            }
            const data = await response.json(); // Convierte la respuesta a JSON
            console.log(data); // Imprime los datos de la respuesta en la consola
            router.push('/options/web'); // Redirige al usuario después de eliminar la web
        } catch (error) {
            console.error("No está bien", error); // Imprime un mensaje de error en la consola si ocurre un error
        }
    };
    return ( // Retorna el JSX del componente
        <>
            <div className="eliminar-comercio-container"> 
                <form onSubmit={handleSubmit} className="eliminar-comercio-form"> 
                    <button type="submit" className="eliminar-comercio-button">Eliminar web</button>
                </form>
                <button onClick={() => router.push('/options/web')} className="eliminar-comercio-button">Volver atrás</button> 
            </div>
        </>
    );
}