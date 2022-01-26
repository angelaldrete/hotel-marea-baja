<template>
  <div
    class="currency-input"
  >
    <label
      :for="inputId"
    > {{ label }}
      <span
        class="currency-symbol">
        $
        <input
          @input="$emit('input', $event.target.value)"
          :id="inputId"
          :value="value"
          class="reservation-text"
          type="number"
          step="0.01"
        >
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CurrencyInput',
  props: {
    value: {
      type: Number,
      required: false
    },
    inputId: {
      type: String,
      default: 'input'
    },
    label: {
      type: String,
      default: 'Tarifa por Noche'
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../../../assets/sass/_main.scss';
  @import '../../../assets/sass/_variables.scss';
  @import '../../../assets/sass/_mixin.scss';

  label {
    font-size: 14px;
    color: $font_color;
    .currency-symbol {
      display: flex;
      width: 200px;
      margin-top: 5px;
      margin-bottom: 10px;
      border: 1px solid $form_input_border_color;
      padding: 7px 15px;
      border-radius: 10px;
      &:hover {
        transition: border-color 0.3s ease;
        border-color: $form_selected;
      }
      .reservation-text {
        @include input_reset_defaults;
        width: 100%;
      }
      @include up_to('md') {
        width: 100%;
      }
    }
  }

</style>