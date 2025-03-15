document.addEventListener("DOMContentLoaded", () => {
    const stocks = {
        stock1: "AAPL", // Apple
        stock2: "ASML", // Microsoft
        stock3: "AMZN"  // Amazon
    };

    async function fetchStockPrice(symbol) {
        try {
            const proxyUrl = "https://corsproxy.io/?url="; // Free CORS proxy
            const apiUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d`;
            const response = await fetch(proxyUrl + apiUrl);
            const data = await response.json();
            if (data.chart && data.chart.result) {
                const price = data.chart.result[0].meta.regularMarketPrice;
                return price ? price.toFixed(2) : "N/A";
            }
        } catch (error) {
            console.error("Error fetching stock data:", error);
            return "N/A";
        }
    }

    async function updateStockPrices() {
        for (const [id, symbol] of Object.entries(stocks)) {
            const price = await fetchStockPrice(symbol);
            document.querySelector(`#${id} .price span`).textContent = price;
        }
    }

    updateStockPrices(); // Initial fetch
    setInterval(updateStockPrices, 10000); // Update every 10 seconds
});
