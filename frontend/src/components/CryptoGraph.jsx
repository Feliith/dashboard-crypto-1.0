import { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import { calculateTrend } from "../utils/calculateTrend"
import { Chart as ChartJS, Filler, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(Filler, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CryptoGraph({ cryptos }) {
    const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0])

    useEffect(() => {
        if (cryptos && cryptos.length > 0) {
            setSelectedCrypto(cryptos[0]);
        }
    }, [cryptos]);

    const handleCryptoChange = (event) => {
        const selected = cryptos.find(crypto => crypto.name === event.target.value);
        setSelectedCrypto(selected);
    };

    const generateChartData = (prices) => {
        return {
            labels: prices.map((_, index) => index),  // ou colocar timestamp se quiser
            datasets: [
                {
                    label: "Preço (USD)",
                    data: prices.map((price) => price.y),
                    borderColor: "rgb(255, 217, 0)",
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;
                        if (!chartArea) return;
                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                        gradient.addColorStop(0, "rgb(255, 236, 129)");
                        gradient.addColorStop(1, "rgba(255, 217, 0, 0)");
                        return gradient;
                    },
                    fill: true,
                    tension: 0.3,
                    borderWidth: 2
                }
            ]
        }
    }

    if (!selectedCrypto) {
        return <div>Carregando gráfico...</div>;
    }

    return (
        <div className="bg-black p-[2vh] rounded-3xl h-[58%] w-[48%]">
            <div>
                <select
                    onChange={handleCryptoChange}
                    value={selectedCrypto.name}
                    className="">
                        {cryptos.map((crypto) => (
                            <option key={crypto.name} value={crypto.name}>
                                {crypto.name} ({crypto.symbol})
                            </option>
                        ))}
                </select>
            </div>
            <div>
                <Line 
                    data={generateChartData(selectedCrypto.prices)}
                    options={{
                        elements: {
                            line: {
                                tension: 0.3
                            },
                            point: {
                                radius: 0
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default CryptoGraph