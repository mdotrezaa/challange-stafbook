<template>
  <div
    class="border border-gray-300 rounded-lg max-w-screen-md mx-auto p-6 min-h-[300px] flex justify-center flex-col gap-6"
  >
    <p>Sign-In Options:</p>
    <button
      class="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2"
      @click="loginWithGoogle"
    >
      <i class="fab fa-google"></i>
      Sign in with Google
    </button>
    <div>
      <form
        @submit.prevent="userLogin"
        class="flex flex-col gap-2 justify-between"
      >
        <div class="flex flex-col gap-2 justify-between">
          <label class="text-sm">Username</label>
          <input
            class="border-2 text-sm rounded-md p-1"
            type="text"
            v-model="login.username"
          />
        </div>
        <div class="flex flex-col gap-2 justify-between">
          <label class="text-sm">Password</label>
          <input
            class="border-2 text-sm rounded-md p-1"
            type="password"
            v-model="login.password"
          />
        </div>
        <div>
          <button
            class="flex items-center w-full justify-center space-x-2 bg-green-500 text-white rounded-lg py-1 px-2 text-sm"
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
