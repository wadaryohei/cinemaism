<template>
  <aside class="sidebar">
    <div class="sidebar-in">
      <ul class="sidebar-menulist">
        <transition name="sidebar-menus" appear>
          <li class="sidebar-menulistin">
            <router-link :to="{ name : 'home'}" class="sidebar-menulistin-link">
              <span class="sidebar-menulistin-lead">視聴予定の映画</span>
              <p class="sidebar-menulistin-title">INBOX</p>
            </router-link>
          </li>
        </transition>

        <transition name="sidebar-menus" appear>
          <li class="sidebar-menulistin">
            <router-link :to="{ name : 'about'}" class="sidebar-menulistin-link">
              <span class="sidebar-menulistin-lead">CINEMAISMについて</span>
              <p class="sidebar-menulistin-title">ABOUT</p>
            </router-link>
          </li>
        </transition>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

// @for $i from 1 through 2 {
//   .sidebar-menus-enter-active {
//     opacity: 1;
//     transform: translateY(0);
//     transition: .4s ease;

//     &.sidebar-menulistin:nth-of-type(i) {
//       transition-delay: #{50ms * $i}
//     }
//   }
// }

// .sidebar-menus-enter,
// .sidebar-menus-leave-to {
//   opacity: 0;
//   transform: translateY(30px);
// }

.sidebar {
  width: 300px;
  height: 100vh;
  background-color: rgba(0,0,0,.9);
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
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
  padding: 0 4rem;
}

.sidebar-menulist {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

</style>
