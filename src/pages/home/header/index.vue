<template>
  <div>
    <a-button v-if="showButton" type="primary" @click="addStatus"
      >新增状态</a-button
    >

    <a-input v-else v-model="name" class="input-status" placeholder="输入状态名">
      <a-icon slot="addonBefore" type="close" />
      <a-icon slot="addonAfter" @click="requestAddStatus" type="check" />
    </a-input>
  </div>
</template>
<script>
import { addStatus } from "../../../api/status";
export default {
  data() {
    return {
      showButton: true,
      name: "",
      requestFlag: true,
    };
  },
  methods: {
    addStatus() {
      this.showButton = false;
    },
    async requestAddStatus() {
      if (!this.requestFlag) return;
      this.requestFlag = false;
      const res = await addStatus({ name: this.name });
      this.requestFlag = true;
      if (res.code !== 200 || !res.success) {
        this.$message.error("新增失败");
        return;
      }
      this.showButton = true;
    },
  },
};
</script>
<style scoped>
.input-status {
  width: 200px;
  margin-top: 10px;
  height: 40px;
}
</style>