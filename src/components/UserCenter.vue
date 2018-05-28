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
        <tab >
          <tab-item selected @on-item-click="onItemClick" >应中标价格</tab-item>
          <tab-item @on-item-click="onItemClick">前五名公司</tab-item>
          <tab-item @on-item-click="onItemClick">提交记录</tab-item>
        </tab>
        <div v-show="item1Show">
          <flexbox>
            <flexbox-item v-for="item1 in columns1" style="border-bottom:1px solid #10adff;"><div class="flex-demo" >{{item1.title}}</div></flexbox-item>
          </flexbox>
          <flexbox v-for="(dataItem1,index) in data1">
            <!--<flexbox-item v-for="(value,key) in data" ><div  class="flex-demo">{{value}}</div></flexbox-item>-->
            <flexbox-item v-for="item1 in columns1"  style="border-bottom:1px solid #10adff;"><div  class="flex-demo">{{dataItem1[item1.key]}}</div></flexbox-item>
          </flexbox>
        </div>


        <div  v-show="item2Show">
          <flexbox>
            <flexbox-item v-for="item2 in columns2" style="border-bottom:1px solid #10adff;"><div class="flex-demo">{{item2.title}}</div></flexbox-item>
          </flexbox>
          <flexbox v-for="(data2,index) in data2">
            <!--<flexbox-item v-for="(value,key) in data" ><div  class="flex-demo">{{value}}</div></flexbox-item>-->
            <flexbox-item v-for="item2 in columns2" style="border-bottom:1px solid #10adff;" ><div  class="flex-demo">{{data2[item2.key]}}</div></flexbox-item>
          </flexbox>
        </div>


        <div v-show="item3Show">
          <flexbox>
            <flexbox-item v-for="item3 in columns3" style="border-bottom:1px solid #10adff;"><div class="flex-demo">{{item3.title}}</div></flexbox-item>
          </flexbox>
          <flexbox v-for="(data3,index) in data3">
            <!--<flexbox-item v-for="(value,key) in data" ><div  class="flex-demo">{{value}}</div></flexbox-item>-->
            <flexbox-item v-for="item3 in columns3" style="border-bottom:1px solid #10adff;" ><div  class="flex-demo">{{data3[item3.key]}}</div></flexbox-item>
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
        onItemClick (index) {
          if(0===index) {
            this.item1Show=true;
            this.item2Show=false;
            this.item3Show=false;
          }
          if(1===index) {
            this.item1Show=false;
            this.item2Show=true;
            this.item3Show=false;
          }
          if(2===index) {
            this.item1Show=false;
            this.item2Show=false;
            this.item3Show=true;
          }
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
          item1Show:true,
          item2Show:false,
          item3Show:false,
          columns1: [
            {
              title: '姓名',
              key: 'name'
            },
            {
              title: '年龄',
              key: 'age'
            },
            {
              title: '地址',
              key: 'address'
            }
          ],
          columns2: [
            {
              title: '项目名称',
              key: 'projectName'
            },
            {
              title: '项目编号',
              key: 'projectNumber'
            },
            {
              title: '项目预算',
              key: 'budget'
            }
          ],
          columns3: [
            {
              title: '公司名称',
              key: 'companyName'
            },
            {
              title: '公司报价',
              key: 'companyValue'
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
          ],
          data2: [
            {
              projectName: '项目1',
              projectNumber: "WE2349-1",
              budget: '123.43'
            },
            {
              projectName: '项目2',
              projectNumber: "WE2349-2",
              budget: '123.43'
            },
            {
              projectName: '项目3',
              projectNumber: "WE2349-3",
              budget: '223.43'
            },
            {
              projectName: '项目1',
              projectNumber: "WE2349-1",
              budget: '123.43'
            }
          ],
          data3: [
            {
              companyName: '合州建筑',
              companyValue: 123.45
            },
            {
              companyName: '鲁艺建筑',
              companyValue: 123.45
            },
            {
              companyName: '恢弘建筑',
              companyValue: 123.45
            },
            {
              companyName: '商河建筑',
              companyValue: 123.45
            },
          ]
        }
      }//end of data
    }

</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';

  .flex-demo {
    text-align: center;
    color: #000000;
    background-color: #fffffb;
    border-radius: 4px;
    background-clip: padding-box;
  }
  .sub-item {
    color: #bfb429;
    font-size:10px;
    margin-left: 10px;
  }
</style>
