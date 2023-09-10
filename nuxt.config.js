export default {
  // Target: https://go.nuxtjs.dev/config-target
  mode: "universal",

  target: "static",
  buildDir: "dist",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "TradeApp",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@fortawesome/fontawesome-svg-core/styles.css"],
  plugins: ["~/plugins/fontawesome.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/pwa",
  ],
  serverMiddleware: [{ path: "/api", handler: "~/api/routes/auth/index.js" }],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],
  router: {
    middleware: ["auth"],
    extendRoutes(routes, resolve) {
      routes.push(
        // Your protected routes here
        {
          name: "home",
          path: "/",
          component: resolve(__dirname, "pages/"),
        }
      );
    },
  },
  auth: {
    redirect: {
      login: "/auth",
      logout: "/",
      home: "/",
    },
    strategies: {
      google: {
        clientId: process.env.CLIENT_ID,
        redirectUri: process.env.BASEURL_DEV,
        codeChallengeMethod: "",
        responseType: "code",
        endpoints: {
          token: `${process.env.BASEURL_DEV}/google/callback`, // Route to handle token exchange
          userInfo: `${process.env.BASEURL_DEV}/user/`,
        },
      },
      local: {
        token: {
          property: "token",
          global: true,
          // required: true,
          type: "Bearer",
        },

        endpoints: {
          login: { url: "/api/login", method: "post" },
          user: { url: "/api/user", method: "get", propertyName: false },
        },
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["defu"],
  },
};
