<template>
    <div :class="{ 'd-flex': $detect == 'web' }">
        <menuUpy class="dashboard-web animation-width" v-if="$detect == 'web'" :dataWidth="width" @dataWidth="width = $event"/>
        <div :style="`width: ${width}px`" class="animation-width"></div>
        <div
            :style="`width: calc(100% - ${width}px)`"
            class="animation-width"
            v-if="$detect == 'web'">
        <breadcrumb :width="width" class="animation-width" />
        <div style="height: 50px" class="animation-width"></div>
            <div style="background: #f0f5f9;min-height: calc(100vh - 50px);padding: 16px 16px 48.8px;" v-loading="loading" content-dashboard>
                <div class="content-dashboard">
                <router-view :class="{'card-dashboard-vg': $detect == 'web',}"/>
                </div>
            </div>
        </div>
        <div v-else>
            <headerMobile />
            <div :class="{'p-2': $detect == 'web'}" v-loading="loading">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
export default {
  components: {
    menuUpy: () => import("@/components/menu.jsx"),
    breadcrumb: () => import("@/components/breadcrumb.jsx"),
    headerMobile: () => import("@/components/headerMobile.vue"),
  },
  data() {
    return {
      width: 250,
    };
  },
  watch: {},
  created() {},
  computed: {
    loading() {
      return false;
    },
  },
  methods: {},
};
</script>
<style lang="scss">
.animation-width {
  animation-fill-mode: both;
  animation-timing-function: ease-out;
  transition: width 0.3s ease-in-out 0s;
}
.dashboard-web {
  position: fixed !important;
  height: 100vh !important;
  left: 0 !important;
  top: 0 !important;
  background: #fff;
}
.dashboard-upy {
  height: 100vh;
  z-index: 10000;
  position: relative;
  animation-fill-mode: both;
  animation-timing-function: ease-out;
  transition: width 0.3s ease-in-out 0s;
  ul {
    list-style: none;
  }
  .zoom-in-out {
    font-size: 20px;
    vertical-align: -5px;
  }
}
.logo-dashboard-pc {
  background: #0c81f6;
  height: 50px;
  padding: 7px 10px 0 20px;
  display: flex;
  align-items: center;
  img {
    width: 60px;
    height: auto;
  }
}
.logo-dashboard-lite {
  background: #0c81f6;
  height: 50px;
  padding: 7px 10px 0 10px;
  img {
    width: auto;
    height: 34px;
  }
}
.header-dashboard-pc {
  background: #0c81f6;
  position: fixed;
  top: 0;
  z-index: 10000;
  right: 0;
}
.card-dashboard-vg {
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 16px;
  border-radius: 5px;
}
</style>
