<template>
    <div>
        <tab>
          <tab-item selected @on-item-click="firstStepClick">第一步</tab-item>
          <tab-item @on-item-click="secondStepClick">第二步</tab-item>
        </tab>
      <div id="firstStep"  v-show="firstStepShow">
        <group>
          <calendar @on-change="onChange" v-model="demo3" title="开标时间：" disable-future></calendar>
        </group>

        <group >
          <selector ref="defaultValueRef" title="项目编号：" direction="rtl" :options="list" v-model="defaultValue"></selector>
        </group>

        <group v-for="(value, key) in items"  label-width="4.5em" label-margin-right="5.5em" label-align="right" gutter="4px">
         <x-input :title="key" :value="value" ></x-input>
        </group>

      </div>
      <div id="secondStep"  v-show="secondStepShow">
        <group>
          <x-input title="公司名称：" name="companyName" v-model="companyName"></x-input>
        </group>

        <group >
          <x-input title="公司报价：" name="companyValue" v-model="companyValue"></x-input>
        </group>

        <group >
          <selector ref="defaultValueRef" title="单位：" direction="rtl" :options="unit" v-model="defaultUnitValue"></selector>
        </group>
        <br>

        <flexbox>
          <flexbox-item><div class="flex-demo"> <x-button mini type="primary" @click.native="confirm" >确认报价</x-button></div></flexbox-item>
          <flexbox-item><div class="flex-demo"> <x-button mini type="primary" @click.native="query">查询输入</x-button></div></flexbox-item>
          <flexbox-item><div class="flex-demo"><x-button mini type="warn" @click.native="calculate">计算标底</x-button></div></flexbox-item>
        </flexbox>

      </div>
    </div>

</template>

<script>
  import {
    Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,Calendar, Badge,Group,Selector,
    Confirm ,TransferDomDirective as TransferDom
  } from 'vux'

    export default {
      directives: {
        TransferDom
      },
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
        Selector,
        Confirm
      },
      data() {
        return {
          demo3: 'TODAY',
          list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
          defaultValue: 'gd',
          items: {
           x: 0,
             y: 0,
             z: 0
          },
          firstStepShow:true,
          secondStepShow:false,
          companyName:'',
          companyValue:'',
          unit: [
            {
              key: 'yuan',
              value: '元'
            },
            {
              key: 'wyuan',
              value: '万元'
            },
            {
              key: 'qwyuan',
              value: '千万元'
            }
          ],
          defaultUnitValue:'wyuan',
          // 存储到后台的数据对象
          inputObj :{}
        }
      },
      methods: {
        firstStepClick () {
          if (!this.firstStepShow) {
            this.firstStepShow=true;
            this.secondStepShow=false
          }

        },
        secondStepClick () {
          if (!this.secondStepShow) {
            this.firstStepShow = false;
            this.secondStepShow = true
          }
        },
        getValue (ref) {
          this.$vux.alert.show({
            title: 'getFullValue',
            content: this.$refs[ref].getFullValue()
          })
        },
        confirm() {
          this.$vux.confirm.show({
            title: 'Title',
            content: ' <div>\n' +
            '        <group>\n' +
            '          <x-input title="公司名称：" name="companyName" v-model="this.companyName"></x-input>\n' +
            '        </group>\n' +
            '\n' +
            '        <group >\n' +
            '          <x-input title="公司报价：" name="companyValue" v-model="companyValue"></x-input>\n' +
            '        </group></div>',
            onShow () {
              console.log('plugin show')
            },
            onHide () {
              console.log('plugin hide')
            },
            // 取消时，什么也不做
            onCancel () {
              console.log('plugin cancel')
            },
            //点击确定时，把数据录入，并且把输入框置空
            onConfirm () {
              this.inputObj[this.companyName] = this.companyValue;
              this.companyValue='';
              this.companyName='';
            }
          })

        }
      }
    }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';

  .flex-demo {
    text-align: center;
    color: #fff;
    background-color: #fffffb;
    border-radius: 4px;
    background-clip: padding-box;
  }
</style>
