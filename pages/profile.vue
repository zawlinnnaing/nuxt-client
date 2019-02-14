<template>
  <div class="container column is-6">

    <div class="profile-img">
      <div v-if="user.img_dir">
        <figure class="image profile" :style="{'background-image': 'url('+profileUrl + user.img_dir+')'} ">
          <div class="profile-info">
            <p>{{user.name}}</p>
            <p>{{ user.email }}</p>
            <nuxt-link :to="{name: 'edit_profile-id', params: {id: user.id }}"><i class="far fa-edit"
                                                                                  style="size: 3px"></i>
            </nuxt-link>
          </div>
        </figure>
      </div>
      <div v-else>
        <figure class="image profile" :style="{'background-image': 'url('+profileUrl + 'default_profile.png'+')'} ">
          <div class="profile-info">
            <p>{{user.name}}</p>
            <p>{{ user.email }}</p>
            <nuxt-link :to="{name: 'edit_profile-id', params: {id: user.id }}"><i class="far fa-edit"
                                                                                  style="size: 3px"></i>
            </nuxt-link>
          </div>
        </figure>
      </div>
    </div>
    <div class="social-info">
      <div class="numbers">
        <h1 class="title">{{ user.posts_count }}</h1>
        <h1 class="subtitle">posts</h1>
      </div>
      <div class="numbers">
        <nuxt-link :to="{name: 'profile-followers'} ">
          <h1 class="title">{{ user.followers_count }}</h1>
          <h1 class="subtitle">followers</h1>
        </nuxt-link>
      </div>
      <div class="numbers">
        <nuxt-link :to="{name: 'profile-followings' }">
          <h1 class="title">{{user.followed_count}}</h1>
          <h1 class="subtitle">following</h1>
        </nuxt-link>
      </div>
    </div>
    <hr>
    <!--Follower information section-->
    <nuxt-child :id="user.id"></nuxt-child>
    <div v-if="user.posts_count > 0" class="latest-posts">
      <h1 class="title">Latest posts</h1>
      <post v-for="post in posts"
            :key="post.id"
            :post="post"></post>
    </div>
    <div class="latest-posts" v-else>
      <h1 class="title">You have no posts yet</h1>
    </div>
  </div>
</template>

<script>
  import Followers from "../components/Follower";
  import Post from "../components/post";

  export default {
    name: "profile",
    components: {Post, Followers},
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
      let payload = {
        userId: app.$auth.user.id,
        page: 1,
        token: app.$auth.getToken('local')
      };
      await store.dispatch('pagination/fetchPosts', payload);
      return {
        name: app.$auth.user.name,
        posts: store.state.posts.posts
      }
    }
  }
</script>

<style scoped>

  .profile {;
    background-position: center;
    background-size: cover;
    height: 300px;
    width: 300px;
    margin: auto !Important;
    border-radius: 50%;
    overflow: hidden;
  }

  div.profile-img {
    margin: 2rem 0;
  }

  div.profile-info {
    position: absolute;
    top: 70%;
    height: 100%;
    width: 100%;
    padding-top: 0.3rem;
    background: rgba(0, 0, 0, 0.5);
    color: #F5F5F5;
    text-align: center;
  }

  i.fa-edit {
    opacity: 0;
    transition: opacity 0.3s ease-in;
    color: #F5F5F5;
  }

  .profile-info:hover i.fa-edit {
    opacity: 100;
  }

  div.numbers {
    text-align: center;
    width: 100%;
  }

  div.social-info {
    margin: 2rem 0 !important;
  }

  div.social-info div.numbers:first-child {
    border-right: 1px solid #47494e;
  }

  div.social-info div.numbers:last-child {
    border-left: 1px solid #47494e;
  }

  div.social-info {
    display: flex;
    justify-content: space-evenly;
  }

  div.follower-section {
    padding: 1rem;
  }

  div.follower-user:last-child {
    border-bottom: 1px solid white;
  }

  div.detail-info {
    margin: 2rem 0;
  }

</style>
