<template>
  <ul class="l-row">
    <li class="l-grid-12 movie-lists" v-for="viewData in props.viewDatas" :key="viewData.id">
      <router-link :to="`/movie/${viewData.id}`" class="movie-link">
        <img class="movie-images" :src="viewData.backdropPath" :alt="viewData.originalTitle">
      </router-link>
      <div class="movie-title-wrapper">
        <h2 class="movie-title">{{ viewData.originalTitle }}</h2>
      </div>

      <div class="movie-remove-btn-wrapper" @click="props.modal.openModal(viewData.id)">
        <i class="movie-remove-btn far fa-check-circle"></i>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { ModalComposition } from '@/composition/UseModalComposition'
import { HomePresenter } from '@/containers/Home/UseHomePresenter'

// ================================
// Props
// ================================
export type SectionMovieListProps = {
  modal: ModalComposition;
  viewDatas: HomePresenter;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'SectionMovieList',
  props: ['modal', 'viewDatas'],
  setup (props: SectionMovieListProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.movie-lists {
  width: 100%;
  height: 100%;
  position: relative;
}
.movie-link {
  display: block;
}

.movie-images {
  height: 130px;
  object-fit: cover;
}

.movie-title-wrapper {
  position: absolute;
  z-index: 0;
  bottom: 10px;
  right: 15px;
  width: 80%;
}

.movie-title {
  color: #fff;
  margin-top: 5px;
  font-size: 1.4rem;
  font-weight: 800;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: right;
}

.movie-remove-btn-wrapper {
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 1;
}

.movie-remove-btn {
  position: relative;
  z-index: 1;
  color: #fff;
  font-size: 3rem;
  cursor: pointer;
  transition: .4s ease;

  &:hover {
    transition: .2s ease;
    color: #1db954;
  }
}

</style>
