<template>
  <div>
    <button class="button following" @click="unfollow()">Following</button>
  </div>
</template>

<script>
  export default {
    name: "UnfollowBtn",
    props: ['id', 'isFollowing'],
    methods: {
      async unfollow() {
        if (this.$auth.loggedIn) {
          let payload = {
            token: this.$auth.getToken(this.$auth.strategy.name),
            follower_id: this.$auth.user.id,
            followed_id: this.id
          };
          if (confirm('Are you sure')) {
            try {
              await this.$store.dispatch('user/unfollow', payload);
              if (this.isFollowing) {
                this.$store.commit('user/setUnfollowing', payload.followed_id);
              } else {
                this.$store.commit('user/setUnfollow', payload.followed_id);
              }
              this.$store.commit('auth/decreaseFollowed');
            } catch (e) {
              alert(e);
            }
          }
        } else {
          this.$router.push({name: 'login'})
        }
      }
    }
  }
</script>

<style scoped>

</style>
