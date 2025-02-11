"use client" // Indica que este archivo es un componente del lado del cliente en Next.js
import React from "react"; // Importa la biblioteca React
// import { useState, useEffect } from "react"; // Importa useState y useEffect de React (comentado porque no se usa)
import { useRouter } from "next/navigation"; // Importa useRouter de Next.js para la navegación

export default function DeleteWeb() { // Define un componente funcional llamado DeleteWeb
    const router = useRouter() // Inicializa el hook useRouter para la navegación
    const handleSubmit = async (event) => { // Define una función asincrónica handleSubmit que se ejecuta al enviar el formulario
        event.preventDefault() // Previene el comportamiento por defecto del formulario
        const id = localStorage.getItem('idWeb') // Obtiene el idWeb del localStorage
        const tokenCif = localStorage.getItem('tokenCif') // Obtiene el tokenCif del localStorage
        try {
            const response = await fetch(`http://localhost:4000/api/web/${id}`, { // Realiza una solicitud DELETE a la API con el id obtenido
                method: 'DELETE', // Especifica el método HTTP DELETE
                headers: {
                    'Authorization': `Bearer ${tokenCif}` // Añade el token de autorización en los headers
                },
            })
            const data = await response.json() // Convierte la respuesta a JSON
            console.log(data) // Imprime los datos de la respuesta en la consola
        } catch (error) {
            console.error("No está bien", error) // Imprime un mensaje de error en la consola si ocurre un error
        }
    }
    return ( // Retorna el JSX del componente
        <>
            <div className="eliminar-comercio-container"> 
                <form onSubmit={handleSubmit} className="eliminar-comercio-form"> 
                    <button type="submit" className="eliminar-comercio-button">Elimina web</button>
                </form>
                <button onClick={() => router.push('/options/web')} className="eliminar-comercio-button">Volver atras</button> 
            </div>
        </>
    )
}