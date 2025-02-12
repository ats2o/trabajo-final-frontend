"use client"; 
// Indica que este archivo es un componente de cliente en Next.js

import React from "react"; 
// Importa la biblioteca React

export default function Delete() { 
    // Define y exporta una función de componente llamada Delete
    const handleSubmit = async (event) => { 
        // Declara una función asincrónica llamada handleSubmit que se ejecutará al enviar el formulario
        event.preventDefault(); 
        // Previene el comportamiento predeterminado del formulario de recargar la página
        const token = localStorage.getItem('token'); 
        // Obtiene el token almacenado en el localStorage del navegador
        const id = localStorage.getItem('id'); 
        // Obtiene el id almacenado en el localStorage del navegador
        try {
            const response = await fetch(`http://localhost:1234/api/user/${id}`, { 
                // Realiza una solicitud HTTP DELETE a la URL especificada con el id del usuario
                method: 'DELETE', 
                // Especifica que el método de la solicitud es DELETE
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    // Añade el token de autorización en los encabezados de la solicitud
                    'Content-Type': 'application/json' 
                    // Especifica que el contenido de la solicitud es JSON
                }
            });
            if (!response.ok) { 
                // Verifica si la respuesta fue exitosa
                throw new Error('Error en la solicitud'); 
                // Lanza un error si la respuesta no es exitosa
            }
            const data = await response.json(); 
            // Convierte la respuesta de la solicitud a formato JSON
            console.log(data); 
            // Imprime los datos de la respuesta en la consola
        } catch (error) {
            console.error("No está bien", error); 
            // Captura y muestra cualquier error que ocurra durante la solicitud
        }
    };
    return (
        <>
            <div className="eliminar-comercio-container"> 
                <form onSubmit={handleSubmit} className="eliminar-comercio-form"> 
                    <button type="submit" className="eliminar-comercio-button">Eliminar cuenta</button> 
                    {/* Botón para enviar el formulario */}
                </form>
            </div>
        </>
    );
}