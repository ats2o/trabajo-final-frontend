"use client"
import { use, useEffect, useState } from "react";
import AllContentWeb from "../Allweb/page";
import { useRouter } from "next/navigation";
// import Filter from "./Filter";

export default function WebList() {

    const [web, setWeb] = useState([]);
    const [webSelected, setWebSelected] = useState();
    const [cityWeb, setCityWeb] = useState("");
    const [currentWebList, setCurrentWebList] = useState([])
    const [click, setClick] = useState(false)
    const [user, setUser] = useState(false)
    const [admin, setAdmmin] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const role = localStorage.getItem('role')
        if (role === 'admin') {
            setAdmmin(true)
        } else if (role === 'user') {
            setUser(true)
        }

        try {
            const response = await fetch("http://localhost:4000/api/web")
            const data = await response.json()
            console.log(data)
            setWeb(data)
            setCurrentWebList(data)

        } catch (error) {
            console.error("No está bien", error)
        }
    }

    const order = () => {
        const sortedWeb = [...web].sort(
            (a, b) => b.resenas_users.Scoring - a.resenas_users.Scoring
        )
        setCurrentWebList(sortedWeb);
    }

    const filter = currentWebList.filter((city) =>
        city.Ciudad.toLowerCase().includes(cityWeb.toLowerCase())
    )

    const ListWeb = filter.map(web => (
        <div key={web._id}>
            <h3 onClick={() => setWebSelected(web)}>Titulo: {web.Titulo}</h3>
            <p>Ciudad de la web: {web.Ciudad}</p>
            <p>Actividad de la web: {web.Actividad}</p>
        </div>
    ))

    return (
    <div>
        <form onSubmit={handleSubmit}>
            {!webSelected ? (
                <div id="id">
                    <h1 className="title">Lista de las webs</h1> 
                    <button onClick={() => setClick(prev => !prev)}>Ver webs</button>

                    {click && (
                        <ul>
                            {ListWeb.map((web, index) => (
                                <li key={index}>{web}</li>
                            ))}
                        </ul>
                    )}

                    {click && (
                        <div>
                            <label className="label">Filtrar por ciudad: </label>
                            <input 
                                type="text" 
                                onChange={(e) => setCityWeb(e.target.value)} className="input" 
                            />
                            <br />
                            <button type="button" onClick={order}>Ordena la página</button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <AllContentWeb web={webSelected} />
                </div>
            )}
        </form>

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

