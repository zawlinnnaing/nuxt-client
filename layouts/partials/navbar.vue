<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link
        class="navbar-item"
        to="/">
        <img
          class="navbar-logo"
          src="/images/logo.jpg"
        >
      </nuxt-link>

      <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navMenu"
      class="navbar-menu">
      <div class="navbar-start">
        <nuxt-link
          :to="{name: 'index'}"
          class="navbar-item">
          Home
        </nuxt-link>
        <nuxt-link
          v-if="loggedIn"
          :to="{name: 'posts'}"
          class="navbar-item">
          Your posts
        </nuxt-link>
        <nuxt-link
          :to="{name: 'post-create_post'}"
          class="navbar-item"
          v-if="loggedIn">
          Write a post
        </nuxt-link>
        <nuxt-link
          to="/about"
          class="navbar-item">
          About
        </nuxt-link>
      </div>
      <template v-if="!loggedIn">
        <div class="navbar-end">
          <nuxt-link
            class="navbar-item"
            :to="{name: 'register'}">
            <strong>Sign up</strong>
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            :to="{name: 'login'}">
            Log in
          </nuxt-link>
        </div>
      </template>
      <template v-if="loggedIn">
        <div class="navbar-end">
          <nuxt-link
            class="navbar-item"
            :to="{name: 'profile'}">
            <strong>{{ user.name }}</strong>
          </nuxt-link>
          <a
            class="navbar-item"
            @click.prevent="logout()">
            Log out
          </a>
        </div>
      </template>
    </div>
  </nav>
</template>

<script>

  export default {
    name: 'navbarVue',
    created() {
    },
    methods: {
      logout() {
        let self = this;
        this.$auth.logout()
          .then(() => {
            self.$router.g
            o();
          })
      }
    }
  }
</script>

<style scoped>
  .navbar {
    background-color: #757575;
    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, .5);
    -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, .5);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .5);
  }

  a.navbar-item {
    color: #eeeeee;
  }

  .navbar-item {
    transition: 0.3s ease-in;
    height: 5rem;
  }

  .navbar-item:hover,
  .navbar-item button:hover {
    color: #757575;
    background-color: #eeeeee !important;
  }

  .navbar-item a {
    height: 100%;
    line-height: 4;
    color: #eeeeee;
  }

  .navbar-item a:hover {
    color: #757575 !important;
  }

  .navbar-item button {
    background-color: #757575 !important;
  }

  img.navbar-logo {
    height: 5rem;
    width: auto;
  }

  div.navbar-menu {
    background-color: #757575;
  }
</style>
