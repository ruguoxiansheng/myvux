<template>
  <div>
    <x-header :left-options="{showBack: false}">马鞍山计价</x-header>

    <div id="register" v-show="registerShow" >

    <group :title="phoneNumber">
     <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="phone" @on-blur="isRegister"></x-input>
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
       <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="phone" @on-blur="isLogin"></x-input>
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
      <alert v-model="errorShow" title="提示" @on-show="onShow" @on-hide="onHide" :content="alertMsg"></alert>
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
      // 注册与登陆切换
      register () {
        if (!this.registerShow) {
          this.registerShow=!this.registerShow;
          this.loginShow = !this.loginShow
        }

      }, //end register
      login () {
        if (!this.loginShow) {
          this.phone='';
          this.invalidCode='';
          this.password='';
          this.registerShow=!this.registerShow;
          this.loginShow = !this.loginShow
        }
      },//end login
      isRegister() {
        const _this=this;
         let url= 'http://127.0.0.1:8077/vue/isRegister';
        let params = {
          phone:this.phone
        };
        this.$http.post(url,params).then(function (response) {
          if (response.data.data == false) {
           // 没有注册过，不显示

          } else{
            _this.alertMsg=response.data.msg;
            _this.errorShow=true;
          }
        }).catch(function (error) {
          _this.alertMsg='系统错误！';
          _this.errorShow=true;
        });
      },//end isRegister
      isLogin() {
        const _this=this;
        let url= 'http://127.0.0.1:8077/vue/isLogin';
        let params = {
          phone:this.phone
        };
        this.$http.post(url,params).then(function (response) {
          if (response.data.data == true) {
            // 没有登陆过,就什么也不做

          } else{
            //未登陆，不进行操作
            _this.alertMsg=response.data.msg;
            _this.errorShow=true;

          }
        }).catch(function (error) {
          _this.alertMsg='系统错误！';
          _this.errorShow=true;
        });
      },//end isLogin
     registerButton(val) {
        const _this = this;
        let url= 'http://127.0.0.1:8077/vue/register';
        let params = {
          phone:this.phone,
          passWord:this.password,
          invalidCode:this.invalidCode
        };
        this.$http.post(url,params).then(function (response) {
          if (response.status === 200 && response.data.status === '1') {
            _this.alertMsg='注册成功，请登陆！';
            _this.errorShow=true;

          } else if(response.status === 200 ) {
            _this.alertMsg=response.data.msg;
            _this.errorShow=true;
          } else{
            _this.alertMsg='系统错误！';
            _this.errorShow=true;
          }
        }).catch(function (error) {
          _this.alertMsg='系统错误！';
          _this.errorShow=true;
        });
      },//end registerButton
      getInvalidCode(){
        const _this = this;
        let url= 'http://127.0.0.1:8077/vue/invalidCode';
        let params = {
          phone:this.phone
        };
        this.$http.post(url,params).then(function (response) {
          if (response.data.data.invalidCode != null) {
            window.localStorage.setItem("invalidCode",response.data.data.invalidCode);
            window.localStorage.setItem("codeValidTime", new Date().getTime());
          }else{
            _this.alertMsg=response.data.msg;
            _this.errorShow=true;
          }
        }).catch(function (error) {
          _this.alertMsg='系统错误！';
          _this.errorShow=true;
          });
      },//end getInvalidCode
      loginButton(val) {
        const _this = this;
        let url= 'http://127.0.0.1:8077/vue/login';
        let params = {
          phone:this.phone,
          passWord:this.password
        };
        this.$http.post(url,params).then(function (response) {
          if (response.data.status === '1') {
            //登录成功之后，返回用户的id,权限，用户登录status
            window.localStorage.setItem("userId",response.data.data);
            _this.$router.push("/calCenter");
          }else{
            _this.alertMsg=response.data.msg;
            _this.errorShow=true;
          }
        }).catch(function (error) {
          _this.alertMsg='系统错误！';
          _this.errorShow=true;
        });
      }//end registerButton

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
        errorShow:false,
        alertMsg:''
      }
    }
  }
</script>

<style lang="less" scoped>


</style>
