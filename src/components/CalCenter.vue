<template>
    <div>
        <tab>
          <tab-item selected @on-item-click="firstStepClick">第一步</tab-item>
          <tab-item @on-item-click="secondStepClick">第二步</tab-item>
        </tab>
      <div id="firstStep"  v-show="firstStepShow">
        <group>
          <calendar @on-change="onChange" v-model="openTime" title="开标时间：" disable-future></calendar>
        </group>

        <group >
          <selector ref="defaultValueRef" title="项目编号：" direction="rtl" :options="list" v-model="projectNumber"></selector>
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
          <flexbox-item><div class="flex-demo"> <x-button mini type="primary" @click.native="queryInput" >查询输入</x-button></div></flexbox-item>
          <flexbox-item><div class="flex-demo"><x-button mini type="warn" @click.native="calculate">计算标底</x-button></div></flexbox-item>
        </flexbox>


          <div v-transfer-dom>
            <x-dialog v-model="show" class="dialog-demo">
              <div class="img-box" style="overflow: auto;">
                <group v-for="(value, key) in inputObj"  label-width="4.5em" label-margin-right="5.5em" label-align="right" gutter="4px">
                  <x-input :title="key" :value="value" ></x-input>
                </group>
              </div>
              <div @click="show=false">
                <span class="vux-close"></span>
              </div>
            </x-dialog>
          </div>

      </div>
    </div>

</template>

<script>
  import {
    Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,Calendar, Badge,Group,Selector,
    Confirm ,TransferDomDirective as TransferDom,XDialog
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
        Confirm,
        XDialog
      },
      data() {
        return {
          openTime: 'TODAY',
          list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
          projectNumber: 'gd',
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
          inputObj :{},
          columns : [
            {
              title: '序号',
              key: 'orderNumber'
            },
            {
              title:'公司名称',
              key:'companyName'
            },
            {
              title: '公司报价',
              key: 'companyValue'
            }
          ],
          show:false
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
          const _this = this;
          this.$vux.confirm.show({
            title: '注意',
            content: '请确认输入值，一但录入将不能更改！',
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
              _this.inputObj[_this.companyName] = _this.companyValue;
              _this.companyValue='';
              _this.companyName='';
            }

          })

        },//end confirm
        queryInput() {
          this.show=true;
        },
        calculate() {
          const _this = this;
          let url= 'http://127.0.0.1:8077/vue/calculate?userId='+ window.localStorage.getItem("userId");
          let params = {
            projectNumber:this.projectNumber,
            inputObj:this.inputObj
          };
          this.$http.post(url,params).then(function (response) {
            //根据不同的结果给出不同的提示
            if (response.data.status === '1') {

            }else{

            }
          }).catch(function (error) {
            _this.alertMsg='系统错误！';
            _this.errorShow=true;

          });
        }//end calculate

      }
    }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/close';

  .flex-demo {
    text-align: center;
    color: #fff;
    background-color: #fffffb;
    border-radius: 4px;
    background-clip: padding-box;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
</style>
