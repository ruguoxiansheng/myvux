<template>
  <div>
    <router-view></router-view>
    <tabbar>
      <tabbar-item  link="/userCenter">
        <span slot="label" >用户中心</span>
      </tabbar-item>
      <tabbar-item  link="/calCenter">
        <span slot="label">计算中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
export default {
  methods: {

  },//end methods
  data () {
  }
}
</script>

<style>

</style>
