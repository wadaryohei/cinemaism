<template>
  <Modal v-if="props.modal.showModal()" message="削除しますか？" @close="props.modal.closeModal()">
    <div slot="footer" class="modal">
      <button @click.self="props.modal.closeModal()">Cancel</button>
      <button @click="props.storage.removeStorage(props.modal.removeStorageId())">Delete</button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Modal from '@/components/Modal/Modal.vue'
import { ModalComposition } from '@/composition/UseModalComposition'
import { StorageComposition } from '@/composition/UseStorageComposition'

// ================================
// Props
// ================================
export type SectionModalProps = {
  modal: ModalComposition;
  storage: StorageComposition;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'SectionModal',
  components: { Modal },
  props: ['modal', 'storage'],
  setup (props: SectionModalProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin-top: 20px;
    border: none;
    outline: none;
    padding: 10px 30px;
    cursor: pointer;

    &:first-child {
      background: transparent;
      border: solid 1px #eee;
      color: #eee;
      margin-right: 5px;
    }

    &:last-child {
      background-color: #1db954;
      border: solid 1px #1db954;
      color: #fff;
    }
  }
}
</style>
