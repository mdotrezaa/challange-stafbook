<template>
  <nav class="border-gray-200 px-3 sm:px-4 py-5 bg-gray-900">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <div class="flex items-center">
        <NuxtLink to="/" class="flex items-center">
          <span
            class="self-center text-xl font-semibold whitespace-nowrap text-white"
            >Trading</span
          >
        </NuxtLink>
      </div>
      <div class="text-white">
        <template v-if="$auth.loggedIn">
          <span>Welcome, {{ $auth.user.username || $auth.user.name }}!</span>
          <span @click="logout">Logout</span></template
        >
        <span v-else>
          <!-- You can add login or registration links here -->
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/auth");
    },
  },
};
</script>
