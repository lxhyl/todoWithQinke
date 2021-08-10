<template>
  <div>
      this is home page
  </div>
</template>

<script>
export default {
   computed:{
       isLogin(){
           const login = localStorage.getItem('LOGIN_FLAG')
           return login === null ? false : true
       }
   },
   created(){
       if(!this.isLogin){
           this.$router.push({path:'/login'})
       }
   }
}
</script>

<style>

</style>