<template>
<div>
  <header class="header">
    <p class="header-inbox">
      <a class="header-inbox-link" href="/">
        <span class="header-inbox-number">{{ movieNumbers }}</span>
        <i class="fas fa-inbox"></i>
      </a>
    </p>
    <p class="header-router-name" v-if="routerName">{{ routerName.toUpperCase() }}</p>
    <p class="header-bars" @click="openMenu()"><i class="fas fa-bars"></i></p>
    <sideMenu :class="{open: isOpenMenu}"></sideMenu>
  </header>
</div>
</template>

<script>

import sideMenu from '@/components/SideMenu'

export default {
  name: 'Header',

  components: {
    sideMenu
  },

  data () {
    return {
      movieNumbers: 0,
      isOpenMenu: false
    }
  },

  created () {
    this.getMovieNumbers()
  },

  methods: {
  /**
   * 保存されているムービー数を取得
   */
    getMovieNumbers () {
      if (localStorage.getItem('moviesId') === null) {
        return false
      }
      this.movieNumbers = JSON.parse(localStorage.getItem('moviesId')).length
    },

    openMenu () {
      this.isOpenMenu = !this.isOpenMenu
    }
  },

  computed: {
    /**
     * 現在のルート名を取得
     */
    routerName () {
      return this.$route.name === 'home' ? 'INBOX' : this.$route.name
    }
  },

  watch: {
    /**
     * @see https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
     * ルートが変更されたらこのメソッドを再び呼び出すためにwatchで監視
     */
    '$route': 'getMovieNumbers'
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 2;
  color: #fff;
  background-image: linear-gradient(-180deg,#000 -20%,transparent 120%);
}

.header-inbox,
.header-bars {
  font-size: 2rem;
}

.header-inbox {
  position: absolute;
  top: 15px;
  left: 15px;
}

.header-inbox-link {
  color: #fff;
}

.header-inbox-number {
  position: absolute;
  top: -5px;
  left: -2px;
  background: #e91e63;
  width: 15px;
  line-height: 15px;
  border-radius: 50%;
  font-size: 1rem;
  text-align: center;
}

.header-bars {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 4;
  cursor: pointer;
}

.header-router-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  letter-spacing: 1rem;
}

</style>
