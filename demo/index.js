/* 高阶函数+闭包实现只允许执行一次 */
/* function once(fn) {
    let lock = false
    return function () {
        if (lock) return
        lock = true
        return fn.apply(this, arguments)
    }
}

let pay = once(function (d) {
    console.log(`一次性支付${d}元`)
})

pay(5)
pay(5)
pay(5)
pay(5)
pay(5) */

/* const _=require('lodash')

let arr=['a','b','c','d','e']

console.log(_.first(arr))
console.log(_.last(arr))
console.log(_.toUpper(arr[0]),arr) */

/* lodash.curry方法帮助实现柯里化 */

/* const _ = require('lodash')
let myMatch = _.curry((reg, str) => {
    return str.match(reg)
})
const haveSpace = myMatch(/\s/g)

const myFilter = _.curry((fn, array) => {
    return array.filter(fn)
})
const spaceFilter = myFilter(haveSpace)
console.log(spaceFilter(['test', 'test dadad']))  */

/* point free案例
    Hello World => hello-world
    point free模式实际上就是函数组合
    */
const fp = require('lodash/fp')
/* 
    const f= fp.flowRight(fp.replace(/\s+/g,'_'),fp.toLower)
    console.log('12313')
    console.log(f( 'Hello                  World *' )) */

/*    const firstLetterToUpper=fp.flowRight(fp.join('-'),fp.map(fp.first),fp.map(fp.toUpper),fp.split(' '))
   console.log(firstLetterToUpper('Hello World For WWW')) */

class MayBe {
    static of(value) {
        return new MayBe(value)
    }
    constructor(value) {
        this._value = value
    }

    map(fn) {
        return this.isNoting === null ? MayBe.of(null) : MayBe.of(fn(this._value))
    }

    isNoting() {
        return this._value === null || this._value === undefined
    }
}

let r = MayBe.of(5).map((x) => x + x).map(x => x * x).map(x => null)
console.log(r)


class IO {
    static of(value) {
        return new IO(function () {
            return value
        })
    }
    constructor(fn) {
        this._value = fn
    }

    map(fn) {
        return new IO(fp.flowRight(fn, this._value))
    }
}