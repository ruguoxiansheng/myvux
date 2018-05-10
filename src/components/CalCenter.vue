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
          <selector ref="defaultValueRef" title="项目编号：" direction="rtl" :options="list" v-model="defaultValue"></selector>
        </group>
        <div style="padding:15px;">
          <x-button type="primary" @click.native="getValue('defaultValueRef')">get full value</x-button>
        </div>

      </div>
      <div id="secondStep">

      </div>
    </div>

</template>

<script>
  import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,Calendar, Badge,Group,Selector} from 'vux'
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
        Selector
      },
      data() {
        return {
          demo3: 'TODAY',
          list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
          defaultValue: 'gd'
        }
      },
      methods: {
        onItemClick (index) {
          console.log('on item click:', index)
        },
        getValue (ref) {
          this.$vux.alert.show({
            title: 'getFullValue',
            content: this.$refs[ref].getFullValue()
          })
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
