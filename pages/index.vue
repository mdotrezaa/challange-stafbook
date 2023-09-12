<template>
  <div class="flex items-center justify-center p-5 gap-5">
    <table class="min-w-[500px] divide-y divide-gray-200 text-center">
      <thead>
        <tr>
          <th
            v-for="header in tableHeaders"
            :key="header.key"
            :class="header.classes"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(stock, index) in stocks"
          :key="index"
          :style="getRowStyle(stock.price, previousPrices[index]?.price)"
        >
          <td class="px-6 py-4 whitespace-no-wrap">{{ stock.name }}</td>
          <td class="px-6 py-4 whitespace-no-wrap relative">
            <span>
              {{ formatPrice(stock.price) }}
              <font-awesome-icon
                :icon="getPriceIcon(stock.price, previousPrices[index]?.price)"
                class="absolute right-0 top-1/2 transform -translate-y-1/2 px-2"
              />
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
  computed: {
    tableHeaders() {
      return [
        {
          key: "symbol",
          label: "Symbol",
          classes:
            "px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider",
        },
        {
          key: "price",
          label: "Price",
          classes:
            "px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider",
        },
      ];
    },
  },
  mounted() {
    console.log(this.$auth);
    this.fetchStocks();
    setInterval(this.fetchStocks, 3000); // Poll every 3 seconds
  },
  methods: {
    fetchStocks() {
      this.$axios.$get("/api/stocks").then((response) => {
        const timestamp = Date.now();
        this.previousPrices = { ...this.stocks };
        this.stocks = { ...response.data, timestamp };
      });
    },
    formatPrice(price) {
      return price?.toFixed(2);
    },
    getRowStyle(currentPrice, previousPrice) {
      const priceColor = this.getPriceColor(currentPrice, previousPrice);
      return {
        color: priceColor,
        background: this.getRowColor(currentPrice, previousPrice),
      };
    },
    getPriceIcon(currentPrice, previousPrice) {
      const icon = this.getIcon(currentPrice, previousPrice);
      return icon ? `fa-solid fa-arrow-trend-${icon}` : "";
    },
    getPriceColor(currentPrice, previousPrice) {
      if (currentPrice > previousPrice || currentPrice < 0) {
        return "green"; // Change color to green for price increase or negative price
      } else if (currentPrice < previousPrice) {
        return "red"; // Change color to red for price decrease
      } else {
        return "black"; // Keep color black if price remains the same
      }
    },
    getRowColor(currentPrice, previousPrice) {
      if (currentPrice > previousPrice || currentPrice < 0) {
        return "#b4ffb3"; // Change color to green for price increase or negative price
      } else if (currentPrice < previousPrice) {
        return "#ffb3b3"; // Change color to red for price decrease
      } else {
        return "white"; // Keep color white if price remains the same
      }
    },
    getIcon(currentPrice, previousPrice) {
      if (currentPrice > previousPrice || currentPrice < 0) {
        return "up"; // Use 'up' icon for price increase or negative price
      } else if (currentPrice < previousPrice) {
        return "down"; // Use 'down' icon for price decrease
      } else {
        return ""; // No icon if price remains the same
      }
    },
  },
};
</script>
