<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button
        class="all-check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算：({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  name: "cartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    cartList() {
      return this.$store.state.cartList;
    },
    totalPrice() {
      //方法一
      // let price = 0;
      // for (let item of this.cartList) {
      //   if (item.checked) {
      //     price = price + item.price * item.count;
      //   }
      // }
      // return price;

      //方法二
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((total, item) => {
            return total + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      //every需要遍历全部数组
      // return this.cartList.every(item => {
      //   return item.checked;
      // });

      //some只要遍历数组其中一个item.checked为false，就返回true
      if (this.cartList.length) {
        return !this.cartList.some(item => {
          return !item.checked;
        });
      }
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => {
          item.checked = false;
        });
      } else {
        this.cartList.forEach(item => {
          item.checked = true;
        });
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    }
  },
  mounted() {
    console.log(this.cartList);
  }
};
</script>

<style scoped>
.cart-bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.all-check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 100px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
