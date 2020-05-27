# fed-e-task-01-02

# 简答题

    1、引用计数原理：引用关系改变时修改引用数字，当引用数为0时回收内存
        优点：发现垃圾时立即回收，可以最大限度减少程序暂停
        缺点：无法回收循环引用对象，时间开销大
    2、第一阶段标记所有需要清理的内存
       对剩余内存空间进行整理， 将碎片空间合并成一个大空间
       清除被标记的垃圾内存
    3、新生代内存空间分为From和To两部分，活动对象存储于From空间，当From空间内存不足时采用标记整理算法，将标记整理后的活动对象拷贝至To空间。然后交换From空间和To空间并将交换后的To空间整体清除
    4、增量标记算法在回收老生代存储区时使用。增量标记即将标记阶段与程序执行交替执行，减少程序停顿时间

# 代码题一

    1、let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
    2、let getFristNane = fp.flowRight(fp.prop('name'), fp.first)
    3、let averageDollarValue = fp.flowRight(_average, fp.map(fp.prop('dollar_value')))
    4、let sanitizeNames = fp.map(fp.flowRight(_underscore, fp.toLower))

# 代码题二

    1、let ex1 = function (value) {
                    return maybe.map(x => fp.map(i => fp.add(i, value))(x))
                }
    2、let ex2 = function () {
                    return xs.map(value => fp.first(value))._value
                }
    3、let ex3 = function (person) {
                    return safeProp('name')(person).map(v => fp.first(v))._value
                }
    4、let _ex4 = function (n) {
                    return MayBe.of(n).map(v => parseInt(v))._value
                }
