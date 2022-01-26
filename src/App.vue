<template>
  <div id="app" v-if="isLoggedIn">
    <NavBar/>
    <main class="content">
      <Search/>
      <div class="menu-space"></div>
      <router-view/>
    </main>
  </div>
  <div id="app" v-else>
    <main class="content">
      <Login/>
    </main>
  </div>
</template>

<script>

import NavBar from './components/NavBar/NavBar.vue'
import Search from '../src/components/Search.vue'
import Login from '../src/views/Login.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar,
    Search,
    Login
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapGetters(['isLoggedIn'])
  },
};
</script>

<style lang="scss">

  @import '../src/assets/sass/_main.scss';
  @import '../src/assets/sass/_variables.scss';
  @import '../src/assets/sass/_mixin.scss';

  .content {
    flex: 5;
    margin-top: 20px;
    margin-left: 50px;
    margin-right: 50px;
    display: inline-block;
    @include up_to('lg') {
      margin-left: 20px;
      margin-right: 20px;
    }
  }

  body {
    --grey-100: #e4e9f0;
    --grey-200: #cfd7e3;
    --grey-300: #b5c0cd;
    --grey-800: #3e4e63;
    --grid-gap: 1px;
    --day-label-size: 20px;
  }

  .menu-space {
    @include up_to('md') {
      height: 62px;
    }
  }

</style>