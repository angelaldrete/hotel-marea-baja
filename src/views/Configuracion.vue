<template>
  <div class="configuracion">
    <section class="password">
      <div class="title">Cambiar Contraseña</div>
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

    <section class="users">
      <div class="title">Usuarios</div>
      <User
        v-for="(user, index) in allUsers"
        :key="index"
        :name="user.fullName"
        :id="user.id"
      />
      <AddButton
        @click.prevent="$router.push('/crear-usuario')"
      >
        Agregar Usuario
      </AddButton>
    </section>
  </div>
</template>

<script>
import AuthInput from '../components/Auth/AuthInput.vue'
import Button from '../components/Button.vue'
import User from '../components/Auth/User.vue'
import AddButton from '../components/AddButton.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Configuracion',
  components: {
    AuthInput,
    Button,
    AddButton,
    User
  },

  data:() => ({
    newPassword: '',
    newPasswordConfirmation: '',
  }),

  methods: {
    ...mapActions(['getUsers', 'getUser', 'modifyPassword']),
    async submitNewPassword() {
      if ( this.newPassword != '' && this.newPasswordConfirmation != '' ) {
        if ( this.newPassword == this.newPasswordConfirmation ) {
          await this.modifyPassword({
            password: this.newPassword
          })
          this.$router.push('/')
        } else {
          alert('Las contraseñas no coinciden')
        }
      } else {
        alert('No puedes dejar campos vacíos')
      }
    },
  },

  computed: {
    ...mapGetters(['allUsers', 'theUser']),
  },

  created() {
    this.getUsers()
    this.getUser()
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/sass/_main.scss';
  @import '../assets/sass/_mixin.scss';
  @import '../assets/sass/_variables.scss';

  .configuracion {
    width: 100%;
  }

  .password {
    margin-bottom: 60px;
    width: 100%;
    .title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 20px;
      color: $calendar_font_color;
      width: 100%;
      @include up_to('md') {
        font-size: 20px;
      }
    }
  }

  .users {
    margin-bottom: 20px;
    width: 100%;
    .title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 20px;
      color: $calendar_font_color;
      @include up_to('md') {
        font-size: 20px;
      }
    }
  }


</style>