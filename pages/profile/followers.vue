<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-header">
          <h1 class="subtitle" style="padding: 1rem">Followers</h1>
        </div>
        <div class="card-content">
          <follower v-for="follower in followers"
                    :key="follower.id"
                    :follower="follower"
          ></follower>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="closeModal()"></button>
  </div>
</template>

<script>
  import Follower from "../../components/Follower";

  export default {
    name: "followers",
    props: ['id'],
    components: {
      Follower
    },
    data() {
      return {}
    },
    computed: {
      followers() {
        return this.$store.state.user.followers
      }
    },
    created() {
      this.$store.dispatch('user/getFollowers', this.id);
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
