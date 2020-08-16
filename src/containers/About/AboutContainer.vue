<template>
  <BaseLayout>
    <div slot="main">
      <section class="about-section-intro">
        <img class="about-image" :src="AboutInfoIntroDatas.src" :alt="AboutInfoIntroDatas.heading">
        <h1 class="about-header">{{ AboutInfoIntroDatas.heading }}</h1>
        <p class="about-lead">
          {{ AboutInfoIntroDatas.lead }}
        </p>
      </section>

      <section class="about-section-info">
        <h1 class="about-header">簡単! 3ステップで分かる使い方</h1>
        <div v-for="data in AboutInfoListDatas" :key="data.id">
          <img class="about-subimage" :src="data.src" :alt="data.heading">
          <h2 class="about-subheader">{{ data.heading }}</h2>
          <p class="about-sublead">
            {{ data.lead }}
          </p>
        </div>
      </section>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import BaseLayout from '@/components/_shared/BaseLayout.vue'
import { AboutInfoIntroDatas, AboutInfoListDatas } from '@/model/AboutInfoListDatas'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'AboutContainer',
  components: { BaseLayout },
  setup () {
    return {
      AboutInfoIntroDatas,
      AboutInfoListDatas
    }
  }
})
</script>

<style lang="scss" scoped>
.about-section-info {
  text-align: center;
}

.about-image {
  margin-bottom: 3rem;
}

.about-subimage {
  width: 240px;
}

.about-header {
  position: relative;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 4rem;
  word-break: break-all;
  text-align: center;

  &::after {
    position: absolute;
    top: 200%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background-color: #fff
  }
}

.about-subheader {
  position: relative;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 1rem;
  margin-top: 2rem;
  word-break: break-all;
  text-align: center;
}

.about-lead {
  color: #a7a7a7;
  margin-bottom: 4rem;
  font-weight: 800;
  font-size: 1.2rem;
  line-height: 2;
}

.about-sublead {
  color: #a7a7a7;
  margin-bottom: 2rem;
  font-weight: 800;
  font-size: 1.2rem;
  line-height: 2;
  text-align: left;
}
</style>
