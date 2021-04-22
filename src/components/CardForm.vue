<template>
  <form @submit.prevent="submitForm()">
    <label for="deck-to-add">Select a Deck:</label><br>
    <select v-model="card.DeckId" id="deck-to-add">
        <option  v-for="deck in decks" :key="deck.id" :value="deck.id">{{deck.name}}</option>
    </select>
    <br><br>

    <label for="front-add">Front:</label><br>
    <textarea v-model="card.front" id="front-add"></textarea>
    <br><br>

    <label for="back-add">Back:</label><br>
    <textarea v-model="card.back" id="back-add"></textarea>
    <br><br>

    <input class = "button-pair btn btn-success" type="submit" value="Submit">
    <button @click="returnTo()" class = "button-pair btn btn-danger">Cancel</button>
  </form>
</template>

<script>
export default {
  name: 'CardForm',

  methods: {
    submitForm () {
      this.$emit('submitForm', { front: this.card.front, back: this.card.back, DeckId: this.card.DeckId })
    },

    returnTo () {
      this.$emit('returnTo')
    }
  },

  props: ['card', 'decks']
}
</script>

<style scoped>
  label {
    font-weight: bold;
  }

textarea {
  font-size: 1.4em;
  font-family: 'Neucha';
  resize: none;
  margin: auto;
  text-align:left;
  width: 50%;
  min-height: 3em;
  background-color: white;
  border: solid black 1px;
}

</style>
