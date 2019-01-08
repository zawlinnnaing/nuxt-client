<template>
  <div class="container column is-9">
    <post v-for="post in posts"
          :key="post.id"
          :post="post"
    ></post>
    <paginator v-if="totalPage > 0"></paginator>
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
      totalPage() {
        return this.$store.state.pagination.totalPage;
      },
      currentPage() {
        return this.$store.state.pagination.currentPage;
      },
      posts() {
        return this.$store.getters['posts/getPosts'](this.currentPage);
      }
    },
    fetch({store, app}) {
      let url = store.state.auth.user.id + '/post';

      // Heat up posts array in store.state
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

