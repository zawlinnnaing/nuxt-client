<template>
  <div class="follower-user">
    <p class="subtitle">{{following.followed_name}} </p>
    <div v-if="following.followed_by_user">
      <unfollow-btn :id="following.followed_id"
                    :isFollowing="true"></unfollow-btn>
    </div>
    <div v-else>
      <follow-btn :id="following.followed_id"
                  :isFollowing="true"></follow-btn>
    </div>
  </div>
</template>

<script>
  import FollowBtn from "./buttons/FollowBtn";
  import UnfollowBtn from "./buttons/UnfollowBtn";

  export default {
    name: "Following",
    components: {UnfollowBtn, FollowBtn},
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
