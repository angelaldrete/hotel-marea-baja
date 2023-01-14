<template>
  <div class="user">
    <div class="title">
      {{ user.fullName }}
    </div>
    <section class="user-name-edit">
      <div class="subtitle">Editar Correo Electronico</div>
      <AuthInput
        placeholder="Nuevo Correo Electronico"
        type="user"
        inputType="email"
        v-model="newEmail"
      />
      <AuthInput
        placeholder="Confirmar Correo Electronico"
        type="user"
        inputType="email"
        v-model="newEmailConfirmation"
      />

      <Button
        type="secondary"
        @click.prevent="submitNewEmail"
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

import { mapActions } from 'vuex'

export default {
  name: 'EditarUsuario',
  components: {
    AuthInput,
    Button
  },

  data:() => ({
    user: {},
    newPassword: '',
    newPasswordConfirmation: '',
    newEmail: '',
    newEmailConfirmation: '',
  }),

  async mounted() {
    this.user = await this.fetchUserById(this.$route.params.id)
    this.fillUserData();
  },

  methods: {
    ...mapActions(['modifyEmail', 'modifyPassword', 'fetchUserById']),
    async submitNewPassword() {
      if (this.newPassword == this.newPasswordConfirmation) {
        await this.modifyPassword({
          id: this.user._id,
          password: this.newPassword
        })
        alert('El cambio se logro con exito')
        this.$router.push('/configuracion')
      } else {
        alert('Las contraseñas no coinciden')
      }
    },

    async submitNewEmail() {
      if (this.newEmail == this.newEmailConfirmation) {
        this.modifyEmail({
          id: this.user._id,
          email: this.newEmail
        })
        alert('El cambio se logro con exito')
        this.$router.push('/configuracion')
      } else {
        alert('Los correos no coinciden')
      }
    },

    fillUserData() {
      this.newEmail = this.user.email
      this.newEmailConfirmation = this.user.email
    }
  },
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