const $math = require('mathjs')

function comp (_func, args) {
  let t = $math.chain($math.bignumber(args[0]))
  for (let i = 1; i < args.length; i++) {
    t = t[_func]($math.bignumber(args[i]))
  }
  // 防止超过6位使用科学计数法
  return parseFloat(t.done())
}

export const math = {
  // 加法：Add two or more values, x + y.
  add () {
    return comp('add', arguments)
  },
  // 减法：Subtract two values, x - y.
  subtract () {
    return comp('subtract', arguments)
  },
  // 乘法：Multiply two or more values, x * y.
  multiply () {
    return comp('multiply', arguments)
  },
  // 除法：Divide two values, x / y.
  divide () {
    return comp('divide', arguments)
  },
  // 四舍五入：Round a value towards the nearest integer.
  round (target, num) {
    return $math.round(target, num)
  }
}
