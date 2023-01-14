<template>
  <div
    class="reservation-select-input"
  >
    <label
      :for="inputId">{{ label }}
      <input
        :type="inputType"
        :id="inputId"
        :list="dataListId"
        :value="value"
        @input="$emit('input', $event.target.value)"
        class="reservation-text">
    </label>
    <template v-if="dataList">
      <datalist :id="dataListId">
        <option v-for="data in dataList" :value="data.key || data" :key="data.key || data">
        </option>
      </datalist>
    </template>
  </div>
</template>

<script>

export default {
  name: 'ReservationSelectInput',
  props: {
    value: String|Number,
    inputId: {
      type: String,
      required: false,
      default: 'input'
    },
    inputType: {
      type: String,
      required: false,
      default: 'text'
    },
    dataListId: {
      type: String,
      required: false,
      default: 'dataList'
    },
    dataList: {
      type: Array,
      required: false,
      default: () => [1, 2, 3]
    },
    label: {
      type: String,
      required: false,
      default: 'No. de habitaciones'
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../../../assets/sass/_main.scss';
  @import '../../../assets/sass/_variables.scss';
  @import '../../../assets/sass/_mixin.scss';

  .reservation-select-input {
    @include up_to('md') {
      width: 100%;

      label input {
        width: 100%;
      }
    }

  }

  label {
    font-size: 14px;
    color: $font_color;
    .reservation-text {
      display: block;
      width: 200px;
      margin-top: 5px;
      margin-bottom: 10px;
      border: 1px solid $form_input_border_color;
      padding: 7px 15px;
      border-radius: 10px;
      &:focus {
        outline: none;
        border-color: $form_selected;
      }
      &:hover {
        transition: border-color 0.3s ease;
        border-color: $form_selected;
      }
    }
  }


</style>