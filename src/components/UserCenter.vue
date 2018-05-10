<template>
    <div>
      <group>
      <cell
        :title="billTitle"
        is-link
        :border-intent="false"
        :arrow-direction="showContent001 ? 'up' : 'down'"
        @click.native="showBillTitle = !showBillTitle"></cell>

      <template v-if="showBillTitle">
        <cell-box :border-intent="false" class="sub-item" is-link>已完成</cell-box>
        <cell-box class="sub-item" is-link>未完成</cell-box>
      </template>

      <cell :title="accountMoney" @click.native="onClick" :is-loading="!money" :value="money"></cell>
      <cell :title="consumerHistory" value="" is-link></cell>
    </group>
    </div>
</template>


<script>
  import { Group, Cell,CellBox,XButton,Badge } from 'vux'
    export default {
      components: {
        Group,
        Cell,
        CellBox,
        XButton
      },
      methods: {
        onClick () {
          console.log('on click')
        }
      },//end methods
      data () {
        return {
          register:'注册',
          login:'登录',
          showBillTitle: false,
          billTitle:'账单',
          accountMoney :'账户余额',
          money:120,
          consumerHistory:'消费历史'
        }
      }
    }

</script>

<style scoped>
  .sub-item {
    color: #888;
    font-size:10px;
    margin-left: 10px;
  }
</style>
