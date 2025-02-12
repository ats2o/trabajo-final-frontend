'use client';
import { useRouter } from "next/navigation";

export default function ComercioOptions() {
    const router = useRouter();
    const handleNavigation = (path) => {
        if (router) {
            router.push(path);
        }
    };
    return (
        <div className="admin-options-container">
            <p className="subtitle">Elige una de las siguientes opciones:</p>
            <div className="option-button-container">
                <button onClick={() => handleNavigation('/update/comercio')} className="btn btn-modify">
                    Modificar un Comercio
                </button>
            </div>
            <div className="option-button-container">
                <button onClick={() => handleNavigation('/delete/comercio')} className="btn btn-delete">
                    Eliminar Comercio
                </button>
            </div>
            <div className="option-button-container">
                <button onClick={() => handleNavigation('/get/comercio')} className="btn btn-view">
                    Ver Comercios
                </button>
            </div>
            <div className="option-button-container">
                <button onClick={() => handleNavigation('/post/web')} className="btn btn-create">
                    Crear Web
                </button>
            </div>
        </div>
    );
}
