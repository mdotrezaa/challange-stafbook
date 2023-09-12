const app = require("../../app");

const stocks = [
  { name: "AAPL", price: 150.25, timestamp: Date.now() },
  { name: "GOOGL", price: 2800.75, timestamp: Date.now() },
  { name: "MSFT", price: 305.45, timestamp: Date.now() },
  { name: "AMZN", price: 3400.6, timestamp: Date.now() },
  { name: "TSLA", price: 750.0, timestamp: Date.now() },
  { name: "FB", price: 350.15, timestamp: Date.now() },
  { name: "NFLX", price: 560.2, timestamp: Date.now() },
  { name: "NVDA", price: 225.8, timestamp: Date.now() },
  { name: "CRM", price: 250.3, timestamp: Date.now() },
  { name: "JPM", price: 170.5, timestamp: Date.now() },
  // Add more stocks here as needed
];

function simulatePriceChange() {
  // Choose a random index in the stocks array
  const randomIndex = Math.floor(Math.random() * stocks.length);

  // Generate a random price change between -10 and 10
  const priceChange = Math.random() * (10 - -10) + -10;

  // Update the price of the selected stock
  stocks[randomIndex].price += priceChange;
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
