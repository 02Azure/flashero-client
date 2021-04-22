<template>
  <div id="add-page" class="page form-page">
    <h2>Add a New Card</h2>
    <CardForm
      :card="card"
      :decks="decks"
      @returnTo="home"
      @submitForm="addCard"
    />
  </div>
</template>

<script>
import CardForm from '../components/CardForm'

export default {
  name: 'CardAdd',

  created () {
    this.$store.dispatch('getUserDecks')
  },

  data () {
    return {
      card: {
        front: '',
        back: '',
        DeckId: 0
      }
    }
  },

  components: { CardForm },

  computed: {
    decks () {
      return this.$store.state.decks
    }
  },

  methods: {
    home () {
      this.$router.push({ name: 'Home' })
    },

    addCard (card) {
      this.$store.dispatch('addCard', card)
      this.card.front = ''
      this.card.back = ''
    }
  }
}
</script>

<style scoped>
  h2 {
    font-size: 1.9em;
    font-weight: bolder;
  }
</style>
