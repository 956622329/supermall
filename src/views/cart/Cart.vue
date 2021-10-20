<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ lenth }})</div>
    </nav-bar>
    <!-- 列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/cartBottomBar.vue";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // ...mapGetters(["cartLength", "cartList"])
    ...mapGetters({
      lenth: "cartLength"
    })
  }
};
</script>
<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: white;
}
</style>
