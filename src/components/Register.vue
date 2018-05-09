<template>
  <div>
    <div id="register" v-show="registerShow">
    <br>
    <flexbox>
      <flexbox-item><x-input name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input></flexbox-item>
    </flexbox>

    <flexbox>
      <flexbox-item> <x-input type="text" placeholder="设置密码" v-model="password" :min="6" :max="6"></x-input></flexbox-item>
    </flexbox>

    <flexbox>
      <flexbox-item> <x-input name="identifyCode" placeholder="请输入验证码" keyboard="number" is-type="china-mobile"></x-input></flexbox-item>
      <flexbox-item> <x-button mini>获取验证码</x-button > </flexbox-item>
    </flexbox>
     <x-button mini plain type="primary" @click.native="submit">确认</x-button>
    </div>

    <div id="login" v-show="loginShow">
      <br>
      <flexbox>
        <flexbox-item><x-input name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input></flexbox-item>
      </flexbox>
      <flexbox>
        <flexbox-item> <x-input type="text" placeholder="输入密码" v-model="password" :min="6" :max="6"></x-input></flexbox-item>
      </flexbox>
     <x-button mini plain type="primary" @click.native="submit">确认</x-button>
    </div>


    <button-tab>
    <button-tab-item selected @on-item-click="register">注册</button-tab-item>
    <button-tab-item @on-item-click="login">登录</button-tab-item>
  </button-tab>

  </div>
</template>

<script>


  export default {
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
      submit(val) {
        // 这里调用接口，注册
        console.log("aaaaaa",val),
          this.$router.push("/home");
      }//end submit

    },
    data () {
      return {
        registerShow: true,
        loginShow:false,
        password: '',
        submit001: 'click me',
        disable001: false
      }
    }
  }
</script>

<style lang="less">

</style>
