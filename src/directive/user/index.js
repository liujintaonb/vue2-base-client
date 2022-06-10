import user from './user'

const install = function (Vue) {
  Vue.directive('user-leibie', user)
}

user.install = install
export default user
