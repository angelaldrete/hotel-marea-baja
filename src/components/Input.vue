<template>
  <div
    class="input"
  >
    <input
      type="text"
      class="inputbar"
      :placeholder="placeholder"
      :value="value"
    >
    <span
      class="lock"
      >
    </span>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    placeholder: {
      type: String,
      required: true,
      default: 'Placeholder'
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

  @import '../assets/sass/_main.scss';
  @import '../assets/sass/_mixin.scss';
  @import '../assets/sass/_variables.scss';

  .input {
    display: flex;
    align-items: center;
    background: $background;
    padding: 10px 25px;
    width: 250px;
  }

  .lock {
    @include icon('../assets/img/lock.svg', 15px);
    flex: 1;
  }

  .inputbar {
    @include input_reset_defaults;
    flex: 4;
  }

</style>