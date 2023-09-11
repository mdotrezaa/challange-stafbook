<template>
  <div>Authenticating with Google...</div>
</template>

<script>
export default {
  auth: false,
  async asyncData({ query, $auth, redirect }) {
    const { code, state } = query;
    console.log("Code:", code);
    console.log("State:", state);
    try {
      await $auth.loginWith("google", {
        code,
        state,
      });
      redirect("/");
    } catch (error) {
      console.error("Google callback error:", error);
    }
  },
};
</script>
