<template>
  <div>
    <x-header left-options.showBack>This is the page title.</x-header>
    <br>
    <div>
    <router-view></router-view>
    </div>
    <tabbar>
      <tabbar-item  @on-item-click="toUserCenter">
        <span slot="label" >用户中心</span>
      </tabbar-item>
      <tabbar-item   @on-item-click="toCalCenter">
        <span slot="label">计算中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem
  },
  methods: {
    toUserCenter()  {
      this.$router.push("/userCenter")
    },
    toCalCenter()  {
      this.$router.push("/calCenter")
    }
  },//end methods
  data () {
  },
  watch: {
    '$route': function (newV) {
      this.actived = this.tabList.findIndex(i => i.path === newV.path)
    }
  }
}
</script>

<style>

</style>
