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
      <flexbox-item> <x-button mini>获取验证码</x-button> </flexbox-item>
    </flexbox>
    </div>

    <div id="login" v-show="false">
      <br>
      <flexbox>
        <flexbox-item><x-input name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input></flexbox-item>
      </flexbox>

      <flexbox>
        <flexbox-item> <x-input type="text" placeholder="输入密码" v-model="password" :min="6" :max="6"></x-input></flexbox-item>
      </flexbox>

    </div>


    <button-tab>
    <button-tab-item selected @on-item-click="register()">注册</button-tab-item>
    <button-tab-item @on-item-click="login()">登录</button-tab-item>
  </button-tab>

  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Divider } from 'vux'

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Divider
    },
    methods: {
      register () {
        /*console.log('click demo01');*/
        this.registerShow=!this.register()
      },
      login () {
       
      }
    },
    data () {
      return {
        registerShow: true,
        loginShow:false
      }
    }
  }
</script>

<style lang="less">

</style>
