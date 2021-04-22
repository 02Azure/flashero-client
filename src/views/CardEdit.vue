<template>
  <div id="edit-page" class="page form-page">
    <h2>Card Edit</h2>
    <a @click.prevent="deleteCard" class="delete-option" href="">Delete This Card</a>
    <br><br>
    <CardForm
      :card="card"
      :decks="decks"
      @returnTo="deckBrowse()"
      @submitForm="editCard"
    />
  </div>
</template>

<script>
import CardForm from '../components/CardForm'

export default {
  name: 'CardEdit',

  created () {
    this.$store.dispatch('getUserDecks')
    this.$store.dispatch('getCard')
  },

  computed: {
    card () {
      return this.$store.state.card
    },

    decks () {
      return this.$store.state.decks
    },

    returningDeckId () {
      return this.$store.state.returningDeckId
    }
  },

  methods: {
    deckBrowse () {
      this.$router.push({ name: 'DeckCardlist', params: { id: this.returningDeckId } })
    },

    editCard (updatedCard) {
      this.$store.dispatch('editCard', updatedCard)
    },

    deleteCard () {
      this.$store.dispatch('deleteCard', { DeckId: this.card.DeckId })
    }
  },

  components: { CardForm }
}
</script>

<style scoped>
  h2 {
    font-size: 1.9em;
    font-weight: bolder;
  }
</style>
