<template>
  <transition name="modal" appear>
    <div class="modal modal-wrapper" @click="$emit('close')">
      <div class="modal-container">
        <div class="modal-container-body">
          <p>{{ message }}</p>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

.modal {
  &-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
  }

  &-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100%;
    padding: 40px 0;

    @include max(767) {
      padding: 20px;
    }
  }

  &-container-body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #191414;
    color: #fff;
    font-weight: 800;
    width: 100%;
    padding: 40px;
  }

  &-enter-active, &-leave-active {
    transition: opacity 0.1s;

    .modal-container {
      transition: opacity 0.1s, transform 0.1s;
    }
  }
  &-leave-active {
    transition: opacity 0.3s ease 0.2s;
  }

  &-enter, &-leave-to {
    opacity: 0;

    .modal-container {
      opacity: 0;
      transform: translateY(20px);
    }
  }
}

</style>
