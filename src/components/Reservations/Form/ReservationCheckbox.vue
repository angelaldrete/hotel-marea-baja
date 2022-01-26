<template>
  <div class="reservation-checkbox">
    <input
      @input="$emit('input', $event.target.checked)"
      :id="inputId"
      type="checkbox"
      :checked="value"
      class="reservation-checkbox-input"
    >
    <label :for="inputId">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'ReservationCheckbox',
  props: {
    value: {
      type: Boolean,
      required: false
    },
    inputId: {
      type: String,
      default: 'input'
    },
    label: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss" scoped>

  @import '../../../assets/sass/_main.scss';
  @import '../../../assets/sass/_variables.scss';
  @import '../../../assets/sass/_mixin.scss';

  .reservation-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    width: 50px;
    &-input {
      position: relative;
      appearance: none;
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 2px;
      border: 2px solid $form_data_color;
      background: inherit;
      transition: all 0.2s ease;
      margin-right: 5px;
      cursor: pointer;
      &:focus {
        outline: none;
      }
      &:hover {
        border-color: $form_selected;
        + label {
          color: $form_selected;
        }
      }
      &:after {
        position: absolute;
        content: '';
        background-image: url('../../../assets/img/checkmark.svg');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        transform: scale(0.75);
      }

      &:checked {
        border-color: $form_selected;
        background-color: $form_selected;
        & + label {
          color: $form_selected;
        }
      }
    }
    label {
      transition: color 0.2s ease;
      font-size: 12px;
      color: $form_data_color;
      cursor: pointer;
    }
  }

</style>