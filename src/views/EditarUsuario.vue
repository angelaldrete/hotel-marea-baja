<template>
  <div class="user">
    <div class="title">
      Usuario - {{ theUser.fullName }}
    </div>
    <section class="user-name-edit">
      <div class="subtitle">Editar Nombre del Usuario</div>
      <AuthInput
        placeholder="Nuevo Nombre de Usuario"
        type="password"
        inputType="text"
        v-model="newUsername"
      />
      <AuthInput
        placeholder="Confirmar Nombre de Usuario"
        type="password"
        inputType="text"
        v-model="newUsernameConfirmation"
      />

      <Button
        type="secondary"
        @click.prevent="submitNewUsername"
      >
        Confirmar
      </Button>
    </section>
    <section class="change-password">
      <div class="subtitle">Editar contraseña del usuario</div>
      <AuthInput
        placeholder="Nueva Contraseña"
        type="password"
        inputType="password"
        v-model="newPassword"
      />
      <AuthInput
        placeholder="Confirmar Contraseña"
        type="password"
        inputType="password"
        v-model="newPasswordConfirmation"
      />

      <Button
        type="secondary"
        @click.prevent="submitNewPassword"
      >
        Confirmar
      </Button>
    </section>
  </div>
</template>

<script>
import AuthInput from '../components/Auth/AuthInput.vue'
import Button from '../components/Button.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditarUsuario',
  components: {
    AuthInput,
    Button
  },

  data:() => ({
    newPassword: '',
    newPasswordConfirmation: '',
    newUsername: '',
    newUsernameConfirmation: '',
  }),

  created() {
    this.getUser()
  },

  methods: {
    ...mapActions(['getUser', 'modifyUsername', 'modifyPassword']),
    async submitNewPassword() {
      if (this.newPassword == this.newPasswordConfirmation) {
        const res = await this.modifyPassword({
          id: this.theUser._id,
          password: this.newPassword
        })

        console.log(res)
      } else {
        alert('Las contraseñas no coinciden')
      }
    },

    async submitNewUsername() {
      if (this.newUsername == this.newUsernameConfirmation) {
        this.modifyUsername({
          id: this.theUser._id,
          username: this.newUsername
        })
      } else {
        alert('Los nombres de usuario no coinciden')
      }
    }
  },

  computed: {
    ...mapGetters(['theUser'])
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