<template>
  <footer class="flex items-center w-full justify-center p-5">
    Copyright &copy; {{ year }} Muhammad Reza
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>
