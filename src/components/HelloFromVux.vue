<template>
  <div>
    <x-header left-options.showBack :title="headTitle"></x-header>
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
      this.$router.push("/userCenter");
      this.headTitle="用户中心"
    },
    toCalCenter()  {
      this.$router.push("/calCenter");
      this.headTitle="计算中心"
    }
  },//end methods
  data () {
    return {
      headTitle :"用户中心"
    }
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
