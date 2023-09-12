export default {
  // Target: https://go.nuxtjs.dev/config-target
  mode: "universal",

  target: "static",
  buildDir: "dist",
  http: {
    baseURL: process.env.BASEURL, // Update with your API URL
  },
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
  plugins: [{ src: "~/plugins/fontawesome.js", ssr: false }],
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
  fontawesome: {
    component: "Fa",
    suffix: false,
    icons: {
      solid: true,
      brands: true,
    },
  },
  image: {
    // Default values for the image component
    default: {
      quality: 80, // Image quality (0-100)
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxt/http", "@nuxtjs/axios", "@nuxtjs/auth-next", "@nuxt/image"],
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
      logout: "/auth",
      callback: "/auth/callback",
      home: "/",
    },
    strategies: {
      google: {
        clientId: process.env.CLIENT_ID,
        redirectUri: `${process.env.BASEURL}/auth/callback`,
        codeChallengeMethod: "",
        scope: ["profile", "email"],
        responseType: "token id_token",
        endpoints: {
          user: {
            url: "https://www.googleapis.com/oauth2/v3/userinfo",
            method: "get",
          },
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
