<template>
  <div class="post">

    <!--Post title-->
    <div class="post-title">
      <section class="hero is-primary" :style="{'background-color': randomColor}">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              {{ post.title }}
            </h1>
          </div>
        </div>
      </section>
    </div>

    <!-- Post body  -->
    <div class="post-body">
      <div class="container column is-9">
        <section class="info-section">
          <p> Author: {{ post.author }}</p>
          <p>Written at: {{ post.created_at }}</p>
        </section>
        <div v-html="post.body" class="post-content"></div>

        <!--Link Section -->
        <div class="link-section" v-if="isAuthor">
          <nuxt-link :to="{name:'post-update_post-id' , params: {id : post.id }}"
                     class="is-link">Edit Post
          </nuxt-link>
          <a class="is-link" v-if="isActive" @click.prevent="deletePost()">Delete Post</a>
        </div>

        <!-------------------------------------  Showing modal  ------------------------------------->
        <delete-post-modal v-if="showModal"></delete-post-modal>
        <hr>

        <!------------- Comment section ------>
        <div class="comment-section">
          <p class="comment-header">Comment Section</p>
          <comment-form :userId="$auth.user.id" v-if="loggedIn && user.active"></comment-form>
          <div v-else-if="!loggedIn">
            <div class="card login-card">
              <p>Please
                <nuxt-link :to="{ name : 'login'}">Login</nuxt-link>
                or
                <nuxt-link :to="{name: 'register'}"> Sign up</nuxt-link>
                to post comments .
              </p>
            </div>
          </div>
          <div v-else>
            <div class="card login-card">
              Please activate your account to post a comment
            </div>
          </div>
          <div id="comment-section" v-if="comments.length > 0">

            <!------------------------------------- Comment Form  ------------------------------------->
            <comment v-for="comment in comments"
                     :key="comment.id"
                     :comment="comment">
            </comment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Comment from "@/components/comment";
  import CommentForm from "../../../components/CommentForm";
  import DeletePostModal from "../../../components/DeletePostModal";

  export default {
    name: "post",
    components: {DeletePostModal, CommentForm, Comment},
    head() {
      return {
        title: this.postTitle,
        meta: [
          {hid: 'description', name: 'description', content: this.postTitle}
        ],
        link: [
          {src: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro', rel: 'stylesheet'}
        ]
      }
    },
    validate({params}) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    data: function () {
      return {
        id: this.$route.params.id,
        showModal: false
      }
    },
    created() {
      if (this.user.id === undefined) {
        return this.$router.push({name: 'index'});
      }
    },
    computed: {
      post() {
        return this.$store.state.posts.post;
      },
      comments() {
        return this.$store.state.comments.comments;
      },
      isAuthor() {
        return this.post.user_id === this.user.id;
      }
    },

    async asyncData({store, app, params}) {
      let payload = {
        post_id: params.id,
        token: app.$auth.getToken('local')
      };
      await store.dispatch('posts/fetchPost', payload);
      await store.dispatch('comments/fetchComments', payload);

      //Create random color
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return {postTitle: store.state.posts.post.title, randomColor: color}
    },

    methods: {
      async deletePost() {
        let payload = {
          user_id: this.post.user_id,
          post_id: this.id,
          token: this.$auth.getToken('local')
        };
        try {
          await this.$store.dispatch('posts/deletePost', payload);
          this.showModal = true;
          await setTimeout(this.$router.push({name: 'index'}), 5000);
        } catch (e) {
          console.log(e);
        }

      }
    }

  }
</script>

<style scoped>
  .info-section {
    padding: 1rem;
    width: 20vw;
    margin: 1rem 0;
    border: 1px solid #424242;
    background-color: #424242;
    color: #eeeeee;
  }

  .comment-section {
    margin: 2rem 0;
  }

  .comment-header {
    margin: 2rem 0;
    background-color: #BDBDBD;
    text-align: center;
    color: #FAFAFA;
    font-weight: bolder;
    padding: 0.6rem 0;
    font-size: 1.3rem;
  }

  div.post-content {
    font-size: 1.5rem;
    font-family: 'Source Sans Pro', sans-serif;
  }

  .login-card {
    padding: 1rem;
    margin-bottom: 1rem;
  }

  div.link-section {
    margin: 1rem 0;
    text-align: right;
  }

  div.link-section a {
    margin: 0 1rem;
  }
</style>
