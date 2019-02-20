<template>
  <div class="follower-user">
    <p class="subtitle">{{follower.follower_name}} </p>
    <div v-if="follower.followed_by_user">
      <unfollow-btn :id="follower.follower_id"
                    :isFollowing="false"></unfollow-btn>
    </div>
    <div v-else>
      <follow-btn :id="follower.follower_id"
                  :isFollowing="false"></follow-btn>
    </div>
  </div>
</template>

<script>
  import FollowBtn from "./buttons/FollowBtn";
  import UnfollowBtn from "./buttons/UnfollowBtn";

  export default {
    name: "Followers",
    components: {UnfollowBtn, FollowBtn},
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
  }
</script>

<style scoped>


  div.follower-user {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
  }
</style>
