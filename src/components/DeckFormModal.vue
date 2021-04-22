<template>
  <div class="modal fade" id="deckformmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Deck Name</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input v-model="name" type="text" required>
        </div>
        <div class="modal-footer">
          <button @click="submitAction()" type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeckForm',

  data () {
    return {
      name: ''
    }
  },

  methods: {
    submitAction () {
      this.$emit('submitAction', this.name)
    }
  }
}
</script>

<style scoped>
  h5 {
    font-weight: bold;
  }
</style>
