<template>
  <div>
    <h1 class="text-2xl font-semibold mb-4">Stock Data Table</h1>
    <table class="min-w-[400px] divide-y divide-gray-200 text-center">
      <thead>
        <tr>
          <th
            class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Symbol
          </th>
          <th
            class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            Price
          </th>
          <!-- Add more table headers as needed -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(stock, index) in stocks" :key="index">
          <td class="px-6 py-4 whitespace-no-wrap">
            {{ stock.name }}
          </td>
          <td class="px-6 py-4 whitespace-no-wrap">
            <span
              :style="{
                color: getPriceColor(stock.price, previousPrices[index]?.price),
              }"
            >
              {{ stock.price?.toFixed(2) }}
            </span>
          </td>
          <!-- Add more table data cells as needed -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      greeting: "",
      stocks: {},
      previousPrices: {},
    };
  },
  mounted() {
    this.fetchStocks();
    setInterval(this.fetchStocks, 3000); // Poll every 3 seconds
  },
  methods: {
    onNameInput() {
      this.$axios.$get(`/api/hello/${this.name}`).then((response) => {
        this.greeting = response.message;
      });
    },
    fetchStocks() {
      // Make an AJAX request to fetch stock updates
      this.$axios.$get("/api/stocks").then((response) => {
        this.previousPrices = { ...this.stocks };
        this.stocks = response.data;
      });
    },
    getPriceColor(currentPrice, previousPrice) {
      if (currentPrice > previousPrice) {
        return "green"; // Change color to green for price increase
      } else if (currentPrice < previousPrice) {
        return "red"; // Change color to red for price decrease
      } else if (currentPrice < 0) {
        return "red"; // Change color to red for price decrease
      } else {
        return "black"; // Keep color black if price remains the same
      }
    },
  },
};
</script>
