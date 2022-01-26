<template>
  <div class="side-menu">
    <div class="top-menu">
      <header class="logo">
        <img :src="require('../../assets/img/logo.svg')" alt="Logo" class="logo">
      </header>
      <div
        class="mobile-btn"
        @click="openMenu"
      ></div>
      <nav
        :class="{ active: active }"
      >
        <ul class="nav-links" :class="{ active: active }">
          <li class="close" @click="closeMenu">x</li>
          <li class="link" v-for="link in navLinks" :key="link.name">
            <router-link :to="link.path">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
        <button class="btn-logout"
          :class="{ active: active }"
          @click="logoutUser"
        >
          Log Out
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NavBar',
  data: (() => {
    return {
      active: false,
      navLinks: [
        {
          name: 'Calendario',
          path: '/'
        },
        {
          name: 'Mis Reservaciones',
          path: '/reservaciones'
        },
        {
          name: 'Configuración',
          path: '/configuracion'
        }
      ]
    }
  }),



  methods: {
    ...mapActions(['logout']),
    openMenu() {
      this.active = true
    },

    closeMenu() {
      this.active = false
    },

    logoutUser() {
      this.logout()
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../../assets/sass/_main.scss';
  @import '../../assets/sass/_variables.scss';
  @import '../../assets/sass/_mixin.scss';

  .side-menu {
    position: relative;
    flex: 1;
    display: inline-block;
    flex-direction: column;
    box-shadow: 5px 0px 42px rgba(0, 0, 0, 0.08);
    height: 100%;
    text-align: center;
    background-color: #fff;
    @include up_to('md') {
      flex: 2;
    }
  }

  .top-menu {
    width: 100%;
    margin-top: 40px;
  }

  .logo {
    width: 150px;
    margin: 0 auto;
    margin-bottom: 20px;
    @include up_to('lg') {
      width: 75px;
    }
  }

  .nav-links {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .close {
    font-size: 16px;
    cursor: pointer;
    padding: 10px 15px;
    font-weight: lighter;
    display: none;
  }

  .link:hover {
    cursor: pointer;
    transition: background 0.5s ease;
    background: $bg_secondary;
  }

  .link a {
    padding: 20px 0;
    font-size: 18px;
    text-decoration: none;
    color: $font_color;
    display: block;
    height: 100%;
    @include up_to('lg') {
      font-size: 16px;
    }
  }

  .link:hover a {
    color: white;
  }

  .btn-logout {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    font-weight: bold;
    font-size: 18px;
    outline: 0;
    border: none;
    background: none;
    margin-top: 200px;
    margin-bottom: 40px;
    color: $font_color;
    transition: width 0.5s ease;
    @include up_to('lg') {
      font-size: 16px;
    }
  }

  .btn-logout:hover {
    cursor: pointer;
    transition: background 0.5s ease;
    color: white;
    background: $bg_secondary;
  }

  .mobile-btn {
    background-image: url('../../assets/img/mobile-btn.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 30px;
    height: 30px;
    display: none;
  }

  @media screen and (max-width: 768px) {

    .side-menu {
      width: unset;
      height: auto;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      transition: all 0.5s ease;
      box-shadow: 0px 5px 42px rgb(0 0 0 / 8%);
      padding: 10px 15px;
    }

    .top-menu {
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      width: 35px;
      margin: 0;
    }

    nav {
      position: fixed;
      right: 0;
      bottom: 0;
      top: 0;
      text-align: left;
      transition: all 0.5s ease;
      width: 0;
      overflow: hidden;
      background-color: white;
      box-shadow: -5px 0px 42px rgba(0, 0, 0, 0.08);
    }

    .close {
      display: inline-block;
    }

    .link a {
      padding: 20px 15px;
      font-size: 14px;
      transition: all 0.5s ease;
    }

    .btn-logout {
      margin-top: 0;
      padding: 20px 15px;
      font-size: 14px;
      width: 0;
      text-align: left;
    }

    .mobile-btn {
      display: block;
    }

    .active {
      transition: width 0.5s ease;
      width: 200px;
    }

  }

  @media screen and (max-width: 480px) {

    .top-menu {
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      width: 35px;
      margin: 0;
    }

    .mobile-btn {
      display: block;
    }

    .active {
      transition: width 0.5s ease;
      width: 200px;
    }

  }

  @media screen and (max-width: 320px) {
    .active {
      transition: width 0.5s ease;
      width: 150px;
    }
  }

</style>