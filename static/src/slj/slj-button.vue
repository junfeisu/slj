<template>
  <button :class="['slj-btn-' + type, 'slj-btn-' + size]">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'sljBtn',
    props: {
      type: {
        type: String,
        default: 'primary'
      },
      size: {
        type: String,
        default: 'normal'
      }
    }
  }
</script>

<style lang="scss">
@import './../assets/style/var.scss';
@import "./../assets/style/mixin.scss";
@mixin button {
  appearance: none;
  border: 0;
  outline: none;
  overflow: hidden;
  color: #fff;
  border: 1px solid rgba(0,0,0,0.20);
  border-radius: 0.04rem;
}

.slj-btn {
  &-primary {
    @include button;
    @include background-color-set($primary, $primaryHover, $primaryClick);
  }
  &-warn {
    @include button;
    @include background-color-set($warn, $warnHover, $warnClick);
  }
  &-success {
    @include button;
    @include background-color-set($success, $successHover, $successClick);
  }
  &-plain {
    @include button;
    @include background-color-set($white, #3c5263, #243948);
    border: 1px solid $hint;
    color: $hint;
    &:hover,
    &:active {
      color: $white;
    }
  }

  &-normal {
    width: 8.0rem;
    height: 0.586667rem;
    font-size: 16px;
  }
  &-small {
    width: 1.066667rem;
    height: 0.373333rem;
  }
}
</style>
