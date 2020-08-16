<template>
  <BaseLayout>
    <div slot="main" v-if="presenter.datas()">
        <!-- ストレージに情報が存在しない場合 -->
        <Hero
          v-if="!presenter.datas().viewDatas().isExistsStorageCount"
          :viewDatas="presenter.datas().viewDatas().defaultImage"
        />

        <!-- ストレージに情報が存在する場合 -->
        <div v-if="presenter.datas().viewDatas().isExistsStorageCount">
          <SectionModal :modal="modal" :storage="storage" />
          <SectionMovieList
            :viewDatas="presenter.datas().viewDatas().currentStorages"
            :modal="modal"
          />
          <button class="movie-removeAll-btn" @click="storage.removeAllStorage()">一括で削除する</button>
        </div>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, SetupContext, onMounted } from '@vue/composition-api'
import BaseLayout from '@/components/_shared/BaseLayout.vue'
import Modal from '@/components/Modal/Modal.vue'
import Hero from '@/components//Hero/Hero.vue'
import SectionModal from '@/containers/Home/doms/SectionModal.vue'
import SectionMovieList from '@/containers/Home/doms/SectionMovieList.vue'
import { UseStorageComposition } from '@/composition/UseStorageComposition'
import { UseModalComposition } from '@/composition/UseModalComposition'
import { UsePresenterComposition } from '@/composition/UsePresenterComposition'
import { UseHomePresenter, HomePresenter } from '@/containers/Home/UseHomePresenter'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'HomeContainer',
  components: { BaseLayout, Modal, Hero, SectionModal, SectionMovieList },
  setup (props, context: SetupContext) {
    const storage = UseStorageComposition(context)
    const modal = UseModalComposition()
    const presenter = UsePresenterComposition()

    onMounted(async () => {
      const homePresenter = UseHomePresenter(storage.currentStorages(localStorage.getItem('movies')), storage.storageCount())
      await presenter.presenterDatas<HomePresenter>(homePresenter)
    })

    return {
      storage, modal, presenter
    }
  }
})
</script>

<style lang="scss" scoped>

.movie-removeAll-btn {
  border: none;
  outline: none;
  display: block;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  background-color: #191414;
  color: #fff;
}

</style>
