<template>
  <div class="container column is-9">
    <post v-for="post in posts"
          :key="post.id"
          :post="post"
    ></post>
    <paginator></paginator>
  </div>
</template>

<script>

  import Post from "../components/post";
  import Paginator from "../layouts/partials/paginator";

  export default {
    head: {
      title: 'Home',
      meta: [{
        content: 'Simple nuxt application by Zaw Linn Naing'
      }]
    },
    components: {Paginator, Post},
    middleware: ['auth', 'activeUser'],
    computed: {
      posts() {
        return this.$store.state.posts.posts;
      }
    },
    fetch({store, app}) {
      let url = store.state.auth.user.id + '/post';
      return app.$axios({
        method: 'get',
        url: url,
      }).then(({data}) => {
        store.dispatch('pagination/setPageInfoAndPosts', data);
      });
    }
  }
</script>

<style>
</style>

