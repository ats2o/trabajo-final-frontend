'use client'
import { useState } from "react";
import AllContentWeb from "../Allweb/page";
import { useRouter } from "next/navigation";

export default function WebList() {
    const [web, setWeb] = useState([]);
    const [webSelected, setWebSelected] = useState(null);
    const [cityWeb, setCityWeb] = useState("");
    const [currentWebList, setCurrentWebList] = useState([]);
    const [click, setClick] = useState(false);
    const [user, setUser] = useState(false);
    const [admin, setAdmin] = useState(false);
    const router = useRouter();
    const fetchWebData = async () => {
        const role = localStorage.getItem('role');
        if (role === 'admin') {
            setAdmin(true);
        } else if (role === 'user') {
            setUser(true);
        }
        try {
            const response = await fetch("http://localhost:1234/api/web");
            const data = await response.json();
            console.log(data);
            setWeb(data);
            setCurrentWebList(data);
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };
    const handleClick = () => {
        setClick(prev => !prev);
        if (!click) fetchWebData(); // Carga los datos solo si click es falso
    };
    const order = () => {
        const sortedWeb = [...web].sort((a, b) => {
            if (a.resenas_users && b.resenas_users) {
                return b.resenas_users.Scoring - a.resenas_users.Scoring;
            }
            return 0; // Evita errores si no hay datos de puntuación
        });
        setCurrentWebList(sortedWeb);
    };
    const filteredWebList = web.length > 0 
        ? currentWebList.filter(city => city.Ciudad.toLowerCase().includes(cityWeb.toLowerCase())) 
        : [];
    return (
        <div>
            {!webSelected ? (
                <div id="id">
                    <h1 className="title">Lista de las webs</h1> 
                    <button onClick={handleClick}>
                        {click ? "Ocultar webs" : "Ver webs"}
                    </button>
                    {click && (
                        <>
                            <ul>
                                {filteredWebList.map(web => (
                                    <li key={web._id} onClick={() => setWebSelected(web)}>
                                        <h3>Título: {web.Titulo}</h3>
                                        <p>Ciudad: {web.Ciudad}</p>
                                        <p>Actividad: {web.Actividad}</p>
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <label className="label">Filtrar por ciudad: </label>
                                <input 
                                    type="text" 
                                    onChange={(e) => setCityWeb(e.target.value)} 
                                    className="input" 
                                />
                                <br />
                                <button type="button" onClick={order}>Ordenar por puntuación</button>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <AllContentWeb web={webSelected} />
            )}
            {admin && (
                <button onClick={() => router.push('/options/admin')} className="btn-secondary">
                    Volver
                </button>
            )}
            {user && (
                <button onClick={() => router.push('/options/user')} className="btn-secondary">
                    Volver
                </button>
            )}
        </div>
    );
}
