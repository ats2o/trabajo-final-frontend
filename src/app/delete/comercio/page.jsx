"use client"; // Indica que este archivo es un componente del lado del cliente en Next.js

import { useRouter } from "next/navigation"; // Importa el hook useRouter de Next.js para la navegación
export default function DeleteComercio() { // Define un componente funcional llamado DeleteComercio
    const router = useRouter(); // Inicializa el hook useRouter para usar la navegación
    const handleSubmit = async (event) => { // Define una función asincrónica llamada handleSubmit que se ejecuta al enviar el formulario
        event.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
        const token = localStorage.getItem('token'); // Obtiene el token de autenticación del almacenamiento local
        const CIF = localStorage.getItem('CIF'); // Obtiene el CIF del almacenamiento local
        try {
            const response = await fetch(`http://localhost:4000/api/comercio/${CIF}`, { // Realiza una solicitud DELETE a la API con el CIF
                method: 'DELETE', // Especifica que el método de la solicitud es DELETE
                headers: {
                    'Authorization': `Bearer ${token}`, // Añade el token de autenticación en los encabezados de la solicitud
                },
            });
            if (!response.ok) { // Verifica si la respuesta fue exitosa
                throw new Error('Error en la solicitud'); // Lanza un error si la respuesta no es exitosa
            }
            const data = await response.json(); // Convierte la respuesta en formato JSON
            console.log(data); // Imprime los datos de la respuesta en la consola
            router.push('/options/comercio'); // Redirige al usuario después de eliminar el comercio
        } catch (error) {
            console.error("No está bien", error); // Imprime un mensaje de error en la consola si ocurre un error
        }
    };
    return (
        <> {/* Fragmento de React */}
            <div className="eliminar-comercio-container"> {/* Contenedor principal con una clase CSS */}
                <form onSubmit={handleSubmit} className="eliminar-comercio-form"> {/* Formulario que llama a handleSubmit al enviarse */}
                    <button type="submit" className="eliminar-comercio-button">Eliminar comercio</button> {/* Botón para enviar el formulario */}
                </form>
                <button onClick={() => router.push('/options/comercio')} className="eliminar-comercio-button">Volver atrás</button> {/* Botón para navegar a otra página */}
            </div>
        </>
    );
}