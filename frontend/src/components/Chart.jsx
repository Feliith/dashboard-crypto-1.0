import { useState } from "react";
import { Pie } from "react-chartjs-2";

function Chart({cryptos}) {

    const [exchangeData, setExchangeData] = useState([
        { exchange: "Binance", trades: 250 },
        { exchange: "Coinbase", trades: 180 },
        { exchange: "Kraken", trades: 150 },
        { exchange: "Bitfinex", trades: 120 },
        { exchange: "Gemini", trades: 80 },
        { exchange: "Bitstamp", trades: 90 },
        { exchange: "OKEx", trades: 60 },
        { exchange: "Huobi", trades: 40 },
        { exchange: "Bittrex", trades: 100 },
        { exchange: "Poloniex", trades: 70 }
    ])

    const generateExchangePieChartData = (exchangeData) => {
        const totalTrades = exchangeData.reduce((acc, item) => acc + item.trades, 0)
        return {
            labels: exchangeData.map(item => item.exchange),
            datasets: [
                {
                label: 'Trades por Exchange',
                data: exchangeData.map(item => (item.trades / totalTrades) * 100),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFB6C1', '#F1A7D0', '#A4E6C0', '#C3F0D1'
                ],
                hoverOffset: 4,
                },
            ],
        }
    }

    const generatePieChartData = (cryptos) => {
        const totalValue = cryptos.reduce((acc, item) => acc + (item.current_price * 10), 0);
        return {
            labels: cryptos.map(item => item.name),
            datasets: [
                {
                label: 'Valor por Moeda (USD)',
                data: cryptos.map(item => ((item.current_price * 10) / totalValue) * 100),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFB6C1', '#F1A7D0', '#A4E6C0', '#C3F0D1'
                ],
                hoverOffset: 4,
                },
            ],
        }
    }

    return (
        <div className="pt-[12vh] pl-[30vh]">
            <div className="bg-gray-100 p-6 mb-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Distribuição de Valor por Moeda (em USD)</h2>
                <div className="mt-4">
                <Pie data={generatePieChartData(cryptos)} />
                </div>
            </div>
            <div className="bg-gray-100 p-6 mb-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Distribuição de Trades por Exchange</h2>
                <div className="mt-4">
                <Pie data={generateExchangePieChartData(exchangeData)} />
                </div>
            </div>
        </div>
    )
}

export default Chart