import Scoring from "@/app/patch/user/page";
import { useRouter } from "next/navigation";

export default function AllContentWeb({ web }) {
    const router = useRouter()

    localStorage.setItem('idWebSelect', web._id)

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
                            {web.Array_textos.map((texto, index) => (
                                <li key={index} className="array-item">{texto}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="array-section">
                        <h3 className="array-title">Imágenes:</h3>
                        <ul className="array-list">
                            {web.Array_imagenes.map((imagen, index) => (
                                <li key={index} className="array-item">{imagen}</li>
                            ))}
                        </ul>
                    </div>
            <Scoring />
        </>
    );
    
}

