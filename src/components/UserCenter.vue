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
        <selector  title="项目编号：" placeholder="请选择项目" direction="rtl" :options="projectList" v-model="projectNumber" @on-change="queryPersonCalProject"></selector>
        <tab>
          <tab-item selected @on-item-click="onItemClick">应中标价格</tab-item>
          <tab-item @on-item-click="onItemClick">前五名公司</tab-item>
          <tab-item @on-item-click="onItemClick">提交记录</tab-item>
        </tab>
        <div>
          <flexbox>
            <flexbox-item v-for="column in columns1"><div class="flex-demo">{{column.title}}</div></flexbox-item>
          </flexbox>
          <flexbox v-for="(data,index) in data1">
            <!--<flexbox-item v-for="(value,key) in data" ><div  class="flex-demo">{{value}}</div></flexbox-item>-->
            <flexbox-item v-for="column in columns1" ><div  class="flex-demo">{{data[column.key]}}</div></flexbox-item>
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
          let url= 'http://127.0.0.1:8077/app/queryPersonCalProject?consumerId=00fb09f70ac84e3f9590f95c5b685cbc';
          let params = {
            consumerId:'00fb09f70ac84e3f9590f95c5b685cbc'
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
          projectList: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
          columns1: [
            {
              title: 'Name',
              key: 'name'
            },
            {
              title: 'Age',
              key: 'age'
            },
            {
              title: 'Address',
              key: 'address'
            }
          ],
          data1: [
            {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park'
            },
            {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park'
            },
            {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park'
            },
            {
              name: 'Jon Snow',
              age: 26,
              address: 'Ottawa No. 2 Lake Park'
            }
          ]
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
