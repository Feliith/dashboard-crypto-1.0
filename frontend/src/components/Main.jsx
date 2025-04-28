import React, { useEffect, useState } from "react"
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, ArcElement } from "chart.js";
import { useLocation } from "react-router-dom"
import axios from 'axios'

import Header from "./Header";
import Navbar from "./Navbar"
import Dashboard from "./Dashboard"
import Chart from "./Chart"
import Wallet from "./Wallet"
import News from "./News"
import Login from "./Login"

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, ArcElement);

const Main = () => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [actualPage, setActualPage] = useState("")
    const location = useLocation()

    useEffect(() => {
        axios.get('http://localhost:8000/api/cryptos')
            .then(response => {
                setCryptos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar criptomoedas:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const currentPath = location.pathname

        if (currentPath === "/") {
            setActualPage("Dashboard");
        } else if (currentPath === "/chart") {
            setActualPage("Chart");
        } else if (currentPath === "/wallet") {
            setActualPage("Wallet");
        } else if (currentPath === "/news") {
            setActualPage("News");
        } else if (currentPath === "/login") {
            setActualPage("Login");
        }
    }, [location])

    return (
        <div className="bg-black text-white w-full h-screen">
            <Header currentPage={actualPage} />
            <Navbar currentPage={actualPage}/>
            {actualPage === "Dashboard" && <Dashboard cryptos={cryptos} />}
            {actualPage === "Chart" && <Chart cryptos={cryptos}/>}
            {actualPage === "Wallet" && <Wallet />}
            {actualPage === "News" && <News />}
            {actualPage === "Login" && <Login />}
        </div>
    );
};

export default Main;
