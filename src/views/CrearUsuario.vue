<template>
  <div class="user">
    <div class="title">
      Agregar Usuario
    </div>
    <section class="user-name-edit">
      <div class="subtitle">Editar Nombre del Usuario</div>
      <AuthInput
        placeholder="Nombre Completo"
        type="user"
        inputType="text"
        v-model="fullName"
      />
      <AuthInput
        placeholder="Correo Electronico"
        type="user"
        inputType="text"
        v-model="email"
      />

      <AuthInput
        placeholder="Contraseña"
        type="password"
        inputType="text"
        v-model="password"
      />

      <AuthInput
        placeholder="Confirmar Contraseña"
        type="password"
        inputType="text"
        v-model="passwordConfirmation"
      />

      <Button
        type="secondary"
        @click.prevent="submitNewUser"
      >
        Confirmar
      </Button>
    </section>
  </div>
</template>

<script>
import AuthInput from '../components/Auth/AuthInput.vue'
import Button from '../components/Button.vue'

import { mapActions } from 'vuex'

export default {
  name: 'EditarUsuario',
  components: {
    AuthInput,
    Button
  },

  data:() => ({
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }),

  methods: {
    ...mapActions(['registerUser']),
    async submitNewUser() {
      if (this.fullName &&
        this.email &&
        this.password &&
        this.passwordConfirmation) {
        if (this.password === this.passwordConfirmation) {
          await this.registerUser({
            fullName: this.fullName,
            email: this.email,
            password: this.password
          })
          this.$router.push('/')
        } else {
          alert('Las contraseñas no coinciden')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/sass/_main.scss';
  @import '../assets/sass/_mixin.scss';
  @import '../assets/sass/_variables.scss';

  section {
    margin-bottom: 40px;
  }

  .title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 40px;
    @include up_to('md') {
      font-size: 20px;
    }
  }

  .subtitle {
    margin-bottom: 20px;
    font-weight: bold;
  }

</style>