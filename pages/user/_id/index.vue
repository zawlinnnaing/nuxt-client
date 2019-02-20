<template>
  <div class="container column is-6">
    <div class="profile-img">
      <div v-if="other.img_dir">
        <figure class="image profile" :style="{'background-image': 'url('+profileUrl + other.img_dir+')'} ">
          <div class="profile-info">
            <p>{{other.name}}</p>
          </div>
        </figure>
      </div>
      <div v-else>
        <figure class="image profile" :style="{'background-image': 'url('+profileUrl + 'default_profile.png'+')'} ">
          <div class="profile-info">
            <p>{{other.name}}</p>
          </div>
        </figure>
      </div>
    </div>
    <div class="follow-section">
      <div v-if="hasFollowed && getFollowing($route.params.id)">
        <button class="button following" @click="unfollow($route.params.id)">Following</button>
      </div>
      <div v-else>
        <button class="button" @click="follow($route.params.id)">Follow</button>
      </div>
    </div>
    <div class="social-info">
      <div class="numbers">
        <h1 class="title">{{ other.posts_count }}</h1>
        <h1 class="subtitle">posts</h1>
      </div>
      <div class="numbers">
        <h1 class="title">{{ other.followers_count }}</h1>
        <h1 class="subtitle">followers</h1>
      </div>
      <div class="numbers">
        <h1 class="title">{{other.followed_count}}</h1>
        <h1 class="subtitle">following</h1>
      </div>
    </div>
    <hr>
    <div v-if="other.posts_count > 0" class="latest-posts">
      <h1 class="title">Latest posts</h1>
      <post v-for="post in posts"
            :key="post.id"
            :post="post"></post>
    </div>
    <div class="latest-posts" v-else>
      <h1 class="subtitle"> This user has no posts yet. </h1>
    </div>
  </div>
</template>

<script>
  import Post from "~/components/post";
  import UnfollowBtn from "../../../components/buttons/UnfollowBtn";
  import FollowBtn from "../../../components/buttons/FollowBtn";
  import {mapGetters} from 'vuex'

  export default {
    name: "profile",
    middleware: ['isProfile'],
    components: {FollowBtn, UnfollowBtn, Post},
    head() {
      return {
        title: this.other.name
      }
    },
    created() {
      console.log('testing getter');
      console.log(this.getFollowing(this.$route.params.id))
    },
    data() {
      return {
        profileUrl: process.env.profileUrl,
        hasFollowed: false,
      }
    },
    computed: {
      ...mapGetters({
        getFollowing: 'user/getFollowingGetter'
      })
    },
    async asyncData({store, route, error, app}) {
      let id = route.params.id;
      try {
        await store.dispatch('user/getUser', id);
        await store.dispatch('posts/fetchGuestUserPosts', id);
        await store.dispatch('user/getFollowing', app.$auth.user.id);
        return {
          other: store.state.user.other,
          posts: store.state.posts.posts
        }
      } catch (e) {
        // return redirect({name: 'errors-user_not_found'});
        return error({statusCOde: 404, message: 'User not found'})
      }
    },
    methods: {
      async follow(id) {
        if (this.$auth.loggedIn) {
          let payload = {
            follower_id: this.$auth.user.id,
            followed_id: id
          };
          try {
            await this.$store.dispatch('user/follow', payload);
            this.$store.commit('user/increaseOtherFollowCount');
            this.hasFollowed = true;
          } catch (e) {
            alert(e);
          }
        } else {
          this.$router.push({name: 'login'});
        }
      },
      async unfollow(id) {
        if (this.$auth.loggedIn) {
          let payload = {
            follower_id: this.$auth.user.id,
            followed_id: id
          };
          try {
            await this.$store.dispatch('user/unfollow', payload);
            this.$store.commit('user/decreaseOtherFollowCount');
            this.hasFollowed = false;
          } catch (e) {
            alert(e);
          }
        } else {
          this.$router.push({name: 'login'});
        }
      }
    },
  }
</script>

<style scoped>

  .profile {
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
    top: 80%;
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


  div.detail-info {
    margin: 2rem 0;
  }

  div.follow-section {
    text-align: center;
  }
</style>
