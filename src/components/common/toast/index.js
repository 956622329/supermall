import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  // 望：这个toast可以优化一下，data里建一个变量用来保存定时器,每次show方法被触发，先清理这个定时器~
  // 望：这样就不会因为连续触发toast,后续触发的toast没有存在应有的时间就被隐藏了

  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast=toast
}
export default obj
