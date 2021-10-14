<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";

import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import { debounce } from "common/utils";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll,
    DetailCommentInfo,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getthemeTopYs: null
    };
  },
  created() {
    // 一.保存传入的iid
    this.iid = this.$route.params.iid;

    // 二.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result;

      //2.取出轮播图的数据
      this.topImages = data.itemInfo.topImages;

      // 3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 6.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //7.取出评论的信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }

      /*
      //1.第一次获取，值不对，
      //值不对的原因:this.$refs.params.$el压根没有渲染
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      //.$el是获取Vue实例关联的DOM元素，js中offsetTop属性是到offsetParent顶部的距离；offsetParent：距离元素最近的一个具有定位的祖宗（父）元素（relative，absolute，fixed），若祖宗（父）元素都不符合条件，offsetParent为body。
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);

      //2.第二次获取:值不对
      //值不对的原因:图片没有计算在类
      //根据最新的数据，对应的DOM是已经被渲染出来
      //但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)，//offsetTop值不对的时候，都是因为图片的问题
      //this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
      this.$nextTick(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      });
      */
    });

    //三.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    this.getthemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
    });
  },
  mounted() {},
  updated() {},
  methods: {
    imageLoad() {
      this.getthemeTopYs;
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>
