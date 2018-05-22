<template>
    <div>
        <tab>
          <tab-item selected @on-item-click="firstStepClick">第一步</tab-item>
          <tab-item @on-item-click="secondStepClick">第二步</tab-item>
        </tab>
      <div id="firstStep"  v-show="firstStepShow">
        <group>
          <!--<calendar @on-change="openTimeChange" v-model="openTime" title="开标时间：" disable-future></calendar>-->
          <datetime
            v-model="openTime"
            @on-change="openTimeChange"
            title="开标时间："
            @on-cancel="log('cancel')"
            @on-confirm="onConfirm"
            @on-hide="log('hide', $event)"></datetime>
        </group>

        <group >
          <selector  title="项目编号：" placeholder="请选择项目" direction="rtl" :options="projectList" v-model="projectNumber" @on-change="queryAlreadyCal"></selector>
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
          <selector ref="unitRef" title="单位：" direction="rtl"  readonly :options="unit" v-model="defaultUnitValue"></selector>
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

      <div v-transfer-dom>
        <alert v-model="errorShow" title="提示" @on-show="onShow" @on-hide="onHide" :content="alertMsg"></alert>
      </div>
    </div>

</template>

<script>
  import {
    Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,Calendar, Badge,Group,Selector,
    Confirm ,TransferDomDirective as TransferDom,XDialog,Alert,Datetime
  } from 'vux'
  import global_param from './Global.vue'//引用模块进来
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
        XDialog,
        Alert,
        Datetime
      },
      data() {
        return {
          openTime: '',
          projectList: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
          projectNumber: '',
          items: {
             k: 0,
             k2: 0
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
          let url= 'http://127.0.0.1:8077/app/calculate?userId='+ window.localStorage.getItem("userId");
          let params = {
            projectNumber:this.projectNumber,
            inputObj:this.inputObj,
            k:this.k,
            k2:this.k2
          };
          this.$http.post(url,params).then(function (response) {

            // 202未登陆
            if (response.status === 202) {
              _this.alertMsg='请登陆！';
              _this.errorShow=true;
            }
            // 203未注册
            if (response.status === 203) {
              _this.alertMsg='请注册！';
              _this.errorShow=true;
            }
            // 204用户已经登陆
            if (response.status === 204) {
              _this.alertMsg='当前用户已经登陆！';
              _this.errorShow=true;
            }
            // 205系统异常
            if (response.status === 205) {
              _this.alertMsg='系统异常';
              _this.errorShow=true;
            }

            //根据不同的结果给出不同的提示
            if (response.data.status === '1') {
              _this.alertMsg=response.data.msg;
              _this.errorShow=true;
            }else{
              _this.alertMsg=response.data.msg;
              _this.errorShow=true;
            }
          }).catch(function (error) {
            _this.alertMsg='系统错误！';
            _this.errorShow=true;

          });
        },//end calculate
        // 查询当前的项目是否已经计算过了
        queryAlreadyCal() {
          const _this = this;
          let url= 'http://127.0.0.1:8077/app/alreadyCalTender?userId='+ window.localStorage.getItem("userId");
          let params = {
            projectNumber:this.projectNumber
          };
          this.$http.post(url,params).then(function (response) {

            // 202未登陆
            if (response.status === 202) {
              _this.alertMsg='请登陆！';
              _this.errorShow=true;
            }
            // 203未注册
            if (response.status === 203) {
              _this.alertMsg='请注册！';
              _this.errorShow=true;
            }
            // 204用户已经登陆
            if (response.status === 204) {
              _this.alertMsg='当前用户已经登陆！';
              _this.errorShow=true;
            }
            // 205系统异常
            if (response.status === 205) {
              _this.alertMsg='系统异常';
              _this.errorShow=true;
            }
            //根据不同的结果给出不同的提示
            if (response.data.status === '1') {

            }else{

              _this.alertMsg=response.data.msg;
              _this.errorShow=true;

            }
          }).catch(function (error) {
            _this.alertMsg='系统错误！';
            _this.errorShow=true;

          });

        },//end of queryAlreadyCal
        // 开标时间更改了
        openTimeChange() {
          const _this = this;
          let url= 'http://127.0.0.1:8077/app/queryProject?userId='+ window.localStorage.getItem("userId");
          let params = {
            openTime:this.openTime
          };
          this.$http.post(url,params).then(function (response) {

            // 202未登陆
            if (response.status === 202) {
              _this.alertMsg='请登陆！';
              _this.errorShow=true;
            }
            // 203未注册
            if (response.status === 203) {
              _this.alertMsg='请注册！';
              _this.errorShow=true;
            }
            // 204用户已经登陆
            if (response.status === 204) {
              _this.alertMsg='当前用户已经登陆！';
              _this.errorShow=true;
            }
            // 205系统异常
            if (response.status === 205) {
              _this.alertMsg='系统异常';
              _this.errorShow=true;
            }
            //根据不同的结果给出不同的提示
            if (response.data.status === '1') {
              _this.projectList = response.data.data;
            }else{
              _this.alertMsg=response.data.msg;
              _this.errorShow=true;

            }
          }).catch(function (error) {
            _this.alertMsg='系统错误！';
            _this.errorShow=true;

          });
        }
      },
      // 页面启动的时候，有几个数据要初始化
      created() {
        const _this = this;
        let url= 'http://127.0.0.1:8077/app/queryProject?userId='+ window.localStorage.getItem("userId");
        let params = {
          openTime:this.openTime
        };
        this.$http.post(url,params).then(function (response) {

          // 202未登陆
          if (response.status === 202) {
            _this.alertMsg='请登陆！';
            _this.errorShow=true;
          }
          // 203未注册
          if (response.status === 203) {
            _this.alertMsg='请注册！';
            _this.errorShow=true;
          }
          // 204用户已经登陆
          if (response.status === 204) {
            _this.alertMsg='当前用户已经登陆！';
            _this.errorShow=true;
          }
          // 205系统异常
          if (response.status === 205) {
            _this.alertMsg='系统异常';
            _this.errorShow=true;
          }
          //根据不同的结果给出不同的提示
          if (response.data.status === '1') {
            _this.projectList = response.data.data;

          }else{
            _this.alertMsg=response.data.msg;
            _this.errorShow=true;

          }
        }).catch(function (error) {
          _this.alertMsg='系统错误！';
          _this.errorShow=true;

        });
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
