<template>
  <div
    class="reservation-input"
  >
    <label
      :for="inputId">{{ label }}
      <input
        :value="value"
        :type="inputType"
        :id="inputId"
        :list="dataListId"
        :placeholder="placeholder"
        :min="inputType && inputType === 'date' ? (new Date().toISOString().split('T')[0]) : null"
        @input="$emit('input', $event.target.value)"
        @change="$emit('change', $event.target.value)"
        class="reservation-text">
    </label>
  </div>
</template>

<script>
export default {
  name: 'ReservationInput',
  props: {
    value: {
      type: String,
      required: false
    },
    label: {
      type: String,
      default: 'Nombre del Cliente'
    },
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
      required: false
    },
    dataList: {
      type: Array,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    }
  },
}

</script>

<style lang="scss" scoped>

  @import '../../../assets/sass/_main.scss';
  @import '../../../assets/sass/_variables.scss';
  @import '../../../assets/sass/_mixin.scss';

  .reservation-input {
    @include up_to('md') {
      width: 100%;
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
      @include up_to('md') {
        width: 100%;
      }
    }
  }


</style>