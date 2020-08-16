<template>
  <transition-group tag="ul" name="nav-list-menus">
    <template v-if="props.activeMenu">
    <li v-for="viewData in props.viewDatas" class="nav-listin" :key="viewData.id">
      <router-link :to="viewData.to" class="nav-listin-link">
        <span class="nav-listin-lead">{{ viewData.lead }}</span>
        <p class="nav-listin-title">{{ viewData.title }}</p>
      </router-link>
    </li>
    </template>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { NavListType } from '@/model/NavListDatas'

// ================================
// Props
// ================================
export type NavListProps = {
  viewDatas: NavListType[];
  activeMenu: boolean;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'NavList',
  props: ['viewDatas', 'activeMenu'],
  setup (props: NavListProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.nav-list-menus {
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateX(30px);
    transition: .4s ease;
  }

  &-leave,
  &-enter-to {
    opacity: 1;
    transform: translateX(0);
    transition: .8s ease;
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}) {
        transition-delay: #{100ms * $i};
      }
    }
  }
}

.nav-listin {
  width: 100%;
  margin-top: 1.6rem;
  text-align: left;
}

.nav-listin-link {
  display: block;
  color: #fff;
  padding: 1rem 0;
  transition: .4s ease;

  &:hover {
    transition: .2s ease;
  }
}

.nav-listin-lead {
  font-size: 1rem;
}

.nav-listin-title {
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: .4rem;
}

</style>
