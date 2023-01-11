<template>
  <div
    class="search"
  >
    <span
      class="icon"
    ></span>
    <input
      type="text"
      class="searchbar"
      placeholder="Buscar cliente"
      v-model="search"
      @keyup.enter="searchClient"
    >
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Search',
  data:() => ({
    search: ''
  }),

  methods: {
    searchClient() {
      this.$emit('search', this.search)
    },
  },

  mounted() {
    this.$on('search', (search) => {
      this.$router.push(`/buscar-usuario/${search}`)
    })
  }

}
</script>

<style lang="scss" scoped>

  @import '../assets/sass/_main.scss';
  @import '../assets/sass/_mixin.scss';
  @import '../assets/sass/_variables.scss';

  .search {
    display: flex;
    align-items: center;
    background: $background;
    border-radius: 30px;
    padding: 10px;
    width: 250px;
    margin-bottom: 40px;
    @include up_to('md') {
      display: none;
    }
  }

  .icon {
    @include icon('../assets/img/search.svg', 15px);
    flex: 1;
  }

  .searchbar {
    @include input_reset_defaults;
    color: $font_color;
    flex: 4;
    font-size: 14px;
  }

</style>