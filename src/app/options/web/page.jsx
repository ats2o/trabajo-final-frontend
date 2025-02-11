'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ComercioOptions() {
    const router = useRouter()

    return (
        <div className="web-options-container">
            <p className="subtitle">Elige una de las siguientes opciones:</p>

            <div>
                <button onClick={() => router.push('/delete/web')} className="btn btn-delete">
                    Borrar web
                </button>
            </div>

            <br />

            <div>
                <button onClick={() => router.push('/get/web/GetUserCity')} className="btn btn-view-city">
                    Ver usuarios de la misma ciudad
                </button>
            </div>

            <br />

            <div>
                <button onClick={() => router.push('/patch/web')} className="btn btn-upload">
                    Subir imagen
                </button>
            </div>

            <br />

            <div>
                <button onClick={() => router.push('/update/web')} className="btn btn-update">
                    Modificar web
                </button>
            </div>
        </div>
    );

}
