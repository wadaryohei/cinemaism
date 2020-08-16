<template>
  <div class="pagination-wrapper">
    <span
      v-if="props.pagination.currentPageCount() > 1"
      class="pagination pagination-preview"
      @click="props.pagination.stepPreviewPageHandler()"
    >
      ← PREVIEW
    </span>
    <span
      class="pagination pagination-next"
      @click="props.pagination.stepNextPageHandler()"
    >
      NEXT →
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { PaginationComposition } from '@/composition/UsePaginationComposition'

// ================================
// Props
// ================================
export type PaginationProps = {
  pagination: PaginationComposition;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Pagination',
  props: ['pagination'],
  setup (props: PaginationProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.pagination {
  color: #fff;
  font-size: 12px;
  font-weight: bold;
}

.pagination-preview {
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.pagination-next {
  width: 100%;
  text-align: right;
  cursor: pointer;
}

</style>
