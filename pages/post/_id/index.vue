<template>
  <div class="post">
    <div class="post-title">
      <section class="hero is-primary ">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              {{ post.title }}
            </h1>
          </div>
        </div>
      </section>
    </div>
    <div class="post-body">
      <div class="container column is-9">
        <section class="info-section">
          <p> Author: {{ post.author }}</p>
          <p>Written at: {{ post.created_at }}</p>
        </section>
        <div v-html="post.body"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    head() {
      return {
        title: this.postTitle
      }
    },
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    middleware: ['auth'],
    data() {
      return {
        id: this.$route.params.id
      }
    },
    computed: {
      post() {
        return this.$store.state.posts.post;
      }
    },
    async asyncData({store, app, params}) {
      console.log(params.id);
      let payload = {
        post_id: params.id,
        token: app.$auth.getToken('local')
      };
      await store.dispatch('posts/fetchPost', payload);
      return {postTitle: store.state.posts.post.title}
    }

  }
</script>

<style scoped>
  .info-section {
    padding: 2rem;
    margin: 2rem 0;
    border: 1px solid #424242;
    background-color: #424242;
    color: #eeeeee;
  }
</style>
