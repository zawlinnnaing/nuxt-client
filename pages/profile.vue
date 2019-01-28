<template>
  <div class="container">
    <div class="profile-img">
      <div v-if="user.img_dir">
        <img :src="profileUrl + user.img_dir" class="image profile">
      </div>
      <div v-else>
        <img :src="profileUrl + 'default_profile.png'">
      </div>
    </div>
    <div class="info column card">
      <p class="logo">
        <nuxt-link :to="{name: 'user-id', params: {id: user.id }}"><i class="far fa-edit" style="size: 3px"></i>
        </nuxt-link>
      </p>
      <!--<div class="info-content">-->
      <!--<h1 class="subtitle">ID: </h1>-->
      <!--<p>{{ user.id }}</p>-->
      <!--</div>-->
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
    data() {
      return {
        profileUrl: process.env.profileUrl
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

  p.logo {
    text-align: right;
    padding: 1rem 0;
  }
  div.info{
    width: 100%;
  }
  img.profile {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
</style>
