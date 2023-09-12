<template>
  <div class="bg-gray-900 min-h-screen flex items-center justify-center w-full">
    <div class="bg-white rounded-lg p-8 shadow-lg min-w-[400px]">
      <h1 class="text-2xl font-semibold mb-4">Sign In</h1>

      <!-- Sign-in options -->
      <div class="mb-6">
        <button
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          @click="loginWithGoogle"
        >
          <i class="fab fa-google"></i>
          Sign in with Google
        </button>
      </div>

      <!-- Or -->
      <div class="flex items-center mb-4">
        <div class="flex-grow border-t-2 border-gray-300"></div>
        <div class="mx-4 text-gray-500">Or</div>
        <div class="flex-grow border-t-2 border-gray-300"></div>
      </div>

      <!-- Username and Password Form -->
      <form @submit.prevent="userLogin" class="space-y-4">
        <div class="flex flex-col">
          <label for="username" class="text-sm font-semibold">Username</label>
          <input
            id="username"
            class="border border-gray-300 rounded-md p-2"
            type="text"
            v-model="login.username"
            placeholder="johndoe"
          />
        </div>
        <div class="flex flex-col">
          <label for="password" class="text-sm font-semibold">Password</label>
          <input
            id="password"
            class="border border-gray-300 rounded-md p-2"
            type="password"
            v-model="login.password"
            placeholder="john"
          />
        </div>
        <div>
          <button
            class="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-semibold text-sm"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async loginWithGoogle() {
      try {
        await this.$auth.loginWith("google");
        // Redirect the user to the dashboard or any other route on successful login
        this.$router.push("/"); // Redirect to the home page after successful login
      } catch (error) {
        console.error("Error logging in with Google:", error);
      }
    },
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });
        this.$router.push("/");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
