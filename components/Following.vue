<template>
  <div class="follower-user">
    <p class="subtitle">{{following.followed_name}} </p>
    <div v-if="following.followed_by_user">
      <button :class="{'button' : true, 'following': 'true'}" @click="unfollow()">Following</button>
    </div>
    <div v-else>
      <button class="button" @click="follow()">Follow</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Following",
    props: ['following'],
    data() {
      return {
        isFollowed: false,
        payload: {
          token: this.$auth.getToken(this.$auth.strategy.name),
          follower_id: this.$auth.user.id,
          followed_id: this.following.followed_id
        }
      }
    },

    methods: {
      async follow() {
        // let payload = {
        //   token: this.$auth.getToken(this.$auth.strategy.name),
        //   follower_id: this.$auth.user.id,
        //   followed_id: follower_id,
        // };
        try {
          await this.$store.dispatch('user/follow', this.payload);
          this.$store.commit('user/setFollowing', this.payload.followed_id);
          this.$store.commit('auth/increaseFollowed');
        } catch (e) {
          alert(e);
        }
      },
      async unfollow() {
        if (confirm('Are you sure')) {
          try {
            await this.$store.dispatch('user/unfollow', this.payload);
            this.$store.commit('user/setUnfollowing', this.payload.followed_id);
            this.$store.commit('auth/decreaseFollowed');
          } catch (e) {
            alert(e);
          }
        }
      }
    }
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
    padding: 0.5rem;
  }
</style>
