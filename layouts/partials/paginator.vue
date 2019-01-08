<template>
  <div class="pagination is-centered" role="navigation" aria-label="pagination">
    <a class="pagination-previous" v-if="prevPageUrl !== null" @click.prevent="goToNextOrPrev(prevPageUrl)">Previous</a>
    <a class="pagination-next" v-if="nextPageUrl !== null" @click.prevent="goToNextOrPrev(nextPageUrl)">Next page</a>
    <ul class="pagination-list"
        :key="currentPage"
    >
      <li
        v-for="page in totalPage"
        :key="page"
      ><a
        :class="{'pagination-link' : true , 'is-current': page === currentPage}"
        @click.prevent="goToPage(page)">{{ page
        }}</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "paginator",
    data() {
      return {
        forceReRender: true
      }
    },
    computed: {
      nextPageUrl() {
        return this.$store.state.pagination.nextPageUrl;
      },
      prevPageUrl() {
        return this.$store.state.pagination.prevPageUrl;
      },
      currentPage() {
        return this.$store.state.pagination.currentPage;
      },
      totalPage() {
        return this.$store.state.pagination.totalPage;
      }
    },
    methods: {
      goToPage(page) {
        let payload = {
          userId: this.$store.state.auth.user.id,
          page: page,
          token: this.$auth.getToken('local')
        };
        if (this.$store.getters['posts/hasPosts'](page)) {
          this.$store.commit('pagination/setCurrentPage', page);
        } else {
          this.$store.dispatch('pagination/fetchPosts', payload);
        }
      },
      goToNextOrPrev(url) {
        let payload = {
          url: url,
          token: this.$auth.getToken('local')
        };
        this.$store.dispatch('pagination/fetchNextOrPrev', payload);
      }
    }
  }
</script>

<style scoped>

</style>
