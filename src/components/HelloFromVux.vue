<template>
  <div>
    <div class="vux-demo">
      <group >
        <x-input title="手机号码：" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
      </group>


      <group>
        <x-input title="密码：" type="text" placeholder="" v-model="password" :min="6" :max="6"></x-input>
      </group>
      <flexbox>
        <flexbox-item><x-input title="验证码："></x-input></flexbox-item>
        <flexbox-item> <x-button mini>获取验证码</x-button> </flexbox-item>
      </flexbox>
      <group>
      <button-tab>
        <button-tab-item selected>注册</button-tab-item>
        <button-tab-item>登录</button-tab-item>
      </button-tab>
      </group>
    </div>
    <tabbar>
      <tabbar-item>
        <span slot="label">用户中心</span>
      </tabbar-item>
      <tabbar-item>
        <span slot="label">计算中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Group, Cell,XButton } from 'vux'

export default {
  components: {
    Group,
    Cell,XButton
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      register:'注册',
      login:'登录'
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
