const app = require("../../app");

const stocks = [
  { name: "AAPL", price: 150.25 },
  { name: "GOOGL", price: 2800.75 },
  { name: "MSFT", price: 305.45 },
  { name: "AMZN", price: 3400.6 },
  { name: "TSLA", price: 750.0 },
  { name: "FB", price: 350.15 },
  { name: "NFLX", price: 560.2 },
  { name: "NVDA", price: 225.8 },
  { name: "CRM", price: 250.3 },
  { name: "JPM", price: 170.5 },
  // Add more stocks here as needed
];
function simulatePriceChange() {
  for (const symbol in stocks) {
    stocks[symbol].price += Math.random() * (10 - -10) + -10;
  }
}

// Middleware to simulate price changes on each request
app.use((req, res, next) => {
  simulatePriceChange();
  next();
});
app.get("/api/stocks", (req, res) => {
  res.status(200).json({ data: stocks });
});

app.get("/api/stocks/:name", (req, res) => {
  res.status(200).send({
    message: `Hello, ${req.params.name}`,
  });
});

module.exports = app;
