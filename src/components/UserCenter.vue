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
        <selector  title="项目编号：" placeholder="请选择项目" direction="rtl" :options="projectList" v-model="projectNumber" @on-change="projectChange"></selector>
        <tab>
          <tab-item selected @on-item-click="onItemClick">提交记录</tab-item>
          <tab-item @on-item-click="onItemClick">应中标价格</tab-item>
          <tab-item @on-item-click="onItemClick">前五名价格</tab-item>
        </tab>
        <div v-show="items0Show">

          <flexbox>
            <flexbox-item v-for="column in comitHistoryTitle"><div class="flex-demo">{{column.title}}</div></flexbox-item>
          </flexbox>

          <flexbox v-for="(data,index) in comitHistoryData">
            <!--<flexbox-item v-for="(value,key) in data" ><div  class="flex-demo">{{value}}</div></flexbox-item>-->
            <flexbox-item v-for="column in comitHistoryTitle" ><div  class="flex-demo">{{data[column.key]}}</div></flexbox-item>
          </flexbox>

        </div>

        <div  v-show="items1Show">
          <flexbox>
            <flexbox-item v-for="column in shouldQuotePriceTitle"><div class="flex-demo">{{column.title}}</div></flexbox-item>
          </flexbox>
          <flexbox v-for="(data,index) in shouldQuotePriceData">
            <!--<flexbox-item v-for="(value,key) in data" ><div  class="flex-demo">{{value}}</div></flexbox-item>-->
            <flexbox-item v-for="column in shouldQuotePriceTitle" ><div  class="flex-demo">{{data[column.key]}}</div></flexbox-item>
          </flexbox>

        </div>

        <div v-show="items2Show">
          <flexbox>
            <flexbox-item v-for="column in proQuotePriceTitle"><div class="flex-demo">{{column.title}}</div></flexbox-item>
          </flexbox>
          <flexbox v-for="(data,index) in proQuotePriceData">
            <!--<flexbox-item v-for="(value,key) in data" ><div  class="flex-demo">{{value}}</div></flexbox-item>-->
            <flexbox-item v-for="column in proQuotePriceTitle" ><div  class="flex-demo">{{data[column.key]}}</div></flexbox-item>
          </flexbox>

        </div>
        <!--<cell-box :border-intent="false" class="sub-item" is-link>已完成</cell-box>-->
        <!--<cell-box class="sub-item" is-link>未完成</cell-box>-->
      </template>

      <!--<cell :title="accountMoney" @click.native="onClick" :is-loading="!money" :value="money"></cell>-->
      <!--<cell :title="consumerHistory" value="" is-link></cell>-->
    </group>
    </div>
</template>


<script>
  import { Group, Cell,CellBox,Badge,Selector,Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem,XTable,Flexbox, FlexboxItem  } from 'vux'
  export default {
    components: {
      Group,
      Cell,
      CellBox,
      XButton,
      Selector,
      Tab,
      TabItem,
      Sticky,
      Divider,
      Swiper,
      SwiperItem,
      XTable,Flexbox, FlexboxItem
    },
      methods: {
        onClick () {
          console.log('on click')
        },
        queryPersonCalProject() {
          const _this = this;
          let url= 'http://127.0.0.1:8077/app/queryPersonCalProject?consumerId='+ window.sessionStorage.getItem("consumerId");
          let params = {
            consumerId: window.sessionStorage.getItem("consumerId")
          }
          this.$http.post(url,params).then(function (response) {

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

        },//end of queryAlreadyCal
        projectChange() {
          const _this = this;
          let url= 'http://127.0.0.1:8077/app/queryDetail?consumerId='+ window.sessionStorage.getItem("consumerId");
          let params = {
            consumerId: window.sessionStorage.getItem("consumerId"),
            projectNumber:this.projectNumber==undefined?undefined:this.projectNumber
          }
          this.$http.post(url,params).then(function (response) {

            //根据不同的结果给出不同的提示
            if (response.data.status === '1') {
              _this.comitHistoryData = response.data.data.comitHistory;
              _this.shouldQuotePriceData = response.data.data.shouldQuotePrice;
              _this.proQuotePriceData = response.data.data.proQuotePrice;

            }else{
              _this.alertMsg=response.data.msg;
              _this.errorShow=true;
            }
          }).catch(function (error) {

            _this.alertMsg='系统错误！';
            _this.errorShow=true;

          });

        },//end of projectChange
        onItemClick(index) {
          if(index ===0) {
            this.items0Show=true;
              this.items1Show=false;
              this.items2Show=false;
          }else if(index ===1){
            this.items0Show=false;
            this.items1Show=true;
            this.items2Show=false;
          }else if(index ===2){
            this.items0Show=false;
            this.items1Show=false;
            this.items2Show=true;
          }
        }
      },//end methods
    created() {
      this.queryPersonCalProject();
    },//end of created
      data () {
        return {
          register:'注册',
          login:'登录',
          showBillTitle: false,
          billTitle:'计算历史',
          accountMoney :'账户余额',
          money:120,
          consumerHistory:'消费历史',
          showContent001: false,
          items0Show:true,
          items1Show:false,
          items2Show:false,
          projectList: [],
          comitHistoryTitle: [
            {
              title: '公司名称',
              key: 'companyName'
            },
            {
              title: '公司报价',
              key: 'companyValue'
            }
          ],
          comitHistoryData: [],
          shouldQuotePriceTitle: [
            {
              title: '项目编号',
              key: 'projectNumber'
            },
            {
              title: '应中标价格',
              key: 'shouldPrice'
            }
          ],
          shouldQuotePriceData: [],
          proQuotePriceTitle: [
            {
              title: '公司名称',
              key: 'companyName'
            },
            {
              title: '公司报价',
              key: 'companyValue'
            }
          ],
          proQuotePriceData: []
        }
      }//end of data
    }

</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';

  .flex-demo {
    text-align: center;
    color: #191818;
    background-color:#f4f9f4;
    border-radius: 4px;
    background-clip: padding-box;
  }
  .sub-item {
    color: #888;
    font-size:10px;
    margin-left: 10px;
  }
</style>
