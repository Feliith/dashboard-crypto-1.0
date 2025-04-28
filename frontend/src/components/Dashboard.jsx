import { Line } from "react-chartjs-2";
import { calculateTrend } from "../utils/calculateTrend";
import { Chart as ChartJS, Filler, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import CryptoGraph from "./CryptoGraph";

ChartJS.register(Filler, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard({ cryptos }) {

    const totalValueCoins = (cryptos && Array.isArray(cryptos)) 
        ? cryptos.reduce((acc, crypto) => acc + crypto.current_price * 10, 0)
        : 0;

    const totalBTCValue = totalValueCoins / 94031.90;

    const generateChartData = (prices) => {
        return {
            labels: prices.map((price) => new Date(price.x * 1000).toLocaleTimeString()),
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
        };
    };

    return (
        <div className="absolute flex flex-col items-start justify-between p-[4vh] bottom-0 right-0 rounded-4xl bg-[#080808]" style={{ height: 'calc(100vh - 12vh)', width: 'calc(100% - 30vh)' }}>
            <div className="flex flex-col justify-center text-white text-[3vh]">
                <p className="text-[2.5vh]">Balance:</p>
                <p>
                    <span className="text-[5vh]">${new Intl.NumberFormat('en-US').format(Math.floor(totalValueCoins))}</span>
                    <span className="text-[2.5vh] text-[#404040]">.{totalValueCoins.toFixed(2).split('.')[1]}</span>
                </p>
            </div>
            <div className="grid grid-cols-6 gap-2 w-full">
                {cryptos && Array.isArray(cryptos) && cryptos.map((crypto) => {
                    const { trend, trendPercentage, colorClass } = calculateTrend(crypto.prices || []);

                    return (
                        <div key={crypto.name} className="bg-black text-white flex flex-col justify-between p-[2vh] rounded-3xl shadow-lg">
                            <div>
                                <h2 className="text-xl">{crypto.name}</h2>
                                <h3 className="text-[#404040]">({crypto.symbol})</h3>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex flex-col items-start pb-1 justify-end">
                                    <p className="text-[2.5vh]">
                                        ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(crypto.current_price)}
                                    </p>
                                    <p className="text-[1.6vh]">
                                        <span className={colorClass}>
                                            ({trendPercentage}%)
                                        </span>
                                    </p>
                                </div>
                                <div className="w-[68%] h-full">
                                    <Line 
                                    data={generateChartData(crypto.prices)}
                                    options={{
                                        plugins: {
                                            legend: {
                                                display: false
                                            }
                                        },
                                        scales: {
                                            x: {
                                                ticks: {
                                                    display: false
                                                },
                                                grid: {
                                                    display: false
                                                },
                                                border: {
                                                    display: false
                                                }
                                            },
                                            y: {
                                                ticks: {
                                                    display: false
                                                },
                                                grid: {
                                                    display: false
                                                },
                                                border: {
                                                    display: false
                                                }
                                            }
                                        },
                                        elements: {
                                            line: {
                                                tension: 0.3
                                            },
                                            point: {
                                                radius: 0
                                            }
                                        }
                                    }}/>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <CryptoGraph cryptos={cryptos} />
        </div>
    );
}

export default Dashboard;
