<template>
<div>
  <header class="header">
    <p class="header-inbox">
      <a class="header-inbox-link" href="/">
        <span class="header-inbox-number">{{ (inboxCount === 0) ? getMovieCount : inboxCount }}</span>
        <i class="fas fa-inbox"></i>
      </a>
    </p>
    <h1 class="header-router-name" v-if="routerName">{{ routerName.toUpperCase() }}</h1>
    <p class="header-bars" @click="openMenu()"><i class="fas fa-bars"></i></p>

    <div class="sidebar" :class="{open: isMenuActive}">
      <nav class="sidebar-in">
        <img src="../assets/nav_logo.png" alt="">
        <transition-group tag="ul" class="sidebar-menulist" name="sidebar-menus" appear>
          <li v-if="isMenuActive" class="sidebar-menulistin" key="sidebar-menu-1">
            <router-link to="/" class="sidebar-menulistin-link">
              <span class="sidebar-menulistin-lead">視聴予定の映画</span>
              <p class="sidebar-menulistin-title">INBOX</p>
            </router-link>
          </li>

          <li v-if="isMenuActive" class="sidebar-menulistin" key="sidebar-menu-2">
            <router-link to="/about" class="sidebar-menulistin-link">
              <span class="sidebar-menulistin-lead">CINEMAISMについて</span>
              <p class="sidebar-menulistin-title">ABOUT</p>
            </router-link>
          </li>

          <li v-if="isMenuActive" class="sidebar-menulistin" key="sidebar-menu-3">
            <router-link to="/popular" class="sidebar-menulistin-link">
              <span class="sidebar-menulistin-lead">人気の映画</span>
              <p class="sidebar-menulistin-title">POPULAR</p>
            </router-link>
          </li>
        </transition-group>
      </nav>
    </div>

  </header>
</div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Header',

  data () {
    return {
      isMenuActive: false
    }
  },

  methods: {
    /**
     * メニューをひらく
     */
    openMenu () {
      this.isMenuActive ? this.isMenuActive = false : this.isMenuActive = true
    }
  },

  computed: {
    /**
     * Vuexからstateを取得
     */
    ...mapState({
      inboxCount: state => state.inbox.inboxCount,
      isOpenMenu: state => state.menu.openMenu
    }),

    /**
     * 現在のルート名を取得
     */
    routerName () {
      return this.$route.name === 'home' ? 'INBOX' : this.$route.name
    },

    /**
     * 保存されているムービー数を取得
     */
    getMovieCount () {
      // nullなら表示しない
      if (localStorage.getItem('movies') === null) {
        return 0
      } else {
        // Vuexのstateが0ならローカルストレージの配列数を取得
        return JSON.parse(localStorage.getItem('movies')).length
      }
    }
  },

  watch: {
    /**
     * @see https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
     * ルートが変更されたらこのメソッドを再び呼び出すためにwatchで監視
     */
    $route () {
      this.isMenuActive = false
    }
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
  z-index: 3;
  cursor: pointer;
}

.header-router-name {
  text-align: center;
  line-height: 60px;
  font-size: 1.4rem;
  letter-spacing: 1rem;
}

.sidebar {
  width: 300px;
  height: 100vh;
  background-color: rgba(0,0,0,.9);
  position: fixed;
  top: 0;
  right: 0;
  overflow: hidden;
  transition: .4s cubic-bezier(.785,.135,.15,.86);
  transform: translateX(300px);

  &.open {
    transition: .4s cubic-bezier(.785,.135,.15,.86);
    transform: translateX(0);
  }
}

.sidebar-in {
  width: 100%;
  height: 100%;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    flex-shrink: 0;
  }
}

.sidebar-menulist {
  width: 100%;
  height: 100%;
  border-top: 1px solid rgba(255,255,255,.2);
}

.sidebar-menulistin {
  width: 100%;
  margin-top: 1.6rem;
  text-align: left;
}

.sidebar-menulistin-link {
  display: block;
  color: #fff;
  padding: 1rem 0;
  transition: .4s ease;

  &:hover {
    transition: .2s ease;
  }
}

.sidebar-menulistin-lead {
  font-size: 1rem;
}

.sidebar-menulistin-title {
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: .4rem;
}

@for $i from 1 through 3 {
  .sidebar-menus-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: 1s ease;

    &.sidebar-menulistin:nth-of-type(#{$i}) {
      transition-delay: #{100ms * $i}
    }
  }
}

.sidebar-menus-enter,
.sidebar-menus-leave-to {
  opacity: 0;
  transform: translateX(30px);
  transition: .4s ease;
}

</style>
