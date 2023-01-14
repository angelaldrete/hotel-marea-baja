<template>
  <button
    @click="$emit('click', $event)"
    v-if="type === 'secondary'"
    class="btn btn--secondary"
    >
    <slot></slot>
  </button>
  <button
    @click="$emit('click', $event)"
    v-else-if="type === 'delete'"
    class="btn btn--delete"
    >
    <slot></slot>
  </button>
  <button
    @click="$emit('click', $event)"
    v-else-if="type === 'no-bg'"
    class="btn btn--no-bg"
    >
    <slot></slot>
  </button>
  <button
    @click="$emit('click', $event)"
    v-else
    class="btn btn--primary"
    >
    <slot></slot>
  </button>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Button',
  props: {
    type: {
      type: String,
      required: false,
      default: 'primary'
    }
  },

}
</script>

<style lang="scss" scoped>

  @import '../assets/sass/_main.scss';
  @import '../assets/sass/_mixin.scss';
  @import '../assets/sass/_variables.scss';

  $bg_primary: #000E5A;

  .btn {
    @include button_reset_defaults();
    color: white;
    padding: 10px 35px;
    cursor: pointer;
    transition: background 0.3s ease;
    &--primary {
      background: $bg_primary;
      &:hover {
        background: rgba($bg_primary, 0.8);
      }
    }
    &--secondary {
      background: $bg_secondary;
      border-radius: 10px;
      &:hover {
        background: rgba($bg_secondary, 0.8);
      }
    }

    &--delete {
      background: $full;
      border-radius: 10px;
      &:hover {
        background: rgba($full, 0.8);
      }
    }

    &--no-bg {
      color: $font_color;
      background: none;
    }

    @include up_to('sm') {
      width: 100%;
    }
  }

</style>