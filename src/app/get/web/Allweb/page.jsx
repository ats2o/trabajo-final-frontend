import Scoring from "@/app/patch/user/page"; // Importa el componente Scoring
import { useRouter } from "next/navigation"; // Importa useRouter de Next.js para la navegación

export default function AllContentWeb({ web }) {
    const router = useRouter(); // Inicializa el enrutador de Next.js
    // Asegúrate de que 'web' tenga un valor antes de intentar acceder a sus propiedades
    if (!web) {
        return <p>No se encontró información de la web.</p>; // Mensaje de error si 'web' es undefined
    }
    // Guarda el id de la web seleccionada en el localStorage
    localStorage.setItem('idWebSelect', web._id);
    return (
        <>
            <h2 className="title">Toda la info de la web seleccionada</h2>
            <h2 className="subtitle">Título: {web.Titulo}</h2>
            <p className="text">Ciudad de la web: {web.Ciudad}</p>
            <p className="text">Actividad de la web: {web.Actividad}</p>
            <p className="text">Resumen de la web: {web.Resumen}</p>
            <div className="array-section">
                <h3 className="array-title">Texto:</h3>
                <ul className="array-list">
                    {web.Array_textos && web.Array_textos.length > 0 ? (
                        web.Array_textos.map((texto, index) => (
                            <li key={index} className="array-item">{texto}</li>
                        ))
                    ) : (
                        <li className="array-item">No hay textos disponibles.</li>
                    )}
                </ul>
            </div>
            <div className="array-section">
                <h3 className="array-title">Imágenes:</h3>
                <ul className="array-list">
                    {web.Array_imagenes && web.Array_imagenes.length > 0 ? (
                        web.Array_imagenes.map((imagen, index) => (
                            <li key={index} className="array-item">{imagen}</li>
                        ))
                    ) : (
                        <li className="array-item">No hay imágenes disponibles.</li>
                    )}
                </ul>
            </div>
            <Scoring /> {/* Renderiza el componente Scoring */}
        </>
    );
}