
export function calculateTrend(prices = []) {
    if (!Array.isArray(prices) || prices.length < 2) {
      return { trend: "=", trendPercentage: 0, colorClass: "text-gray-600" };
    }
  
    const last = prices[prices.length - 1].y;
    const previous = prices[prices.length - 2].y;
  
    const difference = last - previous;
    const trendPercentage = ((difference) / previous) * 100;
    const trend = difference > 0 ? "+" : difference < 0 ? "-" : "=";
    const colorClass = trend === "+" ? "text-green-600" : trend === "-" ? "text-red-600" : "text-gray-600"

    return {
      trend,
      trendPercentage: parseFloat(trendPercentage.toFixed(2)),
      colorClass,
    };
  }
  