<template>
  <div class="modal is-active"
       role="dialog"
       aria-labelledby="modalTitle"
       aria-describedby="modalDescription">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <p class="is-success">Your post deleted successfully</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DeletePostModal"
  }
</script>

<style scoped>

</style>
