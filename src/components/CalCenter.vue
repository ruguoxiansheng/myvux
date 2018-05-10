<template>
    <div>
        <tab>
          <tab-item selected @on-item-click="onItemClick">第一步</tab-item>
          <tab-item @on-item-click="onItemClick">第二步</tab-item>
        </tab>
      <div id="firstStep">
        <group>
          <calendar @on-change="onChange" v-model="demo3" title="开标时间：" disable-future></calendar>
        </group>

        <group>
        <picker title="项目编号：" :data='years001' v-model='year001' @on-change='change'></picker>
        </group>
        <br>

      </div>
      <div id="secondStep">

      </div>
    </div>

</template>

<script>
  import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,Calendar, Badge,Group, Picker} from 'vux'
    export default {
      components: {
        Tab,
        TabItem,
        Sticky,
        Divider,
        XButton,
        Swiper,
        SwiperItem,
        Calendar,
        Badge,
        Group,
        Picker
      },
      data() {
        return {
          demo3: 'TODAY',
          years001: ['a','b','c','d'],
          year001: ['a'],
        }
      },
      methods: {
        onItemClick (index) {
          console.log('on item click:', index)
        }
      }
    }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
  .selected-days {
    color: #999;
    width: 90px;
  }
</style>
