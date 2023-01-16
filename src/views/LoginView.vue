<template>
  <div class="login">
    <header>
      <el-avatar
        class="el-avatar"
        :size="45"
        shape="square"
        fit="fill"
        @error="true"
        @click="urlblank"
      >
        <img src="/icon.png" />
      </el-avatar>
    </header>
    <section>
      <!-- 轮播图 -->
      <p>{{ res.data }}</p>
      <aside></aside>
    </section>
    <footer>
      <el-dropdown
        v-for="(item, index) in message"
        :key="index"
        placement="top"
      >
        <el-button :type="item.type" text size="small">
          <el-icon v-if="item.icon === 'OfficeBuilding'"
            ><OfficeBuilding
          /></el-icon>
          <el-icon v-else-if="item.icon === 'Operation'"><Operation /></el-icon>
          <span></span>
          <default>{{ item.title }}</default>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu v-if="item.icon === 'OfficeBuilding'">
            <el-dropdown-item v-for="(i, idx) in item.message" :key="idx"
              >{{ i.Language === "中文"? "公司" : "Company" }}: {{ i.Company }}</el-dropdown-item
            >
          </el-dropdown-menu>
          <el-dropdown-menu v-else-if="item.icon === 'Operation'">
            <el-dropdown-item @click="handleMessage(i)" v-for="(i, idx) in item.message" :key="idx">{{
              i
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <nowDatetime class="nowDatetime"></nowDatetime>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { useRequest } from "@/hooks/request";
import { ref, reactive } from "vue";
import { OfficeBuilding, Operation } from "@element-plus/icons-vue";
import nowDatetime from "@/components/nowDatetime.vue";





const message = reactive<Array<any>>([
  {
    type: "success",
    title: "组 织 信 息",
    icon: "OfficeBuilding",
    message: [
      {
        Language: "English",
        Company: "I really want to, but I'm still looking for a job.",
      },
      { Language: "中文", Company: "真的想写，但我还在找工作。" },
    ],
  },
  {
    type: "success",
    title: "语 言 选 择",
    icon: "Operation",
    message: ["English", "简体中文", "日本語", "繁體中文", "español"],
  },
]);

const { res } = useRequest("src/assets/swiper.json");

const handleMessage = (i: string) => {
  alert(i)
};

const urlblank = () => {
  window.open("https://github.com/LeroyK111", "_blank");
};














</script>
<style lang="less" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #eee;
header {
    position: absolute;
    height: 60px;
    width: 100vw;
    background: transparent;
    top: 0;
    left: 0;
    z-index: 20;
    
      .el-avatar {
        position: absolute;
        height: 80%;
        top: 0.5vw;
        right: 1vw;
      }
    }
    
    section {
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 100%;
      padding-bottom: 30px;
    
      aside {
        z-index: 20;
      }
    }
    
    
    footer {
      position: absolute;
      height: 30px;
      width: 100vw;
      bottom: 0px;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      padding-left: 20px;
      z-index: 20;
    
      .nowDatetime {
        color: #dedfe0;
        font-size: 12px;
        font-weight: bold;
        position: absolute;
        right: 20px;
      }
  }
}
</style>
