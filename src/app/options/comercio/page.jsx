'use client';
import { useRouter } from "next/navigation";

export default function ComercioOptions() {
    const router = useRouter()
    return (
        <div className="admin-options-container">
            <p className="subtitle">Elige una de las siguientes opciones:</p>
            <div className="option-button-container">
                <button onClick={() => router.push('/update/comercio')} className="btn btn-modify" >
                    Modifica un comercio
                </button>
            </div>
            <div className="option-button-container">
                <button onClick={() => router.push('/delete/comercio')} className="btn btn-delete">
                    Eliminar Comercio
                </button>
            </div>
            <div className="option-button-container">
                <button onClick={() => router.push('/get/comercio')} className="btn btn-view">
                    Ver Comercios
                </button>
            </div>
            <div className="option-button-container">
                <button onClick={() => router.push('/post/web')} className="btn btn-create">
                    Crear web
                </button>
            </div>
        </div>
    );
    
}
