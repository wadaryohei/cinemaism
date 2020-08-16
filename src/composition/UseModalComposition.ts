import { ref, Ref } from '@vue/composition-api'

// ================================
// Type
// ================================
export type ModalComposition = {
  isShowModal: Ref<boolean>;
  showModal: () => boolean;
  openModal: (id: number | undefined) => void;
  closeModal: () => void;
  removeStorageId: () => number | undefined;
}

// ================================
// Composition
// ================================
export const UseModalComposition = (): ModalComposition => {
  const storageId = ref<number | undefined>(0)
  const isShowModal = ref<boolean>(false)

  /**
   * 現在のモーダルの状態を返す
   */
  function showModal (): boolean {
    if (isShowModal.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return isShowModal.value
  }

  /**
   * moviesのインデックスを取得してモーダルを開く
   */
  function openModal (id: number | undefined): void {
    storageId.value = id
    isShowModal.value = true
  }

  /**
   * moviesのインデックスを取得してモーダルを閉じる
   */
  function closeModal (): void {
    isShowModal.value = false
  }

  /**
   * 削除するストレージIDを返す
   */
  function removeStorageId (): number | undefined {
    return storageId.value
  }

  return { isShowModal, showModal, openModal, closeModal, removeStorageId }
}
