<template>
  <div class="container">
    <a-tabs v-model="tabKey">
      <a-tab-pane key="login" tab="login">
        <a-form-model
          ref="login"
         :model="loginForm"
          :rules="loginRules"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-form-model-item label="账户" prop="account">
            <a-input v-model="loginForm.account" placeholder="请输入账户名" />
          </a-form-model-item>
          <a-form-model-item label="密码" prop="password">
            <a-input v-model="loginForm.password" placeholder="请输入密码" />
          </a-form-model-item>
            <a-button type="primary" @click="login">登陆</a-button>
        </a-form-model>
      </a-tab-pane>

      <a-tab-pane key="signin" tab="Sign in">
        <a-form-model
          ref="signin"
          :model="signinForm"
          :rules="signinFormRules"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-form-model-item label="账户" prop="account">
            <a-input v-model="signinForm.account" placeholder="请定义账户名" />
          </a-form-model-item>
          <a-form-model-item label="密码" prop="password">
            <a-input-password
              v-model="signinForm.password"
              placeholder="请输入密码"
            />
          </a-form-model-item>
          <a-form-model-item label="确认密码" prop="confirmPassword">
            <a-input-password
              v-model="signinForm.confirmPassword"
              placeholder="请再次输入密码"
            />
          </a-form-model-item>

          <a-button type="primary" @click="signin">注册</a-button>
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import sha1 from "sha1";
import { createAccount,login } from "../../api/account";
const labelCol = { span: 6, offset: 0 };
const wrapperCol = { span: 18, offset: 0 };
export default {
  data() {
    const _this = this;
    return {
      tabKey:'login',
      labelCol,
      wrapperCol,
      signinForm: {},
      signinFormRules: {
        account: [
          { required: true, message: "账号是必须的", trigger: "change" },
        ],
        password: [
          { required: true, message: "密码是必须的", trigger: "change" },
        ],

        confirmPassword: [
          {
            required: true,
            validator(rule, value, callback) {
              if (!value) {
                callback(new Error("请确认密码"));
              } else if (value != _this.signinForm.password) {
                callback(new Error("两次密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "change",
          },
        ],
      },
      loginForm:{},
      loginRules:{
         account: [
          { required: true, message: "账号是必须的", trigger: "change" },
        ],
        password: [
          { required: true, message: "密码是必须的", trigger: "change" },
        ],
      },
      timer: null,
    };
  },
  methods: {
    login(){
     const _this = this
     this.$refs.login.validate(async valid => {
       if(!valid) return
       const data = {
         account:_this.loginForm.account,
         sha1:sha1(`${_this.loginForm.account}-${_this.loginForm.password}`)
       }
       const res = await login(data)
       if(res.code !== 200 || !res.success){
         _this.$message.info(res.msg)
         return
       }
       localStorage.setItem('LOGIN_FLAG',JSON.stringify(res.data))
       this.$router.push('/')
     })
    },
    signin() {
      const _this = this;
      const key = "loading";
      this.$refs.signin.validate(async (valid) => {
        if (!valid) return
        if (_this.timer) return;
        _this.timer = setTimeout(async () => {
          _this.$message.loading({ content: "注册中", key });
          const requestData = {
            account: _this.signinForm.account,
            sha1: sha1(
              `${_this.signinForm.account}-${_this.signinForm.password}`
            ),
          };
          const res = await createAccount(requestData);
          _this.$message.info({ content:res.msg, key,duration:2});
           clearTimeout(_this.timer)
          _this.timer = null
          if (res.code !== 200 || !res.success) return;
          _this.tabKey = 'login'
        }, 400);
      });
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  width: 300px;
  margin: auto;
  left: 0;
  right: 0;
}
</style>