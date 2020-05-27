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
//const fp = require('lodash/fp')
/* 
    const f= fp.flowRight(fp.replace(/\s+/g,'_'),fp.toLower)
    console.log('12313')
    console.log(f( 'Hello                  World *' )) */

/*    const firstLetterToUpper=fp.flowRight(fp.join('-'),fp.map(fp.first),fp.map(fp.toUpper),fp.split(' '))
   console.log(firstLetterToUpper('Hello World For WWW')) */

/* class MayBe {
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
} */

//const { compose, curry } = require('folktale/core/lambda')\

/* const fp = require('lodash/fp')
const cars = [
    { name: 'Ferrari FF', horsepower: 600, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'JAGUAR xkr-s', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin Onr-77', horsepower: 750, dollar_value: 185000, in_stock: true },
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 130000, in_stock: false },
]

let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log(isLastInStock(cars))

let getFristNane = fp.flowRight(fp.prop('name'), fp.first)
console.log(getFristNane(cars))

let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}

let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function (car) {
        return car.dollar_value
    }, cars)
    return _average(dollar_values)
}

let averageDollarValue = fp.flowRight(_average, fp.map(fp.prop('dollar_value')))
console.log(averageDollarValue(cars))

let str = ['Hellow World', 'AAA BBB', 'CCC DDD RrR']

let _underscore = fp.replace(/\W+/g, '_')
let sanitizeNames = fp.map(fp.flowRight(_underscore, fp.toLower))
console.log(sanitizeNames(str)) */

const fp = require('lodash/fp')
class Container {
    static of(value) {
        return new Container(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Container.of(fn(this._value))
    }
}

class MayBe {
    static of(x) {
        return new MayBe(x)
    }
    isNoting() {
        return this._value === null || this._value === undefined
    }
    constructor(x) {
        this._value = x
    }

    map(fn) {
        return this.isNoting() ? this : MayBe.of(fn(this._value))
    }
}

let maybe = MayBe.of([5, 6, 1])
let ex1 = function (value) {
    return maybe.map(x => fp.map(i => fp.add(i, value))(x))._value
}

let a = ex1(2)
//console.log(a)

let xs = Container.of(['do1', 'ray', 'me', 'fa', 'so', 'la', 'xi', 'do'])
let ex2 = function () {
    return xs.map(value => fp.first(value))._value
}

let b = ex2()
//console.log(b)
let safeProp = fp.curry(function (x, o) {
    return MayBe.of(o[x])
})
let user = { id: 2, name: 'Tom' }
let ex3 = function (person) {
    return safeProp('name')(person).map(v => fp.first(v))._value
}

let c = ex3(user)
//console.log(c)

let ex4 = function (n) {
    if (n) { return parseInt(n) }
}
let _ex4 = function (n) {
    return MayBe.of(n).map(v => parseInt(v))._value
}
console.log(ex4())
console.log(_ex4(3.12))
console.log(_ex4())