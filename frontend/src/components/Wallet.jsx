import { useState, useEffect } from "react"
import { useUser } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { calculateTrend } from "../utils/calculateTrend"


function Wallet() {
    const [walletData, setWalletData] = useState(null)
    const [loading, setLoading] = useState(true)

    const { user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8000/api/wallet")
            .then(response => {
                setWalletData(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error("Erro ao carregar carteira:", error)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    if (loading) return <div>Carregando carteira...</div>
    if (!walletData) return <div>Erro ao carregar dados da carteira.</div>

    return (
        <div className="pt-[12vh] pl-[30vh]">
            <h2>Minha Carteira</h2>

            <div>
                <h3>Saldo Total</h3>
                <p>${walletData.total_balance.toFixed(2)}</p>
            </div>

            <div>
                <h3>Meu Portfólio</h3>
                {walletData.portfolio.map((coin, index) => {
                    const { trend, trendPercentage, colorClass } = calculateTrend(coin.prices || [])

                    return (
                        <div key={index}>
                            <h4>{coin.name} ({coin.symbol})</h4>
                            <p>Quantidade: {coin.quantity}</p>
                            <p>Preço atual: ${coin.price.toFixed(2)}</p>
                            <p>Valor Total: ${coin.value.toFixed(2)}</p>
                            <p>
                                <span className={colorClass}>
                                    ({trendPercentage}%)
                                </span>
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Wallet