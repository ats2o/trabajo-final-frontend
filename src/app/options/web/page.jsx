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
        <div className="web-options-container">
            <p className="subtitle">Elige una de las siguientes opciones:</p>
            <div className="option-button-container">
                <button onClick={() => handleNavigation('/delete/web')} className="btn btn-delete">
                    Borrar Web
                </button>
            </div>
            <div className="option-button-container">
                <button onClick={() => handleNavigation('/get/web/GetUserCity')} className="btn btn-view-city">
                    Ver Usuarios de la Misma Ciudad
                </button>
            </div>
            <div className="option-button-container">
                <button onClick={() => handleNavigation('/patch/web')} className="btn btn-upload">
                    Subir Imagen
                </button>
            </div>
            <div className="option-button-container">
                <button onClick={() => handleNavigation('/update/web')} className="btn btn-update">
                    Modificar Web
                </button>
            </div>
        </div>
    );
}
