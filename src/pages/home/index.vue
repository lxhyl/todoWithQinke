<template>
  <div class="page">
    <header>
        <div class="header-container">
            <a-button type="primary">新增状态</a-button>
        </div>
    </header>
    <div class="content">
      <div class="content-item" v-for="item in 10" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      const login = localStorage.getItem("LOGIN_FLAG");
      return login === null ? false : true;
    },
  },
  created() {
    if (!this.isLogin) {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style scoped>
header {
  height: 60px;
  background: azure;
}
.header-container{
    line-height: 60px;
    text-align: left;
    margin: 0 20px;
}
.page {
  width: 100%;
  height: 100%;
  position: absolute;
}
.content {
  display: flex;
  overflow: auto;
  width: 100%;
  height: 100%;
}
.content-item {
  flex-shrink: 0;
  width: 300px;
  height: 100%;
}
</style>