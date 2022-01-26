<template>
  <div
    class="auth-input"
  >
    <input
      :type="inputType"
      class="inputbar"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    <span
      v-if="type === 'password'"
      class="password"
      >
    </span>
    <span
      v-else-if="type === 'user'"
      class="user"
      >
    </span>
  </div>
</template>

<script>
export default {
  name: 'AuthInput',
  props: {
    placeholder: {
      type: String,
      required: true,
      default: 'Placeholder'
    },
    inputType: {
      type: String,
      required: true,
      default: 'text'
    },
    type: {
      type: String,
      required: true,
      default: 'user'
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../../assets/sass/_main.scss';
  @import '../../assets/sass/_mixin.scss';
  @import '../../assets/sass/_variables.scss';

  .auth-input {
    display: flex;
    align-items: center;
    background: $background;
    padding: 10px 25px;
    width: 400px;
    margin-bottom: 20px;
    @include up_to('md') {
      width: 100%;
    }
  }

  input[placeholder] {
    font-size: 14px;
  }

  .user {
    @include icon('../../assets/img/mail.svg', 15px);
    flex: 1;
  }

  .password {
    @include icon('../../assets/img/lock.svg', 15px);
    flex: 1;
  }

  .inputbar {
    @include input_reset_defaults;
    flex: 10;
  }

</style>