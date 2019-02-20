<template>
  <div>
    <button class="button" @click="follow()">Follow</button>
  </div>
</template>

<script>
  export default {
    name: "FollowBtn",
    props: ['id', 'isFollowing'],
    methods: {
      async follow() {
        if (this.$auth.loggedIn) {
          let payload = {
            follower_id: this.$auth.user.id,
            followed_id: this.id
          };
          try {
            await this.$store.dispatch('user/follow', payload);
            if (this.isFollowing) {
              this.$store.commit('user/setFollowing', payload.followed_id);
            } else {
              this.$store.commit('user/setFollow', payload.followed_id);
            }
            this.$store.commit('auth/increaseFollowed');
          } catch (e) {
            alert(e);
          }
        } else {
          this.router.push({name: 'login'})
        }
      }
    }
  }
</script>

<style scoped>

</style>
