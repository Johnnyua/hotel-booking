<template>
  <div class="modal" v-if="show" @click.stop="hideModal">
    <div @click.stop class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideModal() {
      this.$emit('update:show', false);
    },
  },
};
</script>

<style scoped>
.modal__content {
  margin: auto;
  background: #f3efef;
  border-radius: 12px;
  min-height: 100px;
  min-width: 300px;
  padding: 15px;
}
</style>
