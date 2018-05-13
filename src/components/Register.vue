<template>
  <div>
    <x-header :left-options="{showBack: false}">马鞍山计价</x-header>

    <div id="register" v-show="registerShow" >

    <group :title="phoneNumber">
     <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="phone"></x-input>
    </group>

    <group>
       <x-input type="text" placeholder="设置密码" v-model="password" :min="6" :max="6"></x-input>
    </group>
    <group>
    <flexbox>
      <flexbox-item> <x-input name="identifyCode" placeholder="请输入验证码" keyboard="number" is-type="china-mobile" v-model="invalidCode"></x-input></flexbox-item>
      <flexbox-item> <x-button mini @click.native="getInvalidCode">获取验证码</x-button > </flexbox-item>
    </flexbox>
    </group>
      <br>
      <flexbox>
        <flexbox-item>
          <x-button mini plain type="primary" @click.native="registerButton" style="float:right;margin-right: 10px">立即注册</x-button>
        </flexbox-item>
      </flexbox>
      <br>
    </div>

    <div id="login" v-show="loginShow">
      <group>
       <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="phone"></x-input>
      </group>
      <group>
        <x-input type="text" placeholder="输入密码" v-model="password" :min="6" :max="6"></x-input>
      </group>
      <br>
      <flexbox>
        <flexbox-item>
        <x-button mini plain type="primary" @click.native="loginButton" style="float:right;margin-right: 10px" >立即登陆</x-button>
        </flexbox-item>
      </flexbox>
      <br>

    </div>


    <button-tab >
    <button-tab-item selected @on-item-click="register">注册</button-tab-item>
    <button-tab-item @on-item-click="login">登录</button-tab-item>
  </button-tab>

    <div v-transfer-dom>
      <alert v-model="errorShow" title="错误" @on-show="onShow" @on-hide="onHide">验证码获取失败，请重新获取！</alert>
    </div>

  </div>
</template>

<script>


  import Flexbox from "../../node_modules/vux/src/components/flexbox/flexbox.vue";
  import { XHeader,Group} from 'vux'
  import { Alert,TransferDomDirective as TransferDom } from 'vux'


  export default {
    directives: {
      TransferDom
    },
    components: {
      Flexbox,
      XHeader,Group,
      Alert
    },
    methods: {
      register () {
        /*console.log('click demo01');*/
        if (!this.registerShow) {
          this.registerShow=!this.registerShow;
          this.loginShow = !this.loginShow
        }

      }, //end register
      login () {
        if (!this.loginShow) {
          this.registerShow=!this.registerShow;
          this.loginShow = !this.loginShow
        }
      },//end login
      registerButton(val) {
        const _this = this;
        let url= 'http://127.0.0.1:8077/vue/invalidCode';
        let params = {
          phone:this.phone,
          passWord:this.password,
          invalidCode:this.invalidCode
        };
        this.$http.post(url,params).then(function (response) {
          if (response.status === 200 && response.data.status === '1') {
            //axions 中如果用this 就会undefined
            _this.data1=response.data.pageData;
            _this.dataCount=response.data.totalSize;
          } else if(response.status === 200 ) {
            _this.errorShow=true;
          } else{
            _this.errorShow=true;
          }
        }).catch(function (error) {

        });
        this.$router.push("/calCenter");
      },//end registerButton
      getInvalidCode(){
        const _this = this;
        let url= 'http://127.0.0.1:8077/vue/invalidCode';
        let params = {
          phone:this.phone
        };
        this.$http.post(url,params).then(function (response) {
          if (response.status === 200 && response.data.status === '1') {
            //axions 中如果用this 就会undefined
            _this.data1=response.data.pageData;
            _this.dataCount=response.data.totalSize;
          } else if(response.status === 200 ) {
            _this.errorShow=true;
          } else{
            _this.errorShow=true;
          }
        }).catch(function (error) {

          });

      }

    },
    data () {
      return {
        registerShow: true,
        loginShow:false,
        password: '',
        submit001: 'click me',
        disable001: false,
        phoneNumber:'',
        phone:'',
        errorShow:false
      }
    }
  }
</script>

<style lang="less" scoped>


</style>
