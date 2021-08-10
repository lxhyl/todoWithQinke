<template>
  <div class="container">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="login">
        <a-form-model>
          <a-form-model-item>
            <a-input placeholder="请输入账户名" />
          </a-form-model-item>
          <a-form-model-item>
            <a-input placeholder="请输入密码" />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary">登陆</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-tab-pane>

      <a-tab-pane key="2" tab="Sign in">
        <a-form-model ref="signin" :model="signinForm" :rules="signinFormRules" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-form-model-item label="账户" prop="account">
            <a-input v-model="signinForm.account" placeholder="请定义账户名" />
          </a-form-model-item>
          <a-form-model-item label="密码" prop="password">
            <a-input-password  v-model="signinForm.password" placeholder="请输入密码" />
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
import sha1 from "sha1"
import {createAccount} from '../../api/account'
const labelCol = {span:6,offset:0}
const wrapperCol = {span:18,offset:0}
export default {

  data() {
    const _this = this; 
    return {
      labelCol,
      wrapperCol,
      signinForm: {},
      signinFormRules: {
        account: [
          { required: true, message: "账号是必须的", trigger: "change" },
        ],
        password:[
             { required: true, message: "密码是必须的", trigger: "change" },
        ],

        confirmPassword:[
             {required:true, validator(rule,value,callback){
                 if(!value){
                     callback(new Error('请确认密码'))
                 }else if(value != _this.signinForm.password){
                     callback(new Error("两次密码不一致"))
                }else{
                   callback()
                }
             },trigger:"change"}
        ],
      },
    };
  },
  methods: {
    signin() {
      const _this = this
      this.$refs.signin.validate(async valid => {
        if (!valid) {
          return;
        }
        const requestData = {
          account:_this.signinForm.account,
          sha1:sha1(`${_this.signinForm.account}-${_this.signinForm.password}`)
        }
        const res = await createAccount(requestData)
        console.log(res)
      });
      console.log(this.signinForm);
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