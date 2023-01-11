<template>
  <div class="user">
    <div class="name">
      {{ name || 'Berenice Meza' }}
    </div>
    <div class="config">
      <span
        class="edit"
        @click="$router.push(`/editar-usuario`)"
      >
      </span>
      <span
        class="delete"
        @click="deleteUser"
      >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'User',
  props: {
    id: String,
    name: {
      type: String,
    }
  },

  methods: {
    deleteUser() {
      console.log('Are you sure? ')
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../../assets/sass/_main.scss';
  @import '../../assets/sass/_mixin.scss';
  @import '../../assets/sass/_variables.scss';

  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $background;
    padding: 10px 25px;
    width: 400px;
    margin-bottom: 10px;
    @include up_to('md') {
      width: 100%;
    }
  }

  .user:nth-child(even) {
    background: none
  }

  .name {
    flex: 5;
    font-weight: bold;
    color: #333;
  }


  .edit {
    @include icon('../../assets/img/edit.svg', 20px);
    flex: 1;
    cursor: pointer;
  }

  .delete {
    @include icon('../../assets/img/delete.svg', 20px);
    flex: 1;
    cursor: pointer;
    margin-left: 15px;
  }

</style>