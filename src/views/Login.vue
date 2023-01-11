<template>
  <div class="login-page">
    <div class="login">
      <img :src="require('../assets/img/logo.svg')" alt="Logo" class="logo">
      <div class="title">
        {{title}}
      </div>
      <form class="login-form">
        <AuthInput
          placeholder="Correo electronico"
          type="user"
          inputType="email"
          v-model="email"
        />
        <AuthInput
          placeholder="Contraseña"
          type="password"
          inputType="password"
          v-model="password"
        />
      </form>
      <Button
        @click.prevent="loginUser"
      >
        Iniciar Sesión
      </Button>
    </div>
  </div>
</template>

<script>
import AuthInput from '../components/Auth/AuthInput.vue'
import Button from '../components/Button.vue'
import { mapActions } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',

  components: {
    AuthInput,
    Button
  },

  data () {
    return {
      title: 'Sistema de Reservaciones',
      email: '',
      password: ''
    }
  },

  methods: {
    ...mapActions(['login']),
    loginUser() {
      if ( this.email && this.password ) {
        this.login({
          email: this.email,
          password: this.password
        })
      } else {
        alert('Ingrese un usuario y contraseña')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/sass/_main.scss';
  @import '../assets/sass/_mixin.scss';
  @import '../assets/sass/_variables.scss';

  .login-page {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login {
    text-align: center;
  }

  .title {
    color: $main_title;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 20px;
    @include up_to('md') {
      font-size: 20px;
    }
  }

</style>