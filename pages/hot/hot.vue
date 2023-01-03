<template>
  <view class="hot-container">
    <!-- logo -->
    <image class="logo" mode="aspectFit" src="@/static/images/logo.png" />

    <view class="search-box" @click="onToSearch">
      <!-- 搜索模块 -->
      <my-search placeholderText="uni-app 自定义组件" />
      <my-tabs
        :tabData="tabData"
        :defaultIndex="currentIndex"
        :config="{ textColor: '#333333' }"
        @tabClick="tabClick"
      ></my-tabs>
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
      // 以 index 为 key，对应的 list 为 val
      listData: {},
      // 当前 swiper 的高度
      currentSwiperHeight: 0,
      // 以 index 为 key，对应的 swiper 的高度 为 val
      swiperHeightData: {},
      // 当前的滚动距离
      currentPageScrollTop: 0,
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
      // this.getHotListFromTab();
    },

    /**
     * list 列表数据
     */
    async getHotListFromTab() {
      // 展示 loading
      this.isLoading = true;
      // 获取列表数据
      const id = this.tabData[this.currentIndex].id;
      const { data: res } = await getHotListFromTabType(id);
      // 放入数据缓存
      this.listData[this.currentIndex] = res.list;
      // 隐藏 loading
      this.isLoading = false;
      // 因为 this.$nextTick 存在一定的兼容性问题，所以更加推荐使用 setTimeout
      setTimeout(async () => {
        // 获取当前 swiper 的高度
        this.currentSwiperHeight = await this.getCurrentSwiperHeight();
        // 放入缓存
        this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
      }, 0);
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
