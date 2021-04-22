<template>
  <div id="deck-cardlist-page" class="page">
    <h2>{{ deck.name }} Cards</h2>
    <div id="search-container">
      <input v-model="keyword" id="card-search" type="text" placeholder="Search a card in this deck">
      <button @click="searchCards"><i class="fa fa-search"></i></button>
    </div>
      <router-link :to="{ name: 'DeckDetail', params: { id: deck.id } }"><button class="btn btn-success">Return</button></router-link>
    <br><br>
    <div class="table-container">
      <table id="deck-table">
        <tr id="table-header">
          <th>Front</th>
          <th>Back</th>
          <th>Mastery</th>
          <th>Due</th>
        </tr>
        <tr
          v-for="card in filteredCards"
          :key="card.id"
          @click="toCardDetail(card.id)"
          class="card-row"
        >
          <td>{{ card.front }}</td>
          <td>{{ card.back }}</td>
          <td>{{ card.mastery }}</td>
          <td>{{ card.due }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeckCardList',

  data () {
    return {
      keyword: ''
    }
  },

  created () {
    this.$store.dispatch('getDeck', { DeckId: this.$route.params.id })
  },

  computed: {
    deck () {
      return this.$store.state.deck
    },

    cards () {
      return this.$store.state.cards
    },

    filteredCards () {
      return this.$store.state.filteredCards
    }
  },

  methods: {
    toCardDetail (id) {
      this.$router.push({ name: 'CardEdit', params: { id } })
    },

    searchCards () {
      const cards = this.cards.filter(card => card.front.includes(this.keyword) || card.back.includes(this.keyword))
      this.$store.commit('setFilteredCards', { filteredCards: cards })
    }
  }
}
</script>

<style scoped>
  table {
    min-width: 700px;
  }

  .table-container {
    overflow: auto;
  }

  h2 {
    font-size: 1.9em;
    font-weight: bolder;
  }

</style>
