<template>
  <div class="follower-user">
    <p class="subtitle">Zaw Linn Naing </p>
    <button :class="{'button' : true, 'following': 'true'}">Follow</button>
  </div>
</template>

<script>
  export default {
    name: "Followers"
  }
</script>

<style scoped>
  button.following {
    background-color: #47494e;
    color: #F5F5F5;
  }

  div.follower-user {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #616161;
    padding: 1rem;
  }
</style>
