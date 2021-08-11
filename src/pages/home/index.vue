<template>
  <div class="page">
    <header>
      <div class="header-container">
        <Setting />
      </div>
    </header>
   
      <vuedraggable 
      :options="draggableOptions" 
      handle=".content-item" 
      class="content"
      ghostClass="ghostClass"
     v-model="statusList">
        <div class="content-item" v-for="item in statusList" :key="item.code">
          <p class="content-item-title">
            <span class="content-item-title-name"> {{ item.name }}</span>
            <a-icon class="content-item-title-close" type="close-circle"></a-icon>
          </p>
          {{item}}
        </div>
      </vuedraggable>
      
  </div>
</template>

<script>
import Setting from "./header/index.vue";
import vuedraggable from "vuedraggable";
import { getAllStatus } from "../../api/status";
const draggableOptions = {
    animation:500,
   
}
export default {
  components: {
    Setting,
    vuedraggable,
  },
  computed: {
    isLogin() {
      const login = localStorage.getItem("LOGIN_FLAG");
      return login === null ? false : true;
    },
  },
  data() {
    return {
      draggableOptions,
      statusList: null,
    };
  },
  methods: {
    async getStatusInfo() {
      const res = await getAllStatus();
      if (res.code === 200 && res.success) {
        this.statusList = res.data;
        return
      }
    },
  },
  created() {
    if (!this.isLogin) {
      this.$router.push({ path: "/login" });
    }
    this.getStatusInfo();
  },
};
</script>

<style scoped>
header {
  height: 60px;
  background-color: white
}
.header-container {
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
  background-color: rgb(247, 247, 247);
  width: 100%;
  height: 100%;
}
.content-item {
  flex-shrink: 0;
  width: 300px;
  height: 100%;
  margin: 5px 10px;
}
.content-item-title {
  font-weight: 800;
  color: black;
  text-align: left;
  line-height: 40px;
}
.content-item-title-close{
  margin: 0 10px;
}
.content-item-title-close:hover{
  color: red;
}
.ghostClass{
    opacity: 0;
}
</style>