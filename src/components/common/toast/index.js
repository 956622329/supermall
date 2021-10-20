import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  // 望：这个toast可以优化一下，data里建一个变量用来保存定时器,每次show方法被触发，先清理这个定时器~
  // 望：这样就不会因为连续触发toast,后续触发的toast没有存在应有的时间就被隐藏了
  const toastContrustor = Vue.extend(Toast)

  const toast =new toastContrustor()

  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)

  Vue.prototype.$toast=toast
}
export default obj
