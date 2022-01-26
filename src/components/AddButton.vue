<template>
  <button
    @click="$emit('click', $event)"
    class="add-btn">
    <span class="icon"></span>
    <span class="title">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'AddButton',
}
</script>

<style lang="scss" scoped>
  @import '../assets/sass/_main.scss';
  @import '../assets/sass/_mixin.scss';
  @import '../assets/sass/_variables.scss';

  .add-btn {
    @include button_reset_defaults();
    display: flex;
    align-items: center;
    padding: 15px 35px;
    cursor: pointer;
    transition: background 0.3s ease;
    font-size: 20px;
    color: #333;
    @include up_to('md') {
      position: fixed;
      z-index: 1;
      padding: 0;
      bottom: 20px;
      right: 15px;
    }
  }

  .title {
    border-bottom: 1px solid #333;
    font-weight: normal;
    @include up_to('md') {
      display: none;
    }
  }

  .icon {
    @include icon('../assets/img/add.svg', 35px);
    margin-right: 10px;
    @include up_to('md') {
      margin: 0;
    }
  }
</style>