<script setup>
</script>

<template>
  <div class="container">
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
</style>
