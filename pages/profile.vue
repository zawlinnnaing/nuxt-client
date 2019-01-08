<template>
  <div class="container">
    <div class="info column is-4 card">
      <div class="info-content">
        <h1 class="subtitle">ID: </h1>
        <p>{{ user.id }}</p>
      </div>
      <div class="info-content">
        <h1 class="subtitle">Name: </h1>
        <p>{{ user.name }}</p>
      </div>
      <div class="info-content">
        <h1 class="subtitle">Email: </h1>
        <p>{{ user.email }}</p>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "profile",
    middleware: 'auth',
    head() {
      return {
        title: this.name
      }
    },
    async asyncData({store, app}) {
      await app.$auth.fetchUser();
      return {name: app.$auth.user.name}
    }
  }
</script>

<style scoped>
  .info-content {
    display: flex;
    justify-content: space-between;
  }
</style>
