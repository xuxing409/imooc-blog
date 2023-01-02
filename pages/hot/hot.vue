<template>
  <view class="hot-container">
    <!-- logo -->
    <image class="logo" mode="aspectFit" src="@/static/images/logo.png" />

    <view class="search-box" @click="onToSearch">
      <!-- 搜索模块 -->
      <my-search placeholderText="uni-app 自定义组件" />
    </view>
  </view>
</template>

<script>
import { getHotTabs, getHotListFromTabType } from "api/hot";
export default {
  data() {
    return {
      // tabs 数据源
      tabData: [],
      // 当前的切换 index
      currentIndex: 0,
      // list 列表数据加载过程
      isLoading: true,
    };
  },
  // 在实例创建完成后被立即调用
  created() {
    this.getHotTabs();
  },
  methods: {
    async getHotTabs() {
      // uniapp 支持 async await
      const { data: res } = await getHotTabs();
      this.tabData = res.list;
      // 获取列表数据
      this.getHotListFromTab();
    },
  },
};
</script>

<style lang="scss">
.hot-container {
  background-color: $uni-bg-color;
  .logo {
    width: 100%;
    height: 80px;
  }
}
</style>
