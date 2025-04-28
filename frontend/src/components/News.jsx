import { useState, useEffect } from "react"
import axios from "axios"

function News() {
    const [news, setNews] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8000/api/news')
        .then(response => {
            setNews(response.data || []);
            setLoading(false);
        })
        .catch(error => {
            console.error('Erro ao buscar notícias:', error);
            setLoading(false);
        });
    }, [])

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="pt-[12vh] pl-[30vh]">
            <h2>Últimas Notícias de Criptomoedas</h2>
            {news.map((item, index) => (
                <div key={index}>
                    <h3>{item.title}</h3>
                    <img src={item.image_url} alt={item.title} />
                    <p>{item.text}</p>
                    <a href={item.news_url} target="_blank" rel="noopener noreferrer">
                        Leia mais
                    </a>
                </div>
            ))}
        </div>
    )
}

export default News