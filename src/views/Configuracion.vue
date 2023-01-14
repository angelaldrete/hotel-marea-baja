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
      <Loading v-if="loading"/>
      <User
        v-else
        v-for="user in allUsers"
        :key="user._id"
        :name="user.fullName"
        :id="user._id"
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
import Loading from '../components/Loading.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Configuracion',
  components: {
    AuthInput,
    Button,
    AddButton,
    User,
    Loading
  },

  data:() => ({
    newPassword: '',
    newPasswordConfirmation: '',
    loading: true
  }),

  mounted() {
    this.fetchUsers()
    this.loading = false
  },

    computed: {
    ...mapGetters(['allUsers', 'theUserId']),
  },

  methods: {
    ...mapActions(['fetchUsers', 'modifyPassword']),
    async submitNewPassword() {
      if ( this.newPassword != '' && this.newPasswordConfirmation != '' ) {
        if ( this.newPassword == this.newPasswordConfirmation ) {
          await this.modifyPassword({
            id: this.theUserId,
            password: this.newPassword,
          })
          alert("La contrasena ha sido cambiada correctamente")
        } else {
          alert('Las contraseñas no coinciden')
        }
      } else {
        alert('No puedes dejar campos vacíos')
      }
    },
  },
  
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