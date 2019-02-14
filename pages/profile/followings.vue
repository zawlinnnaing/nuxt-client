<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-header">
          <div v-if="isFollower">
            <h1 class="subtitle" style="padding: 1rem">Followers</h1>
          </div>
          <div v-else>
            <h1 class="subtitle" style="padding: 1rem">Following</h1>
          </div>
        </div>
        <div class="card-content">
          <following v-for="following in followings"
                     :key="following.id"
                     :following="following"
          ></following>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal()"></button>
  </div>
</template>

<script>
  import Following from "../../components/Following";

  export default {
    name: "followings",
    props: ['id', 'isFollower'],
    components: {
      Following,
    },
    data() {
      return {}
    },
    computed: {
      followings() {
        return this.$store.state.user.followings
      }
    },
    created() {
      this.$store.dispatch('user/getFollowing', this.id);
    },
    methods: {
      closeModal() {
        console.log('from button');
        this.$router.push({name: 'profile'});
      }
    }
  }
</script>

<style scoped>

</style>

