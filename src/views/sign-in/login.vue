<!--
 * @Description: 文件介绍
 * @version: 1.0.0
 * @Author: 天生不是宠儿
 * @Date: 2021-11-12 09:28:04
 * @LastEditTime: 2021-12-08 15:51:08
 * @LastEditors: 天生不是宠儿
 * @FilePath: \vite-project\src\views\sign-in\login.vue
-->
<template>
  <div id="login">
    <login-bg></login-bg>
    <!-- 登录表单 -->
    <div class="sign-in">
      <p class="t_c welcome">Powerful Admin</p>
      <p class="t_c color_f9 fon_14">Powerful Admin 企业级中台前端解决方案</p>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="0">
        <el-form-item prop="name">
          <el-input
            class="margin_top_10"
            v-model="form.name"
            placeholder="请输入登录账户"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="margin_top_20"
            type="password"
            v-model="form.password"
            placeholder="请输入登录密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="flex margin_top_20">
        <div class="flex-grow-1">
          <el-checkbox v-model="check">
            <span class="color_f">自动登录</span>
          </el-checkbox>
        </div>
        <el-link class="flex-grow-0" type="primary">忘记密码</el-link>
      </div>
      <el-button
        :loading="btnLoading"
        element-loading-text="正在登录中，请稍候"
        class="wid margin_top_20"
        type="primary"
        @click="signIn"
        >登录</el-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import loginBg from './bg-1.vue';
import loginBg2 from './bg-2.vue';
export default {
    'components': {
        loginBg,
        loginBg2
    },
    data() {
        return {
            'rules': {
                'name': [
                    {
                        'required': true,
                        'message': '请输入登录账户',
                        'trigger': 'blur'
                    },
                    {
                        'min': 3,
                        'message': '登录账户最少输入3位',
                        'trigger': 'blur'
                    }
                ],
                'password': [
                    {
                        'required': true,
                        'message': '请输入登录密码',
                        'trigger': 'blur'
                    },
                    {
                        'min': 8,
                        'max': 16,
                        'message': '登录密码应当为8-16位的字母+数字组合',
                        'trigger': 'blur'
                    }
                ]
            }
        };
    },
    setup() {
        const formRef = ref<any>(null),
            router = useRouter();
        let btnLoading = ref(false),
            form = ref({
                'name': '',
                'password': ''
            }),
            check = ref(true);
        const signIn = () => {
            formRef.value.validate((valid: boolean) => {
                if (valid) {
                    btnLoading.value = true;
                    router.push('/home');
                    btnLoading.value = false;
                } else {
                    return false;
                }
            });
        };

        return {
            formRef,
            form,
            check,
            signIn,
            btnLoading
        };
    }
};
</script>
<style scoped>
#login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.welcome {
  font-size: 22px;
  color: #fff;
}
.sign-in {
  padding: 20px;
  width: 450px;
  /* height: 300px; */
  background: inherit;
  position: fixed;
  overflow: hidden;
  margin: auto;
  left: 0;
  right: 0;
  top: 15vh;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.sign-in:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  filter: blur(20px);
  z-index: -1;
  margin: -30px;
}
</style>
