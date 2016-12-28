<template>
  <div class="modal-shadow" v-show="isModal" @click="hideModal()">
    <div class="large-image">
      <img :src="imageSrc">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sljImageModal',
    data () {
      return {
        isModal: false,
        imageSrc: 'http://7xrp7o.com1.z0.glb.clouddn.com/slj-404.jpg'
      }
    },
    methods: {
      hideModal () {
        this.isModal = false
      }
    }
  }
</script>

<style lang="scss">
@import './../assets/style/mixin.scss';
.large-image {
  background: #000;
  width: 10.0rem;
  height: 2.0rem;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    border-top: 0.0.006667rem solid #fff;
    border-bottom: 0.0.006667rem solid #fff;
  }
}

.modal-shadow {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0%;
  top: 0%;
  bottom: 0%;
  right: 0%;
  background: #000;
  z-index: 888;
}
</style>