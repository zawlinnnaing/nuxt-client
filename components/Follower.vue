<template>
  <div class="follower-user">
    <p class="subtitle">{{follower.follower_name}} </p>
    <div v-if="follower.followed_by_user">
      <button :class="{'button' : true, 'following': 'true'}" @click="unfollow()">Following</button>
    </div>
    <div v-else>
      <button class="button" @click="follow()">Follow</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Followers",
    props: ['follower'],
    data() {
      return {
        isFollowed: false,
        payload: {
          token: this.$auth.getToken(this.$auth.strategy.name),
          follower_id: this.$auth.user.id,
          followed_id: this.follower.follower_id
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
          this.$store.commit('user/setFollow', this.payload.followed_id);
          this.$store.commit('auth/increaseFollowed');
        } catch (e) {
          alert(e);
        }
      },
      async unfollow() {
        if (confirm('Are you sure')) {
          try {
            await this.$store.dispatch('user/unfollow', this.payload);
            this.$store.commit('user/setUnfollow', this.payload.followed_id);
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


  div.follower-user {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
  }
</style>
